import React from "react";
import "./Title.css";

function Title({ updateTitle, title }) {
  return (
    <div>
      <h2 className="titleClass">{title}</h2>
    </div>
  );
}
export default Title;
