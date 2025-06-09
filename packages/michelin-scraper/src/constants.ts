import { LocationMeta, MichelinLocation } from "./types";

export const LOCATIONS: Record<MichelinLocation, LocationMeta> = {
  chicago: {
    latLng: "41.8907039,-87.6309689",
    isState: false,
    filters: [["country.cname:united-states"], ["region.slug:illinois"]],
  },
  "new york": {
    latLng: "40.7130466,-74.0072301",
    isState: true,
    filters: [["country.cname:united-states"], ["region.slug:new-york-state"]],
  },
};
