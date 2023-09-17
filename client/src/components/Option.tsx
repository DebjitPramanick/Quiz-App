import React from "react";
import { OptionCard } from "../styles/component";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

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
      {/* <input
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
      ></input> */}
      {isSelected ? (
        <BsCheckCircleFill size={20} color="#44B77B" />
      ) : (
        <MdRadioButtonUnchecked
          size={24}
          color="#00000014"
          onClick={() => selectOption(option)}
        />
      )}
      <p>{option}</p>
    </OptionCard>
  );
};

export default Option;
