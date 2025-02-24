import { Location, LocationType } from "@rono/types";

export const locationSpecificities: Record<LocationType, number> = {
  neighborhood: 0,
  city: 1,
  state: 2,
  country: 3,
};

export function getMostSpecificLocation(
  locations: Location[],
): Location | undefined {
  let lowestSpecificity = Infinity;
  let lowestLocation: Location | undefined;
  for (const location of locations) {
    const specificity = locationSpecificities[location.type];
    if (specificity < lowestSpecificity) {
      lowestSpecificity = specificity;
      lowestLocation = location;
    }
  }
  return lowestLocation;
}
