import React from "react";
import { OptionCard } from "../styles/component";

const Option = () => {
  return (
    <OptionCard className={true ? "selected-opt" : ""}>
      <input type="radio" style={{ width: "18px", cursor: "pointer" }}></input>
      <p>Option A</p>
    </OptionCard>
  );
};

export default Option;
