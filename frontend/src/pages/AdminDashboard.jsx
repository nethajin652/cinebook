import React, { useState, useEffect } from 'react';
import { 
  Film, Building2, Users, Ticket, DollarSign, Plus, 
  Trash2, Edit, CheckCircle2, XCircle, Search, ShieldCheck 
} from 'lucide-react';
import { storageService } from '../services/storage';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

export const AdminDashboard = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // overview, movies, bookings
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  // Add Movie Modal State
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    language: 'Tamil, Telugu, Hindi',
    genre: 'Action, Sci-Fi',
    duration: '2h 30m',
    rating: 8.5,
    votesCount: '15.0K',
    releaseDate: '15 Oct 2024',
    status: 'now_showing',
    certificate: 'UA',
    trailer: 'https://www.youtube.com/embed/kQDd1AhGIHk',
    description: 'An exciting new cinematic experience arriving in theatres.'
  });

  const loadData = () => {
    storageService.init();
    setMovies(storageService.getMovies());
    setBookings(storageService.getBookings());
    setUsers(storageService.getUsers());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Stats
  const totalMovies = movies.length;
  const totalTheatres = 8; // Across cities
  const totalUsers = users.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => b.bookingStatus === 'Confirmed' ? sum + b.totalAmount : sum, 0);

  const handleDeleteMovie = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      storageService.deleteMovie(id);
      showToast(`Movie "${title}" removed successfully.`, "info");
      loadData();
    }
  };

  const handleAddMovieSubmit = (e) => {
    e.preventDefault();
    if (!newMovie.title.trim()) {
      showToast("Movie title is required", "error");
      return;
    }

    const movieRecord = {
      id: `m-${Date.now()}`,
      title: newMovie.title.trim(),
      poster: newMovie.poster,
      banner: newMovie.banner,
      language: newMovie.language.split(',').map(s => s.trim()),
      genre: newMovie.genre.split(',').map(s => s.trim()),
      duration: newMovie.duration,
      rating: Number(newMovie.rating),
      votesCount: newMovie.votesCount,
      releaseDate: newMovie.releaseDate,
      status: newMovie.status,
      certificate: newMovie.certificate,
      formats: ["2D", "3D"],
      trailer: newMovie.trailer,
      description: newMovie.description,
      cast: [
        { name: "Lead Star", role: "Protagonist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" }
      ]
    };

    storageService.saveMovie(movieRecord);
    showToast(`Movie "${movieRecord.title}" added to catalogue!`, "success");
    setIsAddMovieModalOpen(false);
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] mt-1">
            Cinema Management Console
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage movie listings, audit customer reservations, and monitor box office revenue.
          </p>
        </div>

        <button
          onClick={() => setIsAddMovieModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Movie</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-[#141624] border border-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Movies</span>
            <Film className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{totalMovies}</div>
          <div className="text-[10px] text-gray-500">In database</div>
        </div>

        <div className="bg-[#141624] border border-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Theatres</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{totalTheatres}</div>
          <div className="text-[10px] text-gray-500">Across 7 cities</div>
        </div>

        <div className="bg-[#141624] border border-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Users</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{totalUsers}</div>
          <div className="text-[10px] text-gray-500">Registered accounts</div>
        </div>

        <div className="bg-[#141624] border border-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Bookings</span>
            <Ticket className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{totalBookings}</div>
          <div className="text-[10px] text-gray-500">Issued tickets</div>
        </div>

        <div className="bg-[#141624] border border-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Revenue</span>
            <DollarSign className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit']">₹{totalRevenue}</div>
          <div className="text-[10px] text-gray-500">Gross sales</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-rose-600 text-white shadow'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Movies Catalogue ({movies.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'bookings'
              ? 'bg-rose-600 text-white shadow'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Customer Bookings ({bookings.length})
        </button>
      </div>

      {/* Content for Movies Tab */}
      {activeTab === 'overview' && (
        <div className="bg-[#141624] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#1a1d2e] text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="p-4">Movie</th>
                  <th className="p-4">Languages</th>
                  <th className="p-4">Genres</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {movies.map(m => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="w-9 h-12 object-cover rounded-md border border-gray-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{m.title}</div>
                        <div className="text-[11px] text-gray-400">{m.duration} • {m.certificate}</div>
                      </div>
                    </td>
                    <td className="p-4 truncate max-w-[150px]">
                      {m.language?.join(', ')}
                    </td>
                    <td className="p-4 truncate max-w-[150px]">
                      {m.genre?.join(', ')}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        m.status === 'now_showing'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {m.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-amber-400">
                      ★ {m.rating}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteMovie(m.id, m.title)}
                        className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Movie"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content for Customer Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-[#141624] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#1a1d2e] text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Movie & Theatre</th>
                  <th className="p-4">Show Details</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {bookings.map(b => (
                  <tr key={b.bookingId} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono font-bold text-white">
                      {b.bookingId}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{b.userName}</div>
                      <div className="text-[11px] text-gray-400">{b.userEmail}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{b.movieTitle}</div>
                      <div className="text-[11px] text-gray-400">{b.theatreName}</div>
                    </td>
                    <td className="p-4">
                      <div>{b.date}</div>
                      <div className="text-rose-400 font-semibold">{b.time}</div>
                    </td>
                    <td className="p-4 font-bold text-rose-400">
                      {b.seats?.map(s => s.seatNumber).join(', ')}
                    </td>
                    <td className="p-4 font-black text-emerald-400">
                      ₹{b.totalAmount}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.bookingStatus === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Movie Modal */}
      <Modal
        isOpen={isAddMovieModalOpen}
        onClose={() => setIsAddMovieModalOpen(false)}
        title="Add New Movie to Catalogue"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleAddMovieSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Movie Title</label>
              <input
                type="text"
                required
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                placeholder="e.g. Captain America: Brave New World"
                className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Duration</label>
              <input
                type="text"
                required
                value={newMovie.duration}
                onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                placeholder="e.g. 2h 30m"
                className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Languages (comma separated)</label>
              <input
                type="text"
                required
                value={newMovie.language}
                onChange={(e) => setNewMovie({ ...newMovie, language: e.target.value })}
                placeholder="Tamil, Telugu, English"
                className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Genres (comma separated)</label>
              <input
                type="text"
                required
                value={newMovie.genre}
                onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                placeholder="Action, Thriller, Sci-Fi"
                className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Release Status</label>
              <select
                value={newMovie.status}
                onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })}
                className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="now_showing">Now Showing</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Rating (1 to 10)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={newMovie.rating}
                onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Poster Image URL</label>
            <input
              type="url"
              required
              value={newMovie.poster}
              onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
              className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Backdrop Banner URL</label>
            <input
              type="url"
              required
              value={newMovie.banner}
              onChange={(e) => setNewMovie({ ...newMovie, banner: e.target.value })}
              className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">YouTube Trailer Embed URL</label>
            <input
              type="url"
              value={newMovie.trailer}
              onChange={(e) => setNewMovie({ ...newMovie, trailer: e.target.value })}
              className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Synopsis</label>
            <textarea
              rows={3}
              value={newMovie.description}
              onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
              className="w-full bg-[#1b1e2e] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all active:scale-95"
          >
            Publish Movie to CineBook
          </button>
        </form>
      </Modal>
    </div>
  );
};
