import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";

import { requestData } from "./store/reducers/user/UserActionCreator";

import { MapGL, Sidebar } from "./components";
import MapSwitch from "./components/MapSwitch/MapSwitch";

import { mapStyle } from "./util/mapStyle";
import { initialMapViewState } from "./util/initialMapViewState";

import { Buffer } from "buffer";
global.Buffer = Buffer;

type Props = {};

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { regions, mapState } = useAppSelector((state) => state.userReducer);

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

  const heatmap_data = useMemo(
    () => [
      { COORDINATES: [36.81592, 55.48426], WEIGHT: 1 },
      { COORDINATES: [37.81592, 55.78426], WEIGHT: 2 },
    ],
    []
  );

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
    [heatmap_data]
  );

  const [activeLayer, setActiveLayer] = useState<any[]>(pointsLayers);

  useEffect(() => {
    dispatch(requestData());
  }, [dispatch]);

  useEffect(() => {
    switch (mapState) {
      case "Points":
        setActiveLayer(heatmapLayers);
        break;

      case "Heatmap":
        setActiveLayer(pointsLayers);
        break;

      default:
        setActiveLayer(pointsLayers);
        console.error("Unknown layer");
    }

    console.log(activeLayer);
  }, [mapState, activeLayer, heatmapLayers, pointsLayers]);

  return (
    <>
      <Sidebar />
      <MapSwitch />
      <MapGL
        initialViewState={initialMapViewState}
        mapStyle={mapStyle}
        layers={activeLayer}
      />
      {/* <PdfReport /> */}
    </>
  );
};

export default App;
