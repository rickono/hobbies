declare const awardIdBrand: unique symbol;
export type AwardId = string & { [awardIdBrand]: "AwardId" };

export function AwardId(id: string): AwardId {
  return id as AwardId;
}

AwardId.NULL = AwardId("");
