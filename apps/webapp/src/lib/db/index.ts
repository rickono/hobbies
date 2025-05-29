import { DatabaseConnection } from "@rono/db";
import "dotenv/config";

let conn: DatabaseConnection | null = null;

if (conn === null) {
  conn = new DatabaseConnection();
}
