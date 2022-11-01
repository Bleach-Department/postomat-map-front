import { FC, useState } from "react";
import Select, { StylesConfig } from "react-select";

interface MultipleSelectProps {
  title?: string;
  options: any[];
}

const MultipleSelect: FC<MultipleSelectProps> = ({ options, title }) => {
  const [chooseAll, setChooseAll] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {title && <p className="py-1">{title}</p>}
      <Select
        className="w-full"
        isDisabled={chooseAll}
        closeMenuOnSelect={false}
        defaultValue={[options[0], options[1]]}
        options={options}
        isMulti
      />
      <div className="flex items-center my-1 gap-1">
        <input
          name="chooseAll"
          type="checkbox"
          checked={chooseAll}
          onChange={(e) => setChooseAll(e.target.checked)}
        />
        <p>Выбрать все</p>
      </div>
    </div>
  );
};

export default MultipleSelect;
