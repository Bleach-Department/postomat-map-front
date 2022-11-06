import { FC } from "react";

import { MapGL, Sidebar } from "./components";
import MapSwitch from "./components/MapSwitch/MapSwitch";

import { mapStyle } from "./util/mapStyle";
import { initialMapViewState } from "./util/initialMapViewState";

import { Buffer } from "buffer";
global.Buffer = Buffer;

type Props = {};

const App: FC<Props> = () => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(requestData());
  //   dispatch(getPoints())
  // }, [dispatch]);

  return (
    <>
      <Sidebar />
      <MapSwitch />
      <MapGL initialViewState={initialMapViewState} mapStyle={mapStyle} />
      {/* <PdfReport /> */}
    </>
  );
};

export default App;
