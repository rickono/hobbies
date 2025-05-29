import { Feature } from "./types";

interface ReverseGeocodeResponse {
  features: Feature[];
}

interface GeocodeResponse {
  features: Feature[];
}

export class Geoloc {
  public constructor(private readonly apiKey: string) {}

  public async reverseGeocode(
    lng: number,
    lat: number,
  ): Promise<ReverseGeocodeResponse> {
    const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${this.apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  public async search(searchString: string): Promise<GeocodeResponse> {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${searchString}&access_token=${this.apiKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}

/**
self.access_token = "pk.eyJ1Ijoicmlja29ubyIsImEiOiJjbHMwdTJ1MjQwNG4wMmttb3FoMWdlN3UyIn0.WBttgeAdcYSV-2YxREfbxQ"
 */
