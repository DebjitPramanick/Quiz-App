import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ size = 20 }: { size?: number }) => {
  return (
    <>
      <ClipLoader size={size} color="light" cssOverride={{
        borderWidth: "3px"
      }}/>
    </>
  );
};

export default Spinner;
