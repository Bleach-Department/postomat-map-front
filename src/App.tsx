import { FC, useEffect, useState } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";

import { MapGL, PdfReport } from "./components";

import { InitialViewStateType } from "./components/MapGL/types";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Buffer } from "buffer";
global.Buffer = Buffer;

type Props = {};

const App: FC<Props> = () => {
  /* 
  !! useAppDispatch для вызова reducer
  !! useAppSelector для получения стейта

  const dispatch = useAppDispatch();
  const { isLoading, test, userError } = useAppSelector(
    (state) => state.userReducer
  );
  */

  // useEffect(() => {
  //   if (map) {
  //     map.on("load", () => console.log(map.getCanvas().toDataURL()));
  //   }
  // }, [map]);

  const [initialViewState] = useState<InitialViewStateType>({
    longitude: 37.6174943,
    latitude: 55.7504461,
    zoom: 7.6,
  });
  const [mapStyle] = useState<string>(
    "mapbox://styles/mapbox/navigation-night-v1"
  );
  const [data, setData] = useState<any>(null);
  const geojsonFileName: string = "ao.json";

  useEffect(() => {
    const fetchData: () => void = async () => {
      await fetch(geojsonFileName, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setData(myJson);
        });
    };
    fetchData();
  }, []);

  const layers: any[] = [
    new GeoJsonLayer({
      id: "geojson-layer",
      data,
      pickable: true,
      stroked: true,
      filled: false,
      pointType: "circle",
      lineWidthScale: 20,
      lineWidthMinPixels: 1.5,
      getLineColor: [255, 255, 0],
    }),
  ];

  return (
    <>
      <MapGL
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        layers={layers}
      />
    </>
    // <PdfReport />
  );
};

export default App;
