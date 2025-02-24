import { isDefined } from "@rono/utils";
import { readdirSync, readFileSync } from "fs";
import parse, { HTMLElement } from "node-html-parser";
import { ParsedFlavorBible } from "./types";
import { getAssociation } from "./utils";

export type NodeType =
  | "entry"
  | "meta"
  | "association"
  | "associations"
  | "quote"
  | "affinity-title"
  | "affinity"
  | "affinities"
  | "dish"
  | "sidebar"
  | "note"
  | "note2"
  | "bullet"
  | "spotlight-dish";

interface ParserState {
  entryId?: string;
  files: ArrayIterator<string>;
  done: boolean;
  currentNode?: HTMLElement;
  currentNodeType?: NodeType;
}

export class Parser {
  private parsedBook: ParsedFlavorBible = {};
  private state: ParserState;
  public constructor() {
    const files = this.getFilenames("./book").values();

    this.state = {
      files,
      done: false,
    };
  }

  public parse(): void {
    while (!this.state.done) {
      this.nextNode();
      this.processNode();
    }
    // console.log(JSON.stringify(this.parsedBook, null, 2));
  }

  private nextNode(): void {
    this.state.currentNode =
      this.state.currentNode?.nextElementSibling ?? undefined;
    if (this.state.currentNode !== undefined) {
      this.state.currentNodeType = this.identifyNode();
      return;
    }

    const nextFile = this.state.files.next();
    if (nextFile.done) {
      this.state.done = true;
      return;
    }
    const nextFileName = nextFile.value;
    const fileContents = this.loadFile(nextFileName);
    const root = parse(fileContents);
    const body = root.querySelector("body");
    this.state.currentNode = body?.firstElementChild;
    if (this.state.currentNode === undefined) {
      this.state.done = true;
      return;
    }
    this.state.currentNodeType = this.identifyNode();
  }

  private processNode(): void {
    switch (this.state.currentNodeType) {
      case "entry":
        this.processEntry();
        break;
      case "meta": {
        const success = this.processMeta();
        if (!success) {
          this.processNode();
        }
        break;
      }
      case "association":
        this.processAssociation();
        break;
      case "associations":
        this.processAssociations();
        break;
      case "affinity":
        this.processAffinity();
        break;
      case "affinities":
        this.processAffinities();
    }
  }

  private identifyNode(): NodeType | undefined {
    const currentNode = this.state.currentNode;
    if (currentNode === undefined) {
      return;
    }
    const { tagName, attributes } = currentNode;
    if (tagName === "H1" && attributes.class === "sub1") {
      return "entry";
    }
    if (tagName === "P" && attributes.class === "noindent") {
      return "meta";
    }
    if (tagName === "P" && attributes.class === "bull") {
      return "bullet";
    }
    if (tagName === "DIV" && attributes.class === "indentblock1") {
      return "associations";
    }
    if (
      tagName === "BLOCKQUOTE" &&
      (attributes.class === "epigraphn" ||
        attributes.class === "epigrapht" ||
        attributes.class === "blockquote" ||
        attributes.class === "epigraphn1")
    ) {
      return "quote";
    }
    if (
      (tagName === "P" && attributes.class === "h3") ||
      (tagName === "P" && attributes.class === "noindent1")
    ) {
      return "affinity-title";
    }
    if (tagName === "DIV" && attributes.class === "indentblock") {
      return "affinities";
    }
    if (tagName === "DIV" && attributes.class === "sidebarb") {
      return "dish";
    }
    if (tagName === "DIV" && attributes.class === "sidebar") {
      return "sidebar";
    }
    if (tagName === "BLOCKQUOTE" && attributes.class === "blockquote1") {
      return "note";
    }
    if (tagName === "DIV" && attributes.class === "sidebar1") {
      return "spotlight-dish";
    }
    if (tagName === "P" && attributes.class === undefined) {
      return "note2";
    }
    return undefined;
  }

