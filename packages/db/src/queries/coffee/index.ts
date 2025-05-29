import { DatabaseConnection } from "../../DatabaseConnection";
import { ProducerDb } from "./producer";
import { RoasterDb } from "./roaster";

export class CoffeeDb {
  public readonly roaster: RoasterDb;
  public readonly producer: ProducerDb;

  public constructor(db: DatabaseConnection) {
    this.roaster = new RoasterDb(db);
    this.producer = new ProducerDb(db);
  }
}
