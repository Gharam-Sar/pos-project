import * as React from "react";

interface searchBarProps {
  filterValue: string;
  onFilterValueChange: (filterValue: string) => void;
}

const SearchBar: React.FC<searchBarProps> = ({
  filterValue,
  onFilterValueChange,
}) => {
  return (
    <div>
      <div className="componant" aria-roledescription="search">
        <input
          value={filterValue}
          onChange={(e) => {
            onFilterValueChange(e.target.value.toLowerCase());
          }}
          type="search"
          className="searchBar"
          placeholder="Search for a Category"
        />
      </div>
    </div>
  );
};

export default SearchBar;
