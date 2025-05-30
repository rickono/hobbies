import { DatabaseConnection } from "@rono/db-legacy";
import "dotenv/config";

let conn: DatabaseConnection | null = null;

if (conn === null) {
  conn = new DatabaseConnection();
}
