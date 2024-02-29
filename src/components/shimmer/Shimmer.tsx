const Shimmer = ({ count = 10 }) => {
  const shimmerItems = Array.from({ length: count }, (_, index) => index);

  return (
    <>
      {shimmerItems.map((_, index) => (
        <div key={index} className="w-full space-x-4 animate-pulse">
          <div className="w-full space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Shimmer;
