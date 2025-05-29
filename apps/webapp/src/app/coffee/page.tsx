import { query } from "@rono/db";
import { Button } from "components/ui/Button";
import { FormLayout, FormSection } from "components/ui/forms/form-layout";
import { Link } from "components/ui/Link";
import { Page } from "../../components/ui/page";
import { LocationInput } from "./components/LocationInput";

export default async function Home() {
  const roasters = query.coffee.roaster.getAll();
  console.log(roasters);

  return (
    <Page title="Coffee" current="Coffee">
      <div className="w-full h-full bg-white px-8 py-10 rounded-xl shadow-sm">
        <FormLayout>
          <FormSection header="Coffee" description="About the coffee">
            <div className="col-span-6 flex flex-col gap-3">
              <div className="flex flex-col gap-4">
                <LocationInput />
              </div>
              <Link href="#">+ New location</Link>
              <Button>New location</Button>
            </div>
          </FormSection>
        </FormLayout>
      </div>
    </Page>
  );
}
