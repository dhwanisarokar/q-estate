import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import config from "../../config";
import CheckBoxFilter from "../CheckBoxFilter/CheckBoxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingTableView from "../ListingTableView/ListingTableView";

export default function Expore() {
  // States:
  const [listingsData, setListingsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  async function fetchListings() {
    try {
      const res = await axios(`${config.backendEndpoint}/real-estate-data`);
      setListingsData(res.data.listings);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLocationFilterChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked)
      setLocationFilter((prevState) => [...prevState, event.target.value]);
    else
      setLocationFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };

  const handlePriceRangeFilterChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked)
      setPriceRangeFilter((prevState) => [...prevState, event.target.value]);
    else
      setPriceRangeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <>
      <Header />
      <div className="proerty-listings-view">
        <CheckBoxFilter
          locationFilter={locationFilter}
          priceRangeFilter={priceRangeFilter}
          handleLocationFilterChange={handleLocationFilterChange}
          handlePriceRangeFilterChange={handlePriceRangeFilterChange}
        />
        <SortingFilter
          sortBy={sortBy}
          handleSortByChange={handleSortByChange}
        />
        <ListingTableView
          listingsData={listingsData}
          priceRangeFilter={priceRangeFilter}
          locationFilter={locationFilter}
          sortBy={sortBy}
        />
      </div>
    </>
  );
}
