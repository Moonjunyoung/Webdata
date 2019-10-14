import React, { useState } from "react";
import Select from "react-select";
import "../css/SearchBar.css";

function MakeOption(x) {
  return { value: x, label: x };
}
const SearchBar = ({ ComponentName, selecteditem, data }) => {
  const handleSelect = newvalue => {
    selecteditem(newvalue);
  };

  return (
    <div>
      <Select
        onChange={handleSelect}
        isMulti
        name="colors"
        options={ComponentName.map(x => MakeOption(x))}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default SearchBar;
