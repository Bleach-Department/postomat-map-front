import DeckGL from "@deck.gl/react/typed";
import { FC } from "react";
import { Map } from "react-map-gl";
import { InitialViewStateType } from "./types";

type Props = {
  initialViewState: InitialViewStateType;
  mapStyle: string;
  layers: any[];
};

const MapGL: FC<Props> = ({ initialViewState, mapStyle, layers }) => {
  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <Map mapStyle={mapStyle} />
    </DeckGL>
  );
};

export default MapGL;
