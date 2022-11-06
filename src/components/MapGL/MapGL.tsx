import { FC, useEffect, useRef, useState } from "react";
import Map, { MapRef, Source } from "react-map-gl";
import { useAppSelector } from "../../hooks/redux";
import HeatmapLayer from "../Layers/HeatmapLayer/HeatmapLayer";

import PointsLayer from "../Layers/PointsLayer/PointsLayer";

import { InitialViewStateType } from "./types";

type Props = {
  initialViewState: InitialViewStateType;
  mapStyle: string;
};

const MapGL: FC<Props> = ({ initialViewState, mapStyle }) => {
  const { mapState } = useAppSelector((state) => state.userReducer);

  const mapRef = useRef<MapRef>(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={initialViewState}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={mapStyle}
    >
      {mapState === "Points" && (
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          {PointsLayer()}
        </Source>
      )}

      {mapState === "Heatmap" && (
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        >
          {HeatmapLayer()}
        </Source>
      )}
    </Map>
  );
};

export default MapGL;
