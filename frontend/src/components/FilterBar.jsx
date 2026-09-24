import React from 'react';
import { RotateCcw, Filter, Star } from 'lucide-react';

export const LANGUAGES = ["All", "Tamil", "Telugu", "Hindi", "English", "Malayalam", "Kannada"];
export const GENRES = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Comedy", "Animation", "Crime", "Mythology"];
export const RATINGS = [
  { label: "All Ratings", value: 0 },
  { label: "8.5+ ★", value: 8.5 },
  { label: "9.0+ ★", value: 9.0 }
];
export const STATUSES = [
  { label: "All Releases", value: "all" },
  { label: "Now Showing", value: "now_showing" },
  { label: "Upcoming", value: "upcoming" }
];

export const FilterBar = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedGenre,
  setSelectedGenre,
  selectedRating,
  setSelectedRating,
  selectedStatus,
  setSelectedStatus,
  onReset
}) => {
  const hasActiveFilters = 
    selectedLanguage !== "All" || 
    selectedGenre !== "All" || 
    selectedRating !== 0 || 
    selectedStatus !== "all";

  return (
    <div className="w-full bg-[#131522] border border-gray-800/80 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
          <Filter className="w-4 h-4 text-rose-500" />
          <span>Filters & Discovery</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status selector */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <div className="flex rounded-xl bg-[#1a1d2e] p-1 border border-gray-800">
            {STATUSES.map(s => (
              <button
                key={s.value}
                onClick={() => setSelectedStatus(s.value)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedStatus === s.value
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language selector */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full bg-[#1a1d2e] border border-gray-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-rose-500"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang === "All" ? "All Languages" : lang}</option>
            ))}
          </select>
        </div>

        {/* Genre selector */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-[#1a1d2e] border border-gray-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-rose-500"
          >
            {GENRES.map(genre => (
              <option key={genre} value={genre}>{genre === "All" ? "All Genres" : genre}</option>
            ))}
          </select>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Min Rating
          </label>
          <div className="flex rounded-xl bg-[#1a1d2e] p-1 border border-gray-800">
            {RATINGS.map(r => (
              <button
                key={r.value}
                onClick={() => setSelectedRating(r.value)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                  selectedRating === r.value
                    ? 'bg-amber-500 text-black shadow font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
