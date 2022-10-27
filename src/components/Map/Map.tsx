import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl";
import { useEffect, useState } from "react";

const INITIAL_VIEW_STATE = {
  longitude: 37.6174943,
  latitude: 55.7504461,
  zoom: 5,
  pitch: 0,
  bearing: 0,
};

const Mapbox = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("ao.json", {
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
    getData();
  }, []);

  const layers = [
    new GeoJsonLayer({
      id: "geojson",
      data,
      stroked: true,
      filled: false,
      lineWidthScale: 20,
      lineWidthMinPixels: 7,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        mapStyle="mapbox://styles/k05m0navt/ckio21zd12m3k17m3zkbskyqo"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
};

export default Mapbox;
