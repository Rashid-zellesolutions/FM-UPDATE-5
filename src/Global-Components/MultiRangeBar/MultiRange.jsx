import React, { useEffect, useState } from "react";
import './MultiRange.css'
import { formatedPrice } from "../../utils/api";

const DoubleRangeSlider = (
  {
    min = 0,
    max = 100,
    initialRange,
    setInitialRange,
    onRangeChange,
    minLabel = "Min Price",
    maxLabel = "Max Price"
  }) => {
  // const [range, setRange] = useState(initialRange); // Initial min and max values

  const handleChange = (e, thumb) => {
    const newValue = Number(e.target.value);
    const updatedRange = [...initialRange];
    updatedRange[thumb] = newValue;

    // Prevent overlap
    if (thumb === 0 && newValue >= initialRange[1]) updatedRange[thumb] = initialRange[1] - 1;
    if (thumb === 1 && newValue <= initialRange[0]) updatedRange[thumb] = initialRange[0] + 1;

    setInitialRange(updatedRange);
  };

  useEffect(() => {
    onRangeChange(initialRange)
  }, [initialRange])

  return (
    <div className="slider-container">
      <div className="values">
        <span>{formatedPrice(initialRange[0])}</span>
        <span>{formatedPrice(initialRange[1])}</span>
      </div>
      <div className="range-slider">
        {/* First thumb (Min) */}
        <input
          type="range"
          min={min}
          max={max}
          value={initialRange[0]}
          onChange={(e) => handleChange(e, 0)}
          className="range-input"
        />
        {/* Second thumb (Max) */}
        <input
          type="range"
          min={min}
          max={max}
          value={initialRange[1]}
          onChange={(e) => handleChange(e, 1)}
          className="range-input"
        />
        {/* Track */}
        <div
          className="range-track"
          style={{
            // left: `${range[0]}%`,
            // right: `${100 - range[1]}%`,
            left: `${(initialRange[0] - min) / (max - min) * 100}%`,
            right: `${100 - (initialRange[1] - min) / (max - min) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
