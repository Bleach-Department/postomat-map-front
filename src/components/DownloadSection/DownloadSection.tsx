import { PDFDownloadLink } from "@react-pdf/renderer";
import { memo } from "react";
import { useAppSelector } from "../../hooks/redux";
import PdfReport from "../PdfReport";

const DownloadSection = () => {
  const { mapImageSrc } = useAppSelector((state) => state.userReducer);

  return (
    <section className="mt-3">
      <hr />
      <p className="text-2xl py-2">Скачать файл</p>
      <div className="flex flex-row justify-center items-center gap-4">
        <a href="#" className="extract-btn text-center">
          Excel
        </a>
        {mapImageSrc && (
          <PDFDownloadLink
            className="extract-btn text-center"
            document={<PdfReport imageSrc={mapImageSrc} />}
            fileName="map.pdf"
          >
            {({ blob, url, loading, error }) => {
              console.log("blob", blob);
              console.log("url", url);
              console.log("loading", loading);
              console.log("error", error);
              return loading ? "Loading document..." : "PDF";
            }}
          </PDFDownloadLink>
        )}
      </div>
    </section>
  );
};

export default memo(DownloadSection);
