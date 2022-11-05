import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";

import { MapGL, Sidebar } from "./components";
import MapSwitch from "./components/MapSwitch/MapSwitch";

import { InitialViewStateType } from "./components/MapGL/types";
import { requestData } from "./store/reducers/user/UserActionCreator";

type Props = {};

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { regions, regionsOptions } = useAppSelector(
    (state) => state.userReducer
  );

  const [initialViewState] = useState<InitialViewStateType>({
    longitude: 37.6174943,
    latitude: 55.7504461,
    zoom: 7.6,
  });

  const [mapStyle] = useState<string>(
    "mapbox://styles/mapbox/navigation-night-v1"
  );

  useEffect(() => {
    dispatch(requestData());
  }, []);

  const pointsLayers: any[] = useMemo(
    () => [
      new GeoJsonLayer({
        id: "administries-layer",
        data: regions,
        pickable: true,
        stroked: true,
        filled: false,
        pointType: "circle",
        lineWidthScale: 20,
        lineWidthMinPixels: 1.5,
        lineCapRounded: true,
        lineJointRounded: true,
        getLineColor: [255, 255, 0],
      }),
    ],
    [regions]
  );

  const heatmap_data = [
    { COORDINATES: [36.81592, 55.48426], WEIGHT: 1 },
    { COORDINATES: [37.81592, 55.78426], WEIGHT: 2 },
  ];

  const heatmapLayers: any[] = useMemo(
    () => [
      new HeatmapLayer({
        id: "heatmap-layer",
        data: heatmap_data,
        getPosition: (d) => d.COORDINATES,
        getWeight: (d) => d.WEIGHT,
        aggregation: "SUM",
      }),
    ],
    []
  );

  return (
    <>
      <Sidebar />
      <MapSwitch />
      <MapGL
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        layers={heatmapLayers}
      />
    </>
  );
};

export default App;
