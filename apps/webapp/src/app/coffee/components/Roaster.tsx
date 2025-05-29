import { Roaster } from "@rono/types";
import { FC } from "react";

interface Props {
  roaster: Roaster;
}

export const RoasterCard: FC<Props> = ({ roaster }) => {
  return (
    <div className="flex flex-col p-4 border rounded-md">
      <h3 className="text-xl font-semibold">{roaster.name}</h3>
      <h3 className="text-xl font-semibold">{roaster.location?.name}</h3>
    </div>
  );
};
