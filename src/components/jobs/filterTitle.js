import React, { Component } from "react";

const filterTitle=({title})=>{
  return(
    <div
    className="col-md-2"
    style={{
      width: "25%",
      border: "1px solid #CFD3D5",
      padding: "1px 5px",
    }}
  >
    {title}
  </div>
  )
}

export default filterTitle