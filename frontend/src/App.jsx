import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { MovieDetails } from './pages/MovieDetails';
import { Theatres } from './pages/Theatres';
import { Offers } from './pages/Offers';
import { ShowSelection } from './pages/ShowSelection';
import { SeatSelection } from './pages/SeatSelection';
import { Payment } from './pages/Payment';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { BookingHistory } from './pages/BookingHistory';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <BookingProvider>
            <ToastProvider>
              <div className="flex flex-col min-h-screen bg-[var(--theme-bg-dark,#0b0c10)] text-gray-100 selection:bg-rose-500 selection:text-white font-sans transition-colors duration-300">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/movies/:id" element={<MovieDetails />} />
                  <Route path="/theatres" element={<Theatres />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/booking/:movieId" element={<ShowSelection />} />
                  <Route path="/booking/:movieId/:showId/seats" element={<SeatSelection />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
                  <Route path="/bookings" element={<BookingHistory />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
  );
};

export default App;
