import { SourceId } from "@rono/types";
import { Select } from "components/ui/forms/select";
import { useSources } from "./CookingProvider";

interface Props {
  onChange: (value: SourceId) => void;
  value: SourceId;
}

export const SourceSelect = ({ onChange, value }: Props) => {
  const sources = useSources();

  return (
    <Select
      placeholder="Select a source"
      value={value.toString()}
      onChange={(val) => onChange(SourceId(Number(val)))}
      options={sources.map((source) => ({
        label: source.name,
        value: source.id.toString(),
      }))}
    />
  );
};
