import DeckGL from "@deck.gl/react/typed";
import { FC, useRef } from "react";
import Map, { MapRef } from "react-map-gl";
import { InitialViewStateType } from "./types";
import { DeckGLRef } from "@deck.gl/react/typed";
import FileSaver from "file-saver";

type Props = {
  initialViewState: InitialViewStateType;
  mapStyle: string;
  layers: any[];
};

const MapGL: FC<Props> = ({ initialViewState, mapStyle, layers }) => {
  const deckRef = useRef<DeckGLRef>(null);
  const mapRef = useRef<MapRef>(null);

  const handleDownload = () => {
    const fileName = "Map.png";

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

    merge.toBlob((blob) => {
      FileSaver.saveAs(blob as Blob, fileName);
    });
  };

  return (
    <DeckGL
      ref={deckRef}
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <Map ref={mapRef} mapStyle={mapStyle} preserveDrawingBuffer={true} />
    </DeckGL>
  );
};

export default MapGL;
