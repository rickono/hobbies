declare const awardTypeIdBrand: unique symbol;
export type AwardTypeId = string & { [awardTypeIdBrand]: "AwardTypeId" };

export function AwardTypeId(id: string): AwardTypeId {
  return id as AwardTypeId;
}

AwardTypeId.NULL = AwardTypeId("");
