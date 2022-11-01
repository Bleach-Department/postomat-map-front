import { useState } from "react";
import Select from "react-select";

import MultipleSelect from "../MultipleSelect/MultipleSelect";
import OpenButton from "./components/OpenButton/OpenButton";

import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const adminitriesOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
  ];

  const formatOptions = [
    { value: "PDF", label: "PDF" },
    { value: "Excel", label: "Excel" },
  ];

  return (
    <div className={isOpen ? "sidebar-wrapper" : "sidebar-wrapper closed"}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <OpenButton isOpen={isOpen} />
      </div>

      <section>
        <p className="text-2xl py-2">Фильтры</p>

        <hr className="py-2" />

        <MultipleSelect
          title="Административные округ(а):"
          options={adminitriesOptions}
        />

        <MultipleSelect title="Район(ы):" options={adminitriesOptions} />

        <MultipleSelect
          title="Тип объекта размещения:"
          options={adminitriesOptions}
        />

        <div>
          <p className="py-1">Показатель востребованности:</p>
          <div className="flex flex-row align-center justify-between">
            <p>от</p>
            <input className="input-small w-full" type="number" value="0" />
            <p>до</p>
            <input className="input-small w-full" type="number" value="100" />
          </div>
        </div>

        <button className="extract-btn mt-3">Применить</button>
      </section>

      <section className="mt-3">
        <hr />
        <p className="text-2xl py-2">Скачать файл</p>
        <div className="flex flex-row justify-between align-center gap-4">
          <Select className="w-full" options={formatOptions}></Select>
          <button className="extract-btn">Выгрузить</button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
