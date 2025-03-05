import { FlavorBibleEntryId, ParsedFlavorBible } from "@rono/types";
import { readFileSync } from "fs";

const book: ParsedFlavorBible = JSON.parse(readFileSync("book.json", "utf-8"));
const ingredients: Map<FlavorBibleEntryId, string> = new Map();
const reverseMap: Map<string, FlavorBibleEntryId> = new Map();

for (const [id, entry] of Object.entries(book)) {
  const entryId = FlavorBibleEntryId(parseInt(id));
  ingredients.set(entryId, entry.name.toLowerCase());
  reverseMap.set(entry.name, entryId);
}

for (const entry of Object.values(book).slice(0, 10)) {
  if (entry.seeAlso && reverseMap.has(entry.seeAlso.toLowerCase())) {
    console.log(entry.seeAlso);
  }
}
