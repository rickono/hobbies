declare const distinctionIdBrand: unique symbol;
export type DistinctionId = string & { [distinctionIdBrand]: "DistinctionId" };

export function DistinctionId(id: string): DistinctionId {
  return id as DistinctionId;
}

DistinctionId.NULL = DistinctionId("");
