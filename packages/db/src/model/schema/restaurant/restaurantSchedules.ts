import { foreignKey, integer, pgTable } from "drizzle-orm/pg-core";
import { restaurant } from "./restaurant";
import { restaurantSchedule } from "./restaurantSchedule";

export const restaurantSchedules = pgTable(
  "restaurant_schedules",
  {
    restaurantId: integer("restaurant_id"),
    scheduleId: integer("schedule_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.restaurantId],
      foreignColumns: [restaurant.id],
      name: "restaurant_schedules_restaurant_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.scheduleId],
      foreignColumns: [restaurantSchedule.id],
      name: "restaurant_schedules_schedule_id_fkey",
    }).onDelete("cascade"),
  ],
);
