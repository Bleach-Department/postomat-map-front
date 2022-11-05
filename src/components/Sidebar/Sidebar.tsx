import { FC, useState } from "react";

import DownloadSection from "../DownloadSection/DownloadSection";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import OpenButton from "./components/OpenButton/OpenButton";

import "./Sidebar.css";

import { seletOptionType } from "../../types/seletOptionType";

import { adminitriesOptions } from "./snapshots";

interface SidebarProps {
  regions: seletOptionType[];
}

const Sidebar: FC<SidebarProps> = ({ regions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={isOpen ? "sidebar-wrapper" : "sidebar-wrapper closed"}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <OpenButton isOpen={isOpen} />
      </div>

      <div className="sidebar-content">
        <section>
          <p className="text-2xl py-2">Фильтры</p>

          <hr className="py-2" />

          <MultipleSelect
            title="Административные округ(а):"
            options={regions}
          />

          <MultipleSelect title="Район(ы):" options={adminitriesOptions} />

          <MultipleSelect
            title="Тип объекта размещения:"
            options={adminitriesOptions}
          />

          <div className="mb-3">
            <p className="category-title py-1">Показатель востребованности:</p>
            <div className="flex flex-row align-center justify-between">
              <div className="flex flex-row align-center">
                <p>от</p>
                <input
                  className="input-small w-full"
                  type="number"
                  value="0"
                  onChange={() => {}}
                />
              </div>
              <div className="flex flex-row align-center">
                <p>до</p>
                <input
                  className="input-small w-full"
                  type="number"
                  value="100"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>

          <button className="extract-btn mt-3">Применить</button>
        </section>

        <DownloadSection />
      </div>
    </div>
  );
};

export default Sidebar;
