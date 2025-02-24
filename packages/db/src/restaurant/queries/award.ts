import { AwardId, DistinctionId } from "@rono/types";
import sql, { SQLStatement } from "sql-template-strings";
import { InsertAward } from "../types";

export const insertAwardQuery = (award: InsertAward): SQLStatement => {
  return sql`
    INSERT INTO
      restaurant_award (
        restaurant_id,
        award_type_id,
        award_date,
        rank,
        metadata
      )
    VALUES
      (
        ${award.restaurantId},
        ${award.awardTypeId},
        ${award.awardDate},
        ${undefined},
        ${undefined}
      )
    ON CONFLICT ON CONSTRAINT unique_awards DO NOTHING
    RETURNING
      id
  `;
};

export const insertDistinctionQuery = (
  awardId: AwardId,
  distinctionId: DistinctionId,
): SQLStatement => {
  return sql`
    INSERT INTO
      restaurant_award_distinction (restaurant_award_id, distinction_id)
    VALUES
      (
        ${awardId},
        ${distinctionId}
      )
  `;
};
