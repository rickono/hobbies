import "dotenv/config"; // Automatically loads .env

import { FlavorBibleDb } from "@rono/db-legacy";
import { ParsedFlavorBible } from "@rono/types";
import { readFileSync } from "fs";

const parsedBook: ParsedFlavorBible = JSON.parse(
  readFileSync("book.json", { encoding: "utf-8" }),
);

const db = new FlavorBibleDb();

const insert = async () => {
  await Promise.all(
    Object.values(parsedBook).map((entry) => db.insertEntry(entry)),
  );
};

insert();
