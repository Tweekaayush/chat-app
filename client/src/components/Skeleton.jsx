import React from "react";

const Skeleton = ({ classname }) => {
  return <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${classname}`}></div>;
};

export default Skeleton;
