import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array(4).fill(0).map((_, index) => (
        <div key={index} className="bg-gray-700 h-48 animate-pulse"></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;