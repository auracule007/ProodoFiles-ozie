import React from "react";

function Card({ children, className }) {
  return (
    <>
      <div className={`card display m-1 md:m-5 p-5 rounded bg-[#fff] ${className}`}>
        {children}
      </div>
    </>
  );
}

export default Card;
