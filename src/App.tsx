import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { GeoJsonLayer } from "@deck.gl/layers/typed";

import { MapGL, Sidebar } from "./components";

import { InitialViewStateType } from "./components/MapGL/types";
import { requestData } from "./store/reducers/user/UserActionCreator";

type Props = {};

const App: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.userReducer);

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

  const layers: any[] = useMemo(
    () => [
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
    ],
    [data]
  );

  return (
    <>
      <Sidebar />
      <MapGL
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        layers={layers}
      />
    </>
  );
};

export default App;
