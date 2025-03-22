import { FlavorBibleEntry } from "@rono/types";
import { FC } from "react";
import { Text } from "../../../../components/ui";

interface Props {
  title: string;
  entries: FlavorBibleEntry[];
}

export const EntrySection: FC<Props> = ({ title, entries }) => {
  return (
    <div>
      <Text>{title}</Text>
      {entries.map((entry) => (
        <a href={`flavor-bible/${entry.id}`}>
          <Text key={entry.id}>{entry.name}</Text>
        </a>
      ))}
    </div>
  );
};
