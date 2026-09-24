import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Film, SlidersHorizontal } from 'lucide-react';
import { FilterBar } from '../components/FilterBar';
import { MovieGrid } from '../components/MovieGrid';
import { storageService } from '../services/storage';

export const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('language') || 'All');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'All');
  const [selectedRating, setSelectedRating] = useState(Number(searchParams.get('minRating')) || 0);
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');

  useEffect(() => {
    storageService.init();
    setMovies(storageService.getMovies());
  }, []);

  // Sync state if URL query params change
  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) setSearchTerm(s);
    const st = searchParams.get('status');
    if (st !== null) setSelectedStatus(st);
  }, [searchParams]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedLanguage('All');
    setSelectedGenre('All');
    setSelectedRating(0);
    setSelectedStatus('all');
    setSearchParams({});
  };

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    // Search query match
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchGenre = movie.genre.some(g => g.toLowerCase().includes(q));
      const matchLang = movie.language.some(l => l.toLowerCase().includes(q));
      const matchCast = movie.cast?.some(c => c.name.toLowerCase().includes(q));
      if (!matchTitle && !matchGenre && !matchLang && !matchCast) {
        return false;
      }
    }

    // Status match
    if (selectedStatus !== 'all') {
      if (movie.status !== selectedStatus) return false;
    }

    // Language match
    if (selectedLanguage !== 'All') {
      if (!movie.language.includes(selectedLanguage)) return false;
    }

    // Genre match
    if (selectedGenre !== 'All') {
      if (!movie.genre.includes(selectedGenre)) return false;
    }

    // Rating match
    if (selectedRating > 0) {
      if (movie.rating < selectedRating) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight">
            Explore All Movies
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Browse through blockbusters, indie gems, regional cinema, and upcoming spectacles.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, actor, genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#161826] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Filter Bar Component */}
      <FilterBar
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onReset={handleReset}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-400 font-semibold border-b border-gray-800 pb-3">
        <span>Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'}</span>
        {searchTerm && <span>Search results for: "{searchTerm}"</span>}
      </div>

      {/* Movie Grid */}
      <MovieGrid
        movies={filteredMovies}
        emptyMessage={`We couldn't find any movies matching "${searchTerm || 'your selected filters'}". Try resetting filters.`}
      />
    </div>
  );
};
