import { Pool, QueryResult, QueryResultRow } from "pg";
import { SQLStatement } from "sql-template-strings";
import { Query } from "./queries";

declare global {
  // Ensuring we don't get type errors during hot reloads in development
  // eslint-disable-next-line no-var
  var dbConnection: DatabaseConnection | undefined;
}

export class DatabaseConnection {
  private readonly pool: Pool;

  public constructor() {
    this.pool = new Pool(); // Uses environment variables for connection
  }

  public async query<R extends QueryResultRow = any>(
    sql: string | SQLStatement,
  ): Promise<QueryResult<R>> {
    const result = await this.pool.query<R>(sql);
    return result;
  }
}

// Only create a new connection if it doesn't already exist
export const db = global.dbConnection || new DatabaseConnection();

// Persist the connection in development (to avoid reconnecting on hot reload)
if (process.env.NODE_ENV !== "production") {
  global.dbConnection = db;
}

export const query = new Query(db);
