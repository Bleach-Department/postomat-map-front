import { FC, memo, useState } from "react";
import Select from "react-select";

import { seletOptionType } from "../../types/seletOptionType";

interface MultipleSelectProps {
  title?: string;
  options: seletOptionType[];
}

const MultipleSelect: FC<MultipleSelectProps> = ({ options, title }) => {
  const [chooseAll, setChooseAll] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-start justify-center mb-3">
      {title && <p className="category-title py-1">{title}</p>}
      <Select
        className="w-full"
        isDisabled={chooseAll}
        closeMenuOnSelect={false}
        options={options}
        maxMenuHeight={150}
        placeholder={"Выбрать"}
        noOptionsMessage={() => "Здесь ничего нет"}
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

export default memo(MultipleSelect);
