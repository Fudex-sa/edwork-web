import React, { Component } from "react";

const filterLabel=({label})=>{
  return(
    <div className="col-md-2">
    <label style={{ textAlign: "center" }}>
      {label}
    </label>
  </div>
  )
}

export default filterLabel