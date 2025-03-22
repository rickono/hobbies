import { Restaurant } from "@rono/types";
import { CustomCellRendererProps } from "ag-grid-react";
import { FC } from "react";
import { OpenTableIcon, ResyIcon, TockIcon } from "../components/dining";

export const ReservationCellRenderer: FC<
  CustomCellRendererProps<Restaurant>
> = ({ data }) => {
  const booking = data?.booking?.[0];
  if (!booking) {
    return null;
  }
  const { id: provider, url } = booking;
  let Icon: FC | null = null;

  switch (provider) {
    case "tock":
      Icon = TockIcon;
      break;
    case "resy":
      Icon = ResyIcon;
      break;
    case "opentable":
      Icon = OpenTableIcon;
      break;
  }
  return (
    <div className="flex items-center h-full">
      <a href={url} target="_blank" rel="noreferrer">
        <Icon />
      </a>
    </div>
  );
};
