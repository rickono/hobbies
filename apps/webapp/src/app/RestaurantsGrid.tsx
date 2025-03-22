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
      console.log("value", value);
      const [_, cityObj, stateObj, __] = value;
      return `${cityObj?.name}, ${stateObj?.abbr}`;
    },
    filter: "agTextColumnFilter",
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
    <div className="h-100">
      <AgGridReact<Restaurant>
        columnDefs={colDefs}
        rowData={restaurants}
        pagination
        getRowId={getRowId}
      />
    </div>
  );
};
