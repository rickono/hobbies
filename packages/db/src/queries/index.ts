import { DatabaseConnection } from "../DatabaseConnection";
import { CoffeeDb } from "./coffee";
import { LocationDb } from "./location";

export class Query {
  public coffee: CoffeeDb;
  public location: LocationDb;

  public constructor(db: DatabaseConnection) {
    this.coffee = new CoffeeDb(db);
    this.location = new LocationDb(db);
  }
}
