import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Shield, Award, Heart, Mail, Phone } from 'lucide-react';
import { CITIES } from '../data/mockMovies';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#08090e] border-t border-gray-800/80 text-gray-400 mt-auto">
      {/* Top feature banner */}
      <div className="border-b border-gray-800/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white text-xs font-bold uppercase tracking-wider">100% Genuine Tickets</div>
                <div className="text-[11px] text-gray-400">Direct cinema box-office tie-up</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white text-xs font-bold uppercase tracking-wider">Fast QR Check-in</div>
                <div className="text-[11px] text-gray-400">Skip box-office queues at gate</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white text-xs font-bold uppercase tracking-wider">Instant Cancellation</div>
                <div className="text-[11px] text-gray-400">Easy 100% refund on qualifying shows</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white text-xs font-bold uppercase tracking-wider">24/7 CineCare</div>
                <div className="text-[11px] text-gray-400">Priority helpline & instant chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white font-['Outfit']">
                Cine<span className="text-rose-500">Book</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              CineBook is your modern, high-speed movie ticketing destination. Browse top blockbusters, discover premium cinema formats like IMAX 3D and 4DX, reserve favorite seats, and enjoy seamless cinema experiences.
            </p>
            <div className="text-xs text-gray-400">
              <span className="font-semibold text-gray-200">Email:</span> support@cinebook.demo | <span className="font-semibold text-gray-200">Helpline:</span> 1800-246-3266
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Cinema Hubs</h4>
            <ul className="space-y-2 text-xs">
              {CITIES.slice(0, 5).map(city => (
                <li key={city.id}>
                  <Link to="/theatres" className="hover:text-rose-400 transition-colors">
                    Cinemas in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/movies" className="hover:text-rose-400 transition-colors">Now Showing Movies</Link></li>
              <li><Link to="/movies?status=upcoming" className="hover:text-rose-400 transition-colors">Upcoming Releases</Link></li>
              <li><Link to="/theatres" className="hover:text-rose-400 transition-colors">Multiplex Theatres</Link></li>
              <li><Link to="/offers" className="hover:text-rose-400 transition-colors">Exclusive Offers & Codes</Link></li>
              <li><Link to="/bookings" className="hover:text-rose-400 transition-colors">View Past Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Project Specs</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Domain: Online Movie Ticket Booking</li>
              <li>Frontend: React 19 + Tailwind CSS</li>
              <li>Persistence: LocalStorage + State</li>
              <li>Backend Architecture: Express + MongoDB</li>
              <li>Security: JWT + Simulated Sandbox</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800/80 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs">
          <div className="text-center md:text-left text-gray-500">
            © {new Date().getFullYear()} <span className="text-gray-400 font-medium">CineBook Inc.</span> · Built as a Web Essentials Mini Project.
          </div>
          
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-sm text-gray-300 font-medium text-xs hover:border-rose-500/30 transition-all duration-300">
              Designed & Developed by&nbsp;<span className="text-white font-semibold">Poovarasan.M</span>,&nbsp;<span className="text-white font-semibold">Nethaji.R</span>
            </div>
          </div>
          
          <div className="text-center md:text-right text-gray-500">
            <span>Original design inspired by the cinema-going experience.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
