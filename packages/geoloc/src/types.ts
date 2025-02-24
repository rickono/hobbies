export interface Feature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [lng: number, lat: number];
  };
  properties: Properties;
}

type FeatureType =
  | "address"
  | "postcode"
  | "locality"
  | "place"
  | "district"
  | "region"
  | "country"
  | "neighborhood";

interface Properties {
  mapbox_id: string;
  feature_type: FeatureType;
  full_address: string;
  name: string;
  coordinates: {
    longitude: number;
    latitude: number;
    accuracy?: "parcel";
  };
  place_formatted: string;
  context: Partial<Context>;
}

interface BaseContext {
  mapbox_id: string;
  name: string;
}

interface AddressContext extends BaseContext {
  address_number: string;
  street_name: string;
}

interface RegionContext extends BaseContext {
  region_code: string;
  region_code_full: string;
}

interface CountryContext extends BaseContext {
  country_code: string;
  country_code_alpha_3: string;
}

interface PlaceContext extends BaseContext {
  alternate: BaseContext;
}

interface Context {
  address: AddressContext;
  street: BaseContext;
  postcode: BaseContext;
  locality: BaseContext;
  place: PlaceContext;
  district: BaseContext;
  region: RegionContext;
  country: CountryContext;
}
