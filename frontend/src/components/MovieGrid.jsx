import React from 'react';
import { MovieCard } from './MovieCard';
import { Film } from 'lucide-react';

export const MovieGrid = ({ movies = [], emptyMessage = "No movies found matching your criteria." }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-[#12141e] border border-dashed border-gray-800 rounded-3xl">
        <div className="w-16 h-16 rounded-2xl bg-gray-800/60 flex items-center justify-center text-gray-500 mb-4">
          <Film className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-semibold text-white mb-1">No Movies Available</h4>
        <p className="text-sm text-gray-400 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
