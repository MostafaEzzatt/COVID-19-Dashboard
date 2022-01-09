/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

const Error = ({ error }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="font-bold text-4xl text-gray-200">{error}</p>
      <a
        href="/"
        className="mt-3 font-medium text-green-500 opacity-80 hover:opacity-100 transition-opacity"
      >
        Try Again
      </a>
    </div>
  );
};

export default Error;
