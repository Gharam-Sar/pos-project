import React, { useEffect } from "react";
import {  ProductType } from "../App";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";

interface FooterProps {
  range: number[];
  setPage: Function;
  page: number;
  slice:ProductType[];
  setSize: Function;
  size: number;
}
export const TableProductFooter: React.FC<FooterProps> = ({
  range,
  setPage,
  page,
  slice,
  setSize,
  size,
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSize(event.target.value as number);
    console.log(size);
  };
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="table-footer">
      <Select
        sx={{ width: "100px", height: "30px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={size}
        label="Display"
        onChange={handleChange}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
      {range.map((r, index) => (
        <button
          key={index}
          className={
            page === r ? "active-table-Button" : "inactive-table-Button"
          }
          onClick={() => setPage(r)}
        >
          {r}
        </button>
      ))}
    </div>
  );
};
