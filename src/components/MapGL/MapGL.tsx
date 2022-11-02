import DeckGL from "@deck.gl/react/typed";
import { FC, useCallback, useEffect, useRef } from "react";
import { Map, MapRef, useMap } from "react-map-gl";
import { InitialViewStateType } from "./types";

type Props = {
  initialViewState: InitialViewStateType;
  mapStyle: string;
  layers: any[];
};

const MapGL: FC<Props> = ({ initialViewState, mapStyle, layers }) => {
  const mapRef = useRef<MapRef>(null);

  const onMapLoad = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.on("click", () => {
        var data = mapRef.current?.getCanvas().toDataURL() || "";
        if (data) {
          console.log(data);
          var a = document.createElement("a");
          a.href = data;
          a.download = "map.png";
          document.body.appendChild(a);
          a.click();
          console.log("Click");
        }
      });
    }
  }, [mapRef]);

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        mapStyle={mapStyle}
        preserveDrawingBuffer={true}
      />
    </DeckGL>
  );
};

export default MapGL;
