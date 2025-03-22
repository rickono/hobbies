import { query } from "@rono/db";
import { Page } from "../../components/ui/page";
import { db } from "../../lib/db";

export default async function Home() {
  console.log(await query.roaster.getAll(db!));
  return (
    <Page title="Coffee">
      <div className="w-full h-full"></div>
    </Page>
  );
}
