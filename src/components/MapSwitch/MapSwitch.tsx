import { useMemo, useState } from "react";
import ArrowRightIcon from "../icons/ArrowRightIcon";

import "./MapSwitch.css";

const MapSwitch = () => {
  const switchItems = useMemo(() => ["Точки", "Сектора", "Heatmap"], []);

  const [activeItem, setActiveItem] = useState<string>(switchItems[0]);

  return (
    <div className="map-switch-container">
      <button
        className="arrow-left"
        onClick={() => {
          const nextIndex = switchItems.indexOf(activeItem) - 1;

          if (nextIndex < 0) {
            setActiveItem(switchItems[switchItems.length - 1]);
          } else {
            setActiveItem(switchItems[nextIndex]);
          }
        }}
      >
        <ArrowRightIcon />
      </button>

      <div className="map-switch-item">{activeItem}</div>

      <button
        className="arrow-right"
        onClick={() => {
          const nextIndex = switchItems.indexOf(activeItem) + 1;

          if (nextIndex > switchItems.length - 1) {
            setActiveItem(switchItems[0]);
          } else {
            setActiveItem(switchItems[nextIndex]);
          }
        }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default MapSwitch;
