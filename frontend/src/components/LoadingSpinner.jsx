import React from 'react';

export const LoadingSpinner = ({ size = "md", text = "Loading cinema experience..." }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-9 h-9 border-3",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div
        className={`${sizeClasses[size]} border-t-rose-500 border-r-rose-500/30 border-b-rose-500/10 border-l-rose-500/30 rounded-full animate-spin`}
      />
      {text && <p className="text-sm font-medium text-gray-400 animate-pulse">{text}</p>}
    </div>
  );
};
