import { FlavorBibleDb } from "@rono/db";
import { FlavorBibleEntryId } from "@rono/types";
import { FC } from "react";
import { Page } from "../../../../components/ui/page";
import { FlavorBibleAssociationRow } from "./FlavorBibleAssociation";

interface Props {
  params: Promise<{ id: FlavorBibleEntryId }>;
}

const FlavorBibleEntryPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const flavorBibleDb = new FlavorBibleDb();
  const entry = await flavorBibleDb.getEntry(id);

  if (!entry) {
    return null;
  }

  return (
    <Page title={entry.name}>
      <div>
        {entry.associations?.map((association) => (
          <FlavorBibleAssociationRow
            association={association}
            key={association.name}
          />
        ))}
      </div>
    </Page>
  );
};

export default FlavorBibleEntryPage;
