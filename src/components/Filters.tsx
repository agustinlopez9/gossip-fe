import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import RadioGroup from "./ui/RadioGroup/RadioGroup";
//import Select from "./ui/Select";

const OptionLabels = {
  all: "all",
  trending: "trending",
  following: "following",
};

const getOptions = (t: TFunction) => {
  return Object.keys(OptionLabels).map((option) => {
    const label = t(`posts.labels.${OptionLabels[option as keyof typeof OptionLabels]}`);
    return { label: label, name: label, value: option };
  });
};

const Filters = () => {
  const [filter, setFilter] = useState("all");
  const { t } = useTranslation();
  const options = getOptions(t);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="my-2 px-2">
      <div className="flex flex-row gap-2">
        {/* TODO: Implement filters functionality */}
        <RadioGroup>
          {options.map((option) => (
            <RadioGroup.Item
              key={option.value}
              onChange={handleFilterChange}
              checked={filter === option.value}
              name={option.name}
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioGroup>
      </div>
      {/*       <Select options={options} /> */}
    </div>
  );
};

export default Filters;
