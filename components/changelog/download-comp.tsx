"use client";

import { lazy } from "react";

// Lazy load the Releases component
const Releases = lazy(() => import("./releases"));

const DownloadComp = () => {
  return (
    <div className="mb-7">
      <h1 className="mb-2 text-lg font-bold">Релизы:</h1>
      <Releases />
    </div>
  );
};

export default DownloadComp;
