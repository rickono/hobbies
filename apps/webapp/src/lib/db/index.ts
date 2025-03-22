import { DatabaseConnection } from "@rono/db";
import "dotenv/config";

export let db: DatabaseConnection | null = null;

if (db === null) {
  db = new DatabaseConnection();
}
