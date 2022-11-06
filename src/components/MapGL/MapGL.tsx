import DeckGL from "@deck.gl/react/typed";
import { FC, useEffect, useRef } from "react";
import Map, { MapRef } from "react-map-gl";
import { InitialViewStateType } from "./types";
import { DeckGLRef } from "@deck.gl/react/typed";
import { useDispatch } from "react-redux";
import { setMapImageSrc } from "../../store/reducers/user/UserSlice";

type Props = {
  initialViewState: InitialViewStateType;
  mapStyle: string;
  layers: any[];
};

const MapGL: FC<Props> = ({ initialViewState, mapStyle, layers }) => {
  const dispatch = useDispatch();

  const deckRef = useRef<DeckGLRef>(null);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const setMapImage = () => {
      if (!mapRef.current || !deckRef.current) return;

      const mapGL = mapRef.current.getMap();
      const deck = deckRef.current.deck;

      if (!mapGL || !deck) return;

      const mapboxCanvas = mapGL.getCanvas();
      // @ts-ignore: Unreachable code error
      const deckglCanvas = deck.canvas as HTMLCanvasElement;

      let merge = document.createElement("canvas");
      merge.width = mapboxCanvas.width;
      merge.height = mapboxCanvas.height;

      var context = merge.getContext("2d");

      if (!context) return;

      deck.redraw("true");
      context.globalAlpha = 1.0;
      context.drawImage(mapboxCanvas, 0, 0);
      context.globalAlpha = 1.0;
      context.drawImage(deckglCanvas, 0, 0);

      dispatch(setMapImageSrc(merge.toDataURL("image/png")));
    };

    setTimeout(() => {
      setMapImage();
    }, 1000);
  }, [layers, dispatch]);

  return (
    <DeckGL
      ref={deckRef}
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      getTooltip={({ object }) => object && object.properties.name}
    >
      <Map ref={mapRef} mapStyle={mapStyle} preserveDrawingBuffer={true} />
    </DeckGL>
  );
};

export default MapGL;
