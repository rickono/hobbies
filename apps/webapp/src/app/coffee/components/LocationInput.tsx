"use client";

import { CascadeSelect } from "components/ui";
import { SelectOption } from "components/ui/forms/select";
import { useQuery } from "hooks";
import { FC, useState } from "react";

interface Props {}

export const LocationInput: FC<Props> = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const { data: countries } = useQuery("location.getAllByType", "country");
  const { data: cities } = useQuery(
    "location.getAllByParent",
    selectedOptions[0]?.value,
  );
  console.log(selectedOptions);

  return (
    <CascadeSelect
      onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}
      steps={[
        {
          options:
            countries?.map((country) => ({
              value: country.id,
              label: country.name,
            })) ?? [],
          label: "Country",
        },
        {
          options:
            cities?.map((city) => ({
              value: city.id,
              label: city.name,
            })) ?? [],
          label: "Region",
        },
      ]}
    />
  );
};
