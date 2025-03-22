import { MichelinAward, MichelinDistinction, Restaurant } from "@rono/types";
import { CustomCellRendererProps } from "ag-grid-react";
import { FC } from "react";
import { MichelinBadge } from "../components/dining/MichelinBadge";
import { isDefined } from "../lib/type-guards";

export const MichelinAwardCellRenderer: FC<
  CustomCellRendererProps<Restaurant, MichelinAward>
> = ({ value }) => {
  if (!isDefined(value)) {
    return null;
  }
  return <MichelinBadge award={value} />;
};

const distinctionTiers: Record<MichelinDistinction, number> = {
  "michelin-green-star": 0.5,
  "michelin-bib-gourmand": 2,
  "michelin-1-star": 3,
  "michelin-2-star": 4,
  "michelin-3-star": 5,
};

export const michelinAwardComparator = (
  valueA: MichelinAward,
  valueB: MichelinAward,
): number => {
  const distinctionA = valueA.distinctions;
  const distinctionB = valueB.distinctions;
  const distinctionASum = distinctionA.reduce(
    (acc, distinction) =>
      distinctionTiers[distinction.id as MichelinDistinction] + acc,
    0,
  );
  const distinctionBSum = distinctionB.reduce(
    (acc, distinction) =>
      distinctionTiers[distinction.id as MichelinDistinction] + acc,
    0,
  );
  return distinctionASum - distinctionBSum;
};
