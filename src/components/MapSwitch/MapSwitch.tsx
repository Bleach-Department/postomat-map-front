import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setMapState } from "../../store/reducers/user/UserSlice";
import { MapStateType } from "../../types/mapStateTypes";

import ArrowRightIcon from "../icons/ArrowRightIcon";

import "./MapSwitch.css";

const MapSwitch = () => {
  const dispatch = useDispatch();

  const switchItems = useMemo(
    () => [
      {
        label: "Точки",
        value: "Points" as MapStateType,
      },
      {
        label: "Сектора",
        value: "Sectors" as MapStateType,
      },
      {
        label: "Heatmap",
        value: "Heatmap" as MapStateType,
      },
    ],
    []
  );

  const [activeItem, setActiveItem] = useState<{
    label: string;
    value: MapStateType;
  }>(switchItems[0]);

  const handleLeftClick = () => {
    const nextIndex = switchItems.indexOf(activeItem) - 1;

    if (nextIndex < 0) {
      setActiveItem(switchItems[switchItems.length - 1]);
    } else {
      setActiveItem(switchItems[nextIndex]);
    }

    dispatch(setMapState(activeItem.value));
  };

  const handleRightClick = () => {
    const nextIndex = switchItems.indexOf(activeItem) + 1;

    if (nextIndex > switchItems.length - 1) {
      setActiveItem(switchItems[0]);
    } else {
      setActiveItem(switchItems[nextIndex]);
    }

    dispatch(setMapState(activeItem.value));
  };

  return (
    <div className="map-switch-container">
      <button className="arrow-left" onClick={handleLeftClick}>
        <ArrowRightIcon />
      </button>

      <div className="map-switch-item">{activeItem.label}</div>

      <button className="arrow-right" onClick={handleRightClick}>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default MapSwitch;
