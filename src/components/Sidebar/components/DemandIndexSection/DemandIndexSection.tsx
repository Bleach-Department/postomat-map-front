import { memo, useState } from "react";

const DemandIndexSection = () => {
  const [fromValue, setFromValue] = useState<string>("0");
  const [toValue, setToValue] = useState<string>("100");

  return (
    <div className="mb-3">
      <p className="category-title py-1">Показатель востребованности:</p>
      <div className="flex flex-row align-center justify-between">
        <div className="flex flex-row align-center">
          <p>от</p>
          <input
            className="input-small w-full"
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
          />
        </div>
        <div className="flex flex-row align-center">
          <p>до</p>
          <input
            className="input-small w-full"
            type="number"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(DemandIndexSection);
