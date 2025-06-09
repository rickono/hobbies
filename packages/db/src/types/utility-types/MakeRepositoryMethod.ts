import { Kysely } from "kysely";
import { DB } from "../../db";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type MakeRepositoryMethod<Func extends Function> = (
  db: Kysely<DB>,
) => Func;
