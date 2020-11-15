import React from "react";

const filterDropDown = ({
  data,
  getTitle,
  getValue,
  placeholder,
  changeSelected,
}) => {

  return (
    <div className="col-md-2">
      <select
        class="ui dropdown ml-2"
        style={{
          width: "130px",
          border: "1px solid #CFD3D5",
        }}
        onChange={(e) => changeSelected(e.target.value)}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {data.map((e) => (
          <option value="">{e.name.en}</option>
        ))}

      </select>
    </div>
  );
};

export default filterDropDown;
