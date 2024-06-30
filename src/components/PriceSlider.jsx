import React from "react";
import ReactSlider from "react-slider";

const PriceRangeSlider = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
    <div className="p-2 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Select Price Range:
      </label>
      <ReactSlider
        className="w-full h-4 my-4 relative"
        thumbClassName="w-6 h-6 bg-blue-500 rounded-full cursor-pointer transform translate-y-2"
        trackClassName="h-1 bg-gray-300"
        min={0}
        max={2000}
        step={10}
        value={[minPrice, maxPrice]}
        onChange={(newValues) => {
          setMinPrice(newValues[0]);
          setMaxPrice(newValues[1]);
        }}
        renderThumb={(props, state, index) => {
          const { key, ...restProps } = props; // Destructure key out of props
          return (
            <div
              key={index}
              {...restProps}
              className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-y-1"
            ></div>
          );
        }}
      />
      <div className="mt-2 flex justify-between">
        <span className="block text-sm text-gray-700">Min: ${minPrice}</span>
        <span className="block text-sm text-gray-700">Max: ${maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
