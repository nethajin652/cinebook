import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag, Copy, Check, Flame, Film } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';
import { MovieGrid } from '../components/MovieGrid';
import { storageService } from '../services/storage';
import { OFFERS } from '../data/mockMovies';
import { useToast } from '../components/Toast';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    storageService.init();
    setMovies(storageService.getMovies());
  }, []);

  const nowShowing = movies.filter(m => m.status === 'now_showing');
  const upcoming = movies.filter(m => m.status === 'upcoming');
  const featured = nowShowing.slice(0, 5);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Carousel */}
      <HeroBanner featuredMovies={featured} />

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Now Showing Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-rose-500" />
                <span>In Cinemas Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit'] mt-1">
                Now Showing
              </h2>
            </div>
            <Link
              to="/movies"
              className="text-xs sm:text-sm font-bold text-rose-500 hover:text-rose-400 flex items-center gap-1.5 transition-colors group"
            >
              <span>Explore All Now Showing ({nowShowing.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <MovieGrid movies={nowShowing.slice(0, 10)} />
        </section>

        {/* Offers & Promotions Section */}
        <section className="space-y-6">
          <div className="border-b border-gray-800/80 pb-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Tag className="w-4 h-4" />
              <span>Special Perks & Savings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit'] mt-1">
              Offers & Discounts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OFFERS.map(offer => (
              <div
                key={offer.code}
                className="relative bg-gradient-to-br from-[#181a28] to-[#12141f] border border-gray-800 hover:border-rose-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {offer.tag}
                    </span>
                    <span className="text-[11px] text-gray-500">{offer.expiry}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                  <div className="font-mono font-bold text-xs bg-black/50 px-3 py-1.5 rounded-lg border border-gray-700/80 text-rose-400 tracking-wider">
                    {offer.code}
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Movies Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Releasing Soon</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit'] mt-1">
                Upcoming Movies
              </h2>
            </div>
            <Link
              to="/movies?status=upcoming"
              className="text-xs sm:text-sm font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors group"
            >
              <span>View All Upcoming ({upcoming.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <MovieGrid movies={upcoming} />
        </section>

      </div>
    </div>
  );
};
