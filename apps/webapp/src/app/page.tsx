import { LocationsDb, RestaurantsDb } from "@rono/db-legacy";
import { Geoloc } from "@rono/geoloc";
import { MichelinScraper } from "@rono/michelin-scraper";
import { SignIn } from "../components/auth/SignIn";
import { Page } from "../components/ui/page";
import { MichelinService } from "../lib";
import { RestaurantsGrid } from "./RestaurantsGrid";

export default async function Home() {
  const restaurantDb = new RestaurantsDb();
  const rows = await restaurantDb.getRestaurants();
  const scraper = new MichelinScraper("chicago");
  const geoloc = new Geoloc(
    "pk.eyJ1Ijoicmlja29ubyIsImEiOiJjbHMwdTJ1MjQwNG4wMmttb3FoMWdlN3UyIn0.WBttgeAdcYSV-2YxREfbxQ",
  );
  const locationsDb = new LocationsDb();
  const service = new MichelinService(
    scraper,
    restaurantDb,
    locationsDb,
    geoloc,
  );
  // service.scrape();

  return (
    <Page title="Restaurants" current="Restaurants">
      <SignIn />
      <div className="w-full h-full">
        <RestaurantsGrid restaurants={rows} />
      </div>
    </Page>
  );
}
