import { HTMLElement } from "node-html-parser";
import { Reader } from "./reader";
import { ParsedFlavorBible } from "./types";

const logNode = (node: HTMLElement): void => {
  console.log(node.tagName, node.classList.values(), node.text);
};

class Processor {
  private readonly reader: Reader;
  private phase:
    | "initial"
    | "meta-gathering"
    | "main"
    | "dishes"
    | "flavor-affinities";
  private book: ParsedFlavorBible = {};
  private current?: { id: string; name: string };

  public constructor() {
    this.reader = new Reader();
    this.phase = "initial";
  }

  public parse(): void {
    for (const node of this.reader) {
      this.processNode(node);
    }
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
    if (this.phase === "meta-gathering") {
      if (!this.isMetaNode(node)) {
        if (
          (node.tagName === "P" && node.classList.length === 0) ||
          (node.tagName === "P" && node.classList.contains("noindent"))
        ) {
          this.phase = "main";
        } else {
          // logNode(node);
        }
      } else {
        // handle actual meta nodes
        logNode(node);
      }
    }
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
    if (this.current?.name.includes(",") && node.text.split(" ").length < 5) {
      return false;
    } else {
      return true;
    }
  }

  private handleMetaNode(node: HTMLElement): void {
    const text = node;
    // (See ... ) or (see ...)
    // (aka ...) or (...)
    // Key: value
  }
}

const main = () => {
  const processor = new Processor();
  processor.parse();
};

main();
