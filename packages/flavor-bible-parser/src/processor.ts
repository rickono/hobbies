import { HTMLElement } from "node-html-parser";
import { PeekableIterator } from "./peekable";
import { Reader } from "./reader";
import { Dish, Note, ParsedFlavorBible, ParsedFlavorBibleEntry } from "./types";
import { getAssociation } from "./utils";

const logNode = (node: HTMLElement): void => {
  console.log(node.tagName, node.classList.values(), node.text);
};

class Processor {
  private readonly reader: PeekableIterator<HTMLElement>;
  private phase:
    | "initial"
    | "meta-gathering"
    | "main"
    | "dishes"
    | "flavor-affinities"
    | "avoid";
  private book: ParsedFlavorBible = {};
  private current?: { id: string; name: string };

  public constructor() {
    this.reader = new PeekableIterator(new Reader());
    this.phase = "initial";
  }

  public parse(): void {
    while (this.reader.hasNext()) {
      const node = this.reader.next();
      if (!node.done) {
        this.processNode(node.value);
      }
    }
    console.log(JSON.stringify(this.book, null, 2));
  }

  private processNode(node: HTMLElement): void {
    // If the node is h1.sub1 it is a new entry, and enter 'meta-gathering'
    if (node.tagName === "H1" && node.classList.contains("sub1")) {
      console.log(node.text);
      const id = node.getAttribute("id") ?? "";
      this.phase = "meta-gathering";
      this.book[id] = {
        id,
        name: node.text,
        associations: [],
        flavorAffinities: [],
        dishes: [],
        meta: {},
        notes: [],
      };
      this.current = {
        id,
        name: node.text,
      };
      return;
    }

    if (
      node.tagName === "H1" &&
      node.classList.contains("sidebar-title") &&
      node.text === "Dishes"
    ) {
      this.phase = "dishes";
      return;
    }

    if (node.tagName === "P" && node.text === "Flavor Affinities") {
      this.phase = "flavor-affinities";
      return;
    }
    // console.log(this.phase);
    // logNode(node);

    if (this.phase === "meta-gathering") {
      if (!this.isMetaNode(node)) {
        this.phase = "main";
      } else {
        // handle actual meta nodes
        this.handleMetaNode(node);
        return;
      }
    }

    if (this.phase === "dishes") {
      // everything here should be blockquote
      let dish: Dish;
      if (node.tagName === "BLOCKQUOTE") {
        // actual dish name
        dish = {
          name: "",
        };
        const nameparts: string[] = [];
        for (const quoteNode of node.children) {
          if (
            quoteNode.classList.contains("attribution") ||
            quoteNode.classList.contains("attributionn")
          ) {
            dish.attribution = quoteNode.text;
          } else {
            nameparts.push(quoteNode.text);
          }
        }
        dish.name = nameparts.join(" ");
        this.getCurrentEntry()?.dishes.push(dish);
        return;
      }
      this.phase = "main";
    }

    if (node.tagName === "BLOCKQUOTE") {
      // handle non-dish quote
      const nameparts: string[] = [];
      const note: Note = { note: "" };
      for (const quoteNode of node.children) {
        if (
          quoteNode.classList.contains("attribution") ||
          quoteNode.classList.contains("attributionn")
        ) {
          note.attribution = quoteNode.text;
        } else {
          nameparts.push(quoteNode.text);
        }
      }
      note.note = nameparts.join(" ");
      this.getCurrentEntry()?.notes.push(note);
      return;
    }

    if (this.phase === "flavor-affinities") {
      if (!node.text.includes("+")) {
        this.phase = "main";
      } else {
        const affinities = node.text.split("+").map((s) => s.trim());
        this.getCurrentEntry()?.flavorAffinities.push(affinities);
        return;
      }
    }

    // Assume it's an affinity or AVOID
    if (node.text === "AVOID") {
      this.phase = "avoid";
      return;
    }
    const strong = node?.querySelectorAll("strong").map((n) => n.text) ?? [];
    const text = node.text.trim();
    const association = getAssociation(text, strong);
    if (typeof association === "string" || !association) {
      return;
    }
    if (this.phase === "avoid") {
      if (Array.isArray(association)) {
        for (const a of association) {
          a.level = -1;
        }
      } else {
        association.level = -1;
      }
    }

    if (Array.isArray(association)) {
      this.getCurrentEntry()?.associations.push(...association);
    } else {
      this.getCurrentEntry()?.associations.push(association);
    }
  }

  private getCurrentEntry(): ParsedFlavorBibleEntry | undefined {
    const currentId = this.current?.id;
    if (!currentId) {
      return;
    }
    return this.book[currentId];
  }

  private isMetaNode(node: HTMLElement): boolean {
    if (node.tagName === "P" && node.classList.contains("bull")) {
      return true;
    }
    if (!(node.tagName === "P" && node.classList.contains("noindent"))) {
      return false;
    }
    if (node.text.startsWith("(") || node.text.includes(":")) {
      return true;
    }
    if (
      (this.current?.name.includes(",") && node.text.split(" ").length < 7) ||
      node.text === "jerked dishes (e.g., chicken)"
    ) {
      return false;
    } else {
      return true;
    }
  }

  private handleMetaNode(node: HTMLElement): void {
    const text = node.text;
    const currentId = this.current?.id;
    const currentEntry = currentId && this.book[currentId];
    if (!currentEntry) {
      return;
    }

    // (See ... ) or (see ...)
    const isSee = text.toLocaleLowerCase().startsWith("(see");
    const seeRe = /^\([Ss]ee (?:also )?(.+)\)$/;
    if (isSee) {
      const mainEntry = text.match(seeRe)?.[1];
      currentEntry.seeAlso = mainEntry;
      return;
    }
    // (e.g., )
    const egRe = /^\(e\.g\., (.+)\)$/;
    const egMatch = text.match(egRe);
    if (egMatch?.length === 2) {
      currentEntry.example = egMatch[1];
      return;
    }
    // (aka ...) or (...)
    const akaRe = /^\((?:aka )?(.+)\)$/;
    const akaMatch = text.match(akaRe);
    if (akaMatch?.length === 2) {
      currentEntry.aka = akaMatch[1];
      return;
    }

    // Key: value
    const keyValRe = /(.+): (.+)/;
    const keyValMatch = text.match(keyValRe);
    if (
      keyValMatch?.length === 3 &&
      (keyValMatch[1]?.split(" ").length ?? 0) < 5
    ) {
      const key = keyValMatch[1];
      const val = keyValMatch[2];
      if (key === undefined || val === undefined) {
        return;
      }
      currentEntry.meta[key] = val;
      return;
    }

    const note: Note = {
      note: text,
    };
    const next = this.reader.peek();
    if (
      !next.done &&
      next.value.tagName === "P" &&
      next.value.classList.contains("attribution")
    ) {
      note.attribution = next.value.text;
      this.reader.next();
    }
    currentEntry.notes.push(note);
  }
}

const main = () => {
  const processor = new Processor();
  processor.parse();
};

main();
