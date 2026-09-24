import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Film, Search, User, LogOut, Ticket, ShieldCheck, 
  Menu, X, Sparkles, ChevronDown 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LocationButton, LocationSelectorModal } from './LocationSelector';
import { ThemeSelector } from './ThemeSelector';
import { storageService } from '../services/storage';

export const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Live search preview
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const allMovies = storageService.getMovies();
  const filteredQuickMovies = searchQuery.trim()
    ? allMovies.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.language.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowQuickSearch(false);
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theatres", path: "/theatres" },
    { name: "Offers", path: "/offers" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0d0e15]/95 backdrop-blur-md border-b border-gray-800/80 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Logo & City Selector */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-rose-400 bg-clip-text text-transparent font-['Outfit']">
                    Cine<span className="text-rose-500">Book</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 -mt-1 font-semibold">
                    Cinema Pass
                  </span>
                </div>
              </Link>

              {/* Location Pill */}
              <div className="hidden sm:block">
                <LocationButton onClick={() => setIsCityModalOpen(true)} />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'text-white bg-white/10 shadow-sm font-semibold' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>

            {/* Dynamic Search Bar */}
            <div className="relative flex-1 max-w-xs sm:max-w-sm hidden lg:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search movies, genres, languages..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowQuickSearch(true);
                  }}
                  onFocus={() => setShowQuickSearch(true)}
                  className="w-full bg-[#171926] border border-gray-700/80 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </form>

              {/* Quick Search Dropdown */}
              {showQuickSearch && searchQuery.trim().length > 0 && (
                <div 
                  className="absolute left-0 right-0 top-full mt-2 bg-[#171926] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setShowQuickSearch(false)}
                >
                  <div className="p-2 border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Quick Suggestions
                  </div>
                  {filteredQuickMovies.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-800/60">
                      {filteredQuickMovies.map(movie => (
                        <div
                          key={movie.id}
                          onClick={() => {
                            setShowQuickSearch(false);
                            setSearchQuery('');
                            navigate(`/movies/${movie.id}`);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-rose-500/10 hover:border-l-4 hover:border-rose-500 cursor-pointer transition-all"
                        >
                          <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="w-10 h-14 object-cover rounded-md shrink-0 shadow"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">{movie.title}</div>
                            <div className="text-xs text-gray-400 truncate">
                              {movie.language.join(', ')} • {movie.genre[0]}
                            </div>
                            <div className="text-[11px] text-amber-400 font-bold">★ {movie.rating}/10</div>
                          </div>
                        </div>
                      ))}
                      <div 
                        onClick={handleSearchSubmit}
                        className="p-2 text-center text-xs text-rose-400 hover:text-rose-300 cursor-pointer font-medium bg-[#131520]"
                      >
                        View all results for "{searchQuery}" →
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No movies found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Auth / Profile & Theme Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Selector Button */}
              <ThemeSelector />

              {/* Mobile location button */}
              <div className="sm:hidden">
                <LocationButton onClick={() => setIsCityModalOpen(true)} />
              </div>

              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#181a28] hover:bg-[#202334] border border-gray-700/80 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs shadow">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline-block text-xs font-semibold text-gray-200 max-w-[100px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                  </button>

                  {/* Profile Dropdown */}
                  {isUserDropdownOpen && (
                    <div 
                      className="absolute right-0 top-full mt-2 w-52 bg-[#171926] border border-gray-700/80 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-800">
                        <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
                        <div className="text-[11px] text-gray-400 truncate">{currentUser.email}</div>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            Administrator
                          </span>
                        )}
                      </div>

                      <Link
                        to="/bookings"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-rose-500/10 transition-colors"
                      >
                        <Ticket className="w-4 h-4 text-rose-400" />
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-rose-500/10 transition-colors"
                      >
                        <User className="w-4 h-4 text-sky-400" />
                        <span>My Profile</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-amber-300 hover:text-white hover:bg-amber-500/10 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <div className="border-t border-gray-800 my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-md shadow-rose-600/30 transition-all active:scale-95"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="pb-3 lg:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies, theatres, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#171926] border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#11131c] border-b border-gray-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-4">
            <div className="pb-2 border-b border-gray-800/80">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Color Theme
              </div>
              <ThemeSelector compact={true} />
            </div>

            <div className="space-y-1">
              {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 hover:bg-amber-500/10"
              >
                Admin Console
              </Link>
            )}
            {currentUser && (
              <>
                <Link
                  to="/bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5"
                >
                  Profile
                </Link>
              </>
            )}
            </div>
          </div>
        )}
      </header>

      {/* City modal */}
      <LocationSelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />
    </>
  );
};
