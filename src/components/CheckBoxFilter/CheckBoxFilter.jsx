import React from "react";

const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
const prices = ["0-300000", "300001-600000", "600001-1000000"];

export default function CheckBoxFilter({
  handleLocationFilterChange,
  handlePriceRangeFilterChange,
  locationFilter,
  priceRangeFilter,
}) {
  return (
    <div className="checkbox-filter-container">
      {/* Location based filter */}
      <div className="filter">
        <h1>Location</h1>
        {locations.map((location, idx) => (
          <div key={idx}>
            <label htmlFor={location}>
              <input
                type="checkbox"
                checked={locationFilter.includes(location)}
                value={location}
                onChange={handleLocationFilterChange}
              />
              {location}
            </label>
          </div>
        ))}
      </div>

      {/* Price Based Filter */}
      <div className="filter">
        <h1>Price Range</h1>
        {prices.map((price, idx) => (
          <div key={idx}>
            <label htmlFor={price}>
              <input
                type="checkbox"
                checked={priceRangeFilter.includes(price)}
                value={price}
                onChange={handlePriceRangeFilterChange}
              />
              {price}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
