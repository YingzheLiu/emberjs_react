import React, { useState, useEffect } from "react";

export default function AsyncButton(props) {
  function handleClick() {
    props.onClick();
  }

  return (
    <button type="button" className={props.className} onClick={handleClick}>
      {props.label}
      {/* {isLoading ? "Loading..." : props.label} */}
    </button>
  );
}
