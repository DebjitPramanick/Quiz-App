import React from "react";
import { OptionCard } from "../styles/component";

const Option = ({
  option,
  selected,
  selectOption,
}: {
  option: string;
  selected: string;
  selectOption: (_opt: string) => void;
}) => {
  return (
    <OptionCard
      className={selected === option ? "selected-opt" : ""}
      onClick={() => selectOption(option)}
    >
      <input
        type="radio"
        style={{ width: "18px", cursor: "pointer" }}
        checked={selected === option}
        onChange={() => {
          selectOption(option);
        }}
      ></input>
      <p>{option}</p>
    </OptionCard>
  );
};

export default Option;
