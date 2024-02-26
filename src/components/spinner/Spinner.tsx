import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ArrowPathIcon className="animate-spin h-12 w-12 text-primary-500" />
    </div>
  );
};

export default LoadingSpinner;
