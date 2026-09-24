import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Ticket, LogOut, Edit2, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storage';
import { useToast } from '../components/Toast';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, updateProfile, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: ''
  });
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setFormData({
      name: currentUser.name || '',
      mobile: currentUser.mobile || ''
    });
    storageService.init();
    const userBookings = storageService.getUserBookings(currentUser.id);
    setBookingsCount(userBookings.length);
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      showToast("Fields cannot be empty.", "error");
      return;
    }
    updateProfile({
      name: formData.name.trim(),
      mobile: formData.mobile.trim()
    });
    setIsEditing(false);
    showToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-[#141624] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-rose-600/30 shrink-0 font-['Outfit']">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {currentUser.name}
              </h1>
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Administrator
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">{currentUser.email}</p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5" />
                <span>{bookingsCount} {bookingsCount === 1 ? 'Booking' : 'Bookings'}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/10 transition-all shrink-0"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Profile Details & Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Account Details Box */}
        <div className="bg-[#141624] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">
            Personal Information
          </h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1c1f30] border border-gray-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-[#1c1f30] border border-gray-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </form>
          ) : (
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1d2e]">
                <User className="w-4 h-4 text-rose-500" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Name</div>
                  <div className="text-white font-semibold">{currentUser.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1d2e]">
                <Mail className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Email</div>
                  <div className="text-white font-semibold">{currentUser.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1d2e]">
                <Phone className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Mobile</div>
                  <div className="text-white font-semibold">{currentUser.mobile}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="bg-[#141624] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white border-b border-gray-800 pb-3">
              Quick Actions
            </h3>
            <div className="space-y-2.5 pt-3">
              <Link
                to="/bookings"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#1a1d2e] hover:bg-[#222538] border border-gray-800 text-xs font-semibold text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Ticket className="w-4 h-4 text-rose-500" />
                  <span>View All Bookings</span>
                </div>
                <span className="text-gray-500 group-hover:text-white">→</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-300 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Control Dashboard</span>
                  </div>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
              showToast("Logged out successfully.", "info");
            }}
            className="w-full mt-6 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </div>
  );
};
