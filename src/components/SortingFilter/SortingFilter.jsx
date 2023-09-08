import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const options = ["none", "price", "date"];

export default function SortingFilter({ sortBy, handleSortByChange }) {
  return (
    <div className="sorting-filter-conatiner">
      <h2>Sort By: </h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth size="small">
          <Select value={sortBy} label="Sort-by" onChange={handleSortByChange}>
            {options.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option && option[0].toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
