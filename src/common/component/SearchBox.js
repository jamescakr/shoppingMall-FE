import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  field,
  onKeyPress,
}) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || "");

  // const onCheckEnter = (event) => {
  //   if (event.key === "Enter") {
  //     setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value });
  //   }
  // };
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onFocus={() => setKeyword("")}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onKeyPress(e);
            e.target.blur();
          }
        }}
      />
    </div>
  );
};

export default SearchBox;
