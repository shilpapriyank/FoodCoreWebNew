import { SearchBarPropsTypes } from "@/types/searchbar-types/searchbar.type";
import React from "react";

const SearchBarComponent = ({
  searchItem,
  handleChangeSearch,
  handleSubmitSearch,
  handleClickCancel,
}: SearchBarPropsTypes) => {
  return (
    <div className="d-none d-md-block">
      <div className="d-flex justify-content-between mb-2 flex-column flex-md-row ">
        <input
          type="text"
          className="form-control search-box search-bar"
          value={searchItem}
          onChange={handleChangeSearch}
          placeholder="Search your favourite dish here..."
        />
        <div className="d-flex flex-md-row ">
          <button
            className=" btn-default ms-2 mt-2 mt-md-0 w-50"
            onClick={handleSubmitSearch}
          >
            Search
          </button>
          <button
            className=" btn-default black ms-2  mt-2 mt-md-0 w-50"
            onClick={handleClickCancel}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBarComponent;
