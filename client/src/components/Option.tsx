import React from "react";
import { OptionCard } from "../styles/component";

const Option = ({
  option,
  isSelected,
  selectOption,
}: {
  option: string;
  isSelected: boolean;
  selectOption: (_opt: string) => void;
}) => {
  return (
    <OptionCard
      className={isSelected ? "selected-opt" : ""}
      onClick={() => selectOption(option)}
    >
      <input
        type="radio"
        style={{
          width: "18px",
          cursor: "pointer",
          color: isSelected ? "#35D299" : "",
        }}
        checked={isSelected}
        onChange={() => {
          selectOption(option);
        }}
      ></input>
      <p>{option}</p>
    </OptionCard>
  );
};

export default Option;
