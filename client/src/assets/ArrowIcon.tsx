import React from "react";

const ArrowIcon = ({ size = 30 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size / 1.5}
      viewBox="0 0 30 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.4853 14.1421L18 22.6274L15.1716 19.799L21.1716 13.799L0.828441 13.799V9.79897H22.1421L15.1716 2.82844L18 1.23978e-05L26.4853 8.48529L29.3137 11.3137L26.4853 14.1421Z"
        fill="white"
      />
    </svg>
  );
};

export default ArrowIcon;
