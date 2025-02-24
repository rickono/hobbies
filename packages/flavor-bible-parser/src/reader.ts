import { isDefined } from "@rono/utils";
import { readdirSync, readFileSync } from "fs";
import parse, { HTMLElement } from "node-html-parser";

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

export class Reader {
  private state: ParserState;
  public constructor() {
    const files = this.getFilenames("./book").values();

    this.state = {
      files,
      done: false,
    };
  }

  *[Symbol.iterator](): IterableIterator<HTMLElement> {
    for (const topLevelElement of this.topLevelElements()) {
      yield* this.leaves(topLevelElement);
    }
  }

  private *leaves(element: HTMLElement): IterableIterator<HTMLElement> {
    if (this.isSidebar(element) || this.isImage(element)) {
      return;
    }
    if (this.isBlockElement(element)) {
      const hasBlockChildren = element.children.some((child) =>
        this.isBlockElement(child),
      );
      if (hasBlockChildren) {
        for (const child of element.children) {
          yield* this.leaves(child);
        }
      } else {
        yield element;
      }
    }
  }

  private isSidebar(element: HTMLElement): boolean {
    return element.tagName === "DIV" && element.classList.contains("sidebar");
  }

  private isImage(element: HTMLElement): boolean {
    return element.tagName === "P" && element.classList.contains("image");
  }

  private *topLevelElements(): IterableIterator<HTMLElement> {
    while (!this.state.done) {
      this.nextNode();
      if (isDefined(this.state.currentNode)) {
        yield this.state.currentNode;
      }
    }
  }

  private isBlockElement(element: HTMLElement): boolean {
    return [
      "DIV",
      "P",
      "SECTION",
      "ARTICLE",
      "MAIN",
      "NAV",
      "HEADER",
      "FOOTER",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "BLOCKQUOTE",
    ].includes(element.tagName);
  }

  private nextNode(): void {
    this.state.currentNode =
      this.state.currentNode?.nextElementSibling ?? undefined;
    if (this.state.currentNode !== undefined) {
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
  }

  private getFilenames(directory: string): string[] {
    return readdirSync(directory);
  }

  private loadFile(path: string): string {
    return readFileSync(`./book/${path}`, "utf-8");
  }
}

// const main = () => {
//   const reader = new Reader();
//   for (const node of reader) {
//     if (node.tagName === "P" && node.classList.length === 0) {
//       console.log(node.tagName, node.classList, node.text);
//     }
//   }
// };

// main();
