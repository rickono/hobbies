import { FlavorBibleAssociation } from "@rono/types";
import { FC } from "react";
import { Text } from "../../../../components/ui";

interface Props {
  association: FlavorBibleAssociation;
}

export const FlavorBibleAssociationRow: FC<Props> = ({ association }) => {
  return <Text>{association.name}</Text>;
};
