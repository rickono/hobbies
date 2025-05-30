import { FlavorBibleDb } from "@rono/db-legacy";
import { FlavorBibleEntry } from "@rono/types";
import { isDefined } from "@rono/utils";
import { FC } from "react";
import { Page } from "../../../components/ui/page";
import { EntrySection } from "./entries/EntrySection";

const Cooking: FC = async () => {
  const flavorDb = new FlavorBibleDb();
  const entries = await flavorDb.getAllEntries();

  const byAlpha: Record<string, FlavorBibleEntry[]> = {};

  for (const entry of entries) {
    const alpha = entry.name[0];
    if (!isDefined(alpha)) {
      continue;
    }
    if (!isDefined(byAlpha[alpha])) {
      byAlpha[alpha] = [];
    }
    byAlpha[alpha].push(entry);
  }

  return (
    <Page title="Flavor Bible" current="Flavor Bible">
      {Object.entries(byAlpha).map(([letter, entries]) => (
        <EntrySection title={letter} entries={entries} key={letter} />
      ))}
    </Page>
  );
};

export default Cooking;
