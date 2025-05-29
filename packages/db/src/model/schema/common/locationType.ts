import { pgEnum } from "drizzle-orm/pg-core";

export const locationType = pgEnum("location_type", [
  "country",
  "state",
  "city",
  "neighborhood",
]);
