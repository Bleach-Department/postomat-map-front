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
      <div className="flex flex-col justify-center gap-4">
        <Select
          className="w-full"
          maxMenuHeight={60}
          options={formatOptions}
          defaultInputValue={"Выбрать"}
        ></Select>
        <button className="extract-btn">Выгрузить</button>
      </div>
    </section>
  );
};

export default memo(DownloadSection);