  private processEntry(): void {
    const entry = this.state.currentNode
      ?.querySelector("span.green")
      ?.removeWhitespace().text;
    const entryId = this.state.currentNode?.getAttribute("id");
    this.state.entryId = entryId;
    if (entryId && entry) {
      this.parsedBook[entryId] = {
        id: entryId,
        name: entry,
        associations: [],
        flavorAffinities: [],
        dishes: [],
        meta: {},
        notes: [],
      };
    }
  }

  private processMeta(): boolean {
    const currentId = this.state.entryId;
    if (!isDefined(currentId)) {
      return true;
    }
    const curr = this.parsedBook[currentId];
    if (!isDefined(curr)) {
      return true;
    }
    const text = this.state.currentNode?.text.trim();
    if (!isDefined(text)) {
      return true;
    }
    const [label, note] = text
      .split(":")
      .map((term) => term.trim().toLocaleLowerCase());
    if (label !== undefined && note !== undefined) {
      curr.meta[label] = note;
      return true;
    }

    const seeRegex = /[Ss]ee.(also)?(.*)\)$/;
    if (seeRegex.test(text)) {
      const [, , alias] = text.match(seeRegex) ?? [];
      curr.seeAlso = alias;
      return true;
    }
    const akaRegex = /^\(aka (.*)\)/;
    if (akaRegex.test(text)) {
      const [, alias] = text.match(akaRegex) ?? [];
      curr.seeAlso = alias;
      return true;
    }
    const egRegex = /^\(e.g., (.*)\)/;
    if (egRegex.test(text)) {
      const [, alias] = text.match(egRegex) ?? [];
      curr.seeAlso = alias;
      return true;
    }
    const aliasRegex = /^\((.*)\)$/;
    if (aliasRegex.test(text)) {
      const [, alias] = text.match(aliasRegex) ?? [];
      curr.subtitle = alias;
      return true;
    }

    if (text.includes("esp")) {
      this.state.currentNodeType = "association";
      return false;
    }

    if (text === "Flavor Affinities") {
      this.state.currentNodeType = "affinity-title";
      return false;
    }

    if (text.includes("+")) {
      this.state.currentNodeType = "affinity";
      return false;
    }

    curr.notes.push(text);
    return true;
  }

  private processAssociation(): void {
    const strong =
      this.state.currentNode
        ?.querySelectorAll("strong")
        .map((node) => node.text) ?? [];
    const text = this.state.currentNode?.text.trim();
    const currentEntryId = this.state.entryId;
    if (text === undefined || currentEntryId === undefined) {
      return;
    }
    const association = getAssociation(text, strong);
    if (!association) {
      return;
    }
    if (Array.isArray(association)) {
      this.parsedBook[currentEntryId]?.associations.push(...association);
      return;
    }
    if (typeof association === "string") {
      this.processNode();
      return;
    }
    this.parsedBook[currentEntryId]?.associations.push(association);
  }

  private processAssociations(): void {
    const associationsNode = this.state.currentNode;
    if (associationsNode === undefined) {
      return;
    }
    const associations = associationsNode.querySelectorAll("p");
    for (const associationNode of associations) {
      this.state.currentNode = associationNode;
      this.state.currentNodeType = "association";
      this.processAssociation();
    }
    this.state.currentNode = associationsNode;
    this.state.currentNodeType = "associations";
  }

  private processAffinity(): void {
    const node = this.state.currentNode;
    if (!node) {
      return;
    }
    // console.log(node.text);
  }

  private processAffinities(): void {
    const node = this.state.currentNode;
    const affinities = node?.querySelectorAll("p");
    if (!affinities) {
      return;
    }
    for (const a of affinities) {
      if (a.text.includes("DOMINIQUE")) {
        continue;
      }
      if (!a.text.includes("+")) {
        this.state.currentNodeType = "association";
        this.state.currentNode = a;
        this.processAssociation();
        continue;
      }
      this.state.currentNodeType = "affinity";
      this.state.currentNode = a;
      this.processAffinity();
      continue;
    }
  }

  private getFilenames(directory: string): string[] {
    return readdirSync(directory);
  }

  private loadFile(path: string): string {
    return readFileSync(`./book/${path}`, "utf-8");
  }
}

const main = () => {
  const parser = new Parser();
  parser.parse();
};

main();
