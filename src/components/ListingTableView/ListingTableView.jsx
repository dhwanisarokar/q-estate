import React, { useEffect, useState } from "react";

export default function ListingTableView({
  listingsData,
  priceRangeFilter,
  locationFilter,
  sortBy,
}) {
  // States
  // current page
  // filtered data
  // selected row
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Vairable:
  /*
    displayData will data which will display at UI
  */
  const displayData = applyFilter(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const isAllSected = selectedRows.length === itemsPerPage;
  //editing functions

  // Delete Functions

  const handleSelectAll = (event, displayData) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const rowsSelected = [];
      for (let i = startIndex; i < endIndex; i++) {
        if (i < displayData.length) {
          rowsSelected.push(displayData[i].property_id);
        } else {
          rowsSelected.push(Math.random());
        }
      }
      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckBoxChange = (event, id) => {
    const isAllChecked = event.target.checked;
    if (isAllChecked) {
      setSelectedRows((prevState) => [...prevState, id]);
    } else {
      setSelectedRows((prevState) => prevState.filter((item) => item !== id));
    }
  };

  // Checkbox handlers

  // Pagination handler

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Apply all filter function
  function applyFilter(filteredData, location, priceRange, sortBy) {
    let updateData = [...filteredData];

    if (location.length) {
      updateData = updateData.filter((listing) =>
        location.includes(listing.city)
      );
    }

    if (priceRange.length) {
      updateData = updateData.filter((listing) => {
        let found = false;
        priceRange.forEach((range) => {
          let [low, high] = range.split("-");
          if (
            Number(listing.price) >= Number(low) &&
            Number(listing.price) <= Number(high)
          ) {
            found = true;
          }
        });
        return found;
      });
    }

    if (sortBy === "price") {
      updateData.sort(
        (firstListing, secondListing) =>
          firstListing.price - secondListing.price
      );
    } else if (sortBy === "date") {
      updateData.sort(
        (firstListing, secondListing) =>
          new Date(firstListing.listing_date) -
          new Date(secondListing.listing_date)
      );
    }

    return updateData;
  }

  function getPageNumbers() {
    let pageNumbers = [];
    for (let currpage = 1; currpage <= totalPages; currpage++) {
      pageNumbers.push(currpage);
    }
    return pageNumbers;
  }

  const pageNumbers = getPageNumbers();

  useEffect(() => {
    setFilteredData(listingsData);
  }, [listingsData]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter]);

  useEffect(() => {
    setSelectedRows([]);
  }, [currentPage]);

  return (
    <div className="listing-table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSected}
                onChange={(event) => handleSelectAll(event, displayData)}
              />
            </th>
            <th>Propert Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map((item, index) => (
            <tr className={`table-row`} key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.property_id)}
                  onChange={(event) =>
                    handleRowCheckBoxChange(event, item.property_id)
                  }
                />
              </td>
              <td className="property-name">{item.property_name}</td>
              <td>{item.price}</td>
              <td>{item.address}</td>
              <td>{item.listing_date}</td>
              <td className="actions-col">delete, edit</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TABLE FOOTER */}
      <div className="table-footer">
        <button>Delete Selected</button>
        <span className="pagination-container">
          page {totalPages < 1 ? 0 : currentPage} of {totalPages}
        </span>
        <div className="pagination">
          <button onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </button>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          {pageNumbers.map((page, idx) => (
            <button key={idx} onClick={() => handlePageClick(page)}>
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
