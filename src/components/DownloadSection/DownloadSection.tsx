import { memo, useMemo } from "react";
import Select from "react-select";

const DownloadSection = () => {
  const formatOptions = useMemo(
    () => [
      { value: "PDF", label: "PDF" },
      { value: "Excel", label: "Excel" },
    ],
    []
  );

  return (
    <section className="mt-3">
      <hr />
      <p className="text-2xl py-2">Скачать файл</p>
      <div className="flex flex-row justify-center items-center gap-4">
        <button className="extract-btn">Excel</button>
        <button className="extract-btn">PDF</button>
      </div>
    </section>
  );
};

export default memo(DownloadSection);
