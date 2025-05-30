import { AwardId, DistinctionId } from "@rono/types";
import { insertAward, insertDistinction } from "../service";
import { InsertAward } from "../types";

export class AwardManager {
  public async insertAward(award: InsertAward): Promise<AwardId | undefined> {
    return insertAward(award);
  }

  public async insertDistinction(
    awardId: AwardId,
    distinctionId: DistinctionId,
  ): Promise<void> {
    insertDistinction(awardId, distinctionId);
  }
}
