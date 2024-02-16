import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  // useEffect(() => {

  // }, [])

  return (
    <div className="searchbar">
      <div className="searchbar__wrapper">
        <input
          className="search__input"
          type="text"
          placeholder="Search for books"
        />
        <div className="search__icon">
          <IoIosSearch />
        </div>
      </div>
    </div>
  );
}
