import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";

import DownloadSection from "../DownloadSection/DownloadSection";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import OpenButton from "./components/OpenButton/OpenButton";
import DiscreteSlider from "../DiscreteSlider/DiscreteSlider";
import DemandIndexSection from "./components/DemandIndexSection/DemandIndexSection";

import { placeTypes } from "../../util/placeTypes";

import "./Sidebar.css";

const Sidebar = () => {
  const { regionsOptions, districtsOptions } = useAppSelector(
    (state) => state.userReducer
  );

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
            options={regionsOptions}
          />

          <MultipleSelect title="Район(ы):" options={districtsOptions} />

          <MultipleSelect
            title="Тип объекта размещения:"
            options={placeTypes}
          />

          <DemandIndexSection />

          <div className="flex flex-col">
            <p className="category-title py-1">Расстояние:</p>
            <DiscreteSlider />
          </div>

          <button className="extract-btn mt-3">Применить</button>
        </section>

        <DownloadSection />
      </div>
    </div>
  );
};

export default Sidebar;
