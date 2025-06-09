"use client";
import { Restaurant } from "@rono/types";
import {
  AllCommunityModule,
  ColDef,
  GetRowIdFunc,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { FC } from "react";
import {
  MichelinAwardCellRenderer,
  michelinAwardComparator,
} from "./MichelinAwardCellRenderer";
import { ReservationCellRenderer } from "./ReservationCellRenderer";

ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs: ColDef<Restaurant>[] = [
  { field: "name" },
  {
    field: "cuisines",
    valueGetter: ({ data }) => {
      return data?.cuisines?.map((cuisine) => cuisine.name) ?? [];
    },
    valueFormatter: ({ value }) => value.join(", "),
  },
  {
    headerName: "City",
    valueGetter: ({ data }) => {
      const cityObj = data?.locations?.find((loc) => loc.type === "city");
      const stateObj = data?.locations?.find((loc) => loc.type === "state");
      const neighborhoodObj = data?.locations?.find(
        (loc) => loc.type === "neighborhood",
      );
      const countryObj = data?.locations?.find((loc) => loc.type === "country");
      return [neighborhoodObj, cityObj, stateObj, countryObj];
    },
    valueFormatter: ({ value }) => {
      const [_, cityObj, stateObj, countryObj] = value;
      const city: string | undefined = cityObj?.name;
      const state: string | undefined = stateObj?.abbr || stateObj?.name;
      const country: string | undefined = countryObj?.name;

      const specific = city ?? state ?? country ?? "";
      const general = state ?? country ?? "";

      return specific === general || !general
        ? specific
        : `${specific}, ${general}`;
    },
    filter: "agTextColumnFilter",
    filterValueGetter: ({ data }) => {
      const cityObj = data?.locations?.find((loc) => loc.type === "city");
      const stateObj = data?.locations?.find((loc) => loc.type === "state");
      const neighborhoodObj = data?.locations?.find(
        (loc) => loc.type === "neighborhood",
      );
      const countryObj = data?.locations?.find((loc) => loc.type === "country");
      return [neighborhoodObj, cityObj, stateObj, countryObj]
        .map((locObj) => [locObj?.name, locObj?.abbr].filter(Boolean).join("|"))
        .join("|");
    },
  },
  {
    headerName: "Awards",
    valueGetter: ({ data }) => (data?.awards ? data?.awards[0] : null),
    comparator: michelinAwardComparator,
    cellRenderer: MichelinAwardCellRenderer,
  },
  {
    headerName: "Website",
    field: "website",
    onCellDoubleClicked: ({ value }) => window.open(value, "_blank"),
    cellStyle: { cursor: "pointer", textDecoration: "underline" },
  },
  {
    headerName: "Reserve",
    field: "booking",
    cellRenderer: ReservationCellRenderer,
  },
];

interface Props {
  restaurants: Restaurant[];
}

const getRowId: GetRowIdFunc<Restaurant> = (row): string =>
  row.data.id.toString();

export const RestaurantsGrid: FC<Props> = ({ restaurants }) => {
  return (
    <div className="h-200">
      <AgGridReact<Restaurant>
        columnDefs={colDefs}
        rowData={restaurants}
        pagination
        getRowId={getRowId}
      />
    </div>
  );
};
