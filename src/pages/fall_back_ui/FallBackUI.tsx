import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import React from "react";

interface IFallBackUIOnErrorProps {
    error?: Error;
    resetErrorBoundary?: () => void;
}

const FallBackUIOnError: React.FC<IFallBackUIOnErrorProps> = ({
                                                                  resetErrorBoundary,
                                                              }) => {
    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex flex-col justify-center items-center">
                <WrenchScrewdriverIcon className="w-8 text-red-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Something Went Wrong
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    We're sorry for the inconvenience. We are working to get it fixed.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={resetErrorBoundary}
                        className="rounded-md bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </main>
    );
};

export default FallBackUIOnError;