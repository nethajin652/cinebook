import { INITIAL_MOVIES, CITIES } from '../data/mockMovies';
import { THEATRES_DATA } from '../data/mockTheatres';

const STORAGE_KEYS = {
  USERS: 'cinebook_users',
  CURRENT_USER: 'cinebook_current_user',
  MOVIES: 'cinebook_movies',
  BOOKINGS: 'cinebook_bookings',
  SELECTED_CITY: 'cinebook_selected_city',
  SHOW_OCCUPIED_SEATS: 'cinebook_show_occupied_seats',
};

const DEFAULT_USERS = [
  {
    id: "usr-demo-1",
    name: "Nethaji R",
    email: "demo@cinebook.com",
    mobile: "9876543210",
    password: "password123",
    role: "user",
    createdAt: "2024-05-10T10:00:00.000Z"
  },
  {
    id: "usr-admin-1",
    name: "Cinema Manager (Admin)",
    email: "admin@cinebook.com",
    mobile: "9123456780",
    password: "adminpassword",
    role: "admin",
    createdAt: "2024-01-01T08:00:00.000Z"
  }
];

const DEFAULT_BOOKINGS = [
  {
    bookingId: "CB-8492048",
    userId: "usr-demo-1",
    userName: "Nethaji R",
    userEmail: "demo@cinebook.com",
    userMobile: "9876543210",
    movieId: "m-1",
    movieTitle: "Kalki 2898 AD",
    moviePoster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    theatreId: "th-chn-1",
    theatreName: "PVR Cinemas: Grand Galada Mall",
    theatreLocation: "Chennai",
    screen: "Audi 2",
    date: "2024-07-15",
    time: "06:30 PM",
    format: "2D",
    seats: [
      { seatNumber: "C4", tier: "Gold", price: 180 },
      { seatNumber: "C5", tier: "Gold", price: 180 }
    ],
    ticketAmount: 360,
    convenienceFee: 30,
    discountAmount: 50,
    promoCode: "CINEUPI",
    totalAmount: 340,
    paymentMethod: "UPI",
    paymentStatus: "Completed",
    bookingStatus: "Confirmed",
    bookingDate: "2024-07-14T15:20:00.000Z"
  },
  {
    bookingId: "CB-7391823",
    userId: "usr-demo-1",
    userName: "Nethaji R",
    userEmail: "demo@cinebook.com",
    userMobile: "9876543210",
    movieId: "m-3",
    movieTitle: "Interstellar: Re-Release",
    moviePoster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    theatreId: "th-chn-2",
    theatreName: "SPI Cinemas: Sathyam (Royapettah)",
    theatreLocation: "Chennai",
    screen: "IMAX Screen",
    date: "2024-08-01",
    time: "08:45 PM",
    format: "IMAX 2D",
    seats: [
      { seatNumber: "A4", tier: "Recliner", price: 250 }
    ],
    ticketAmount: 250,
    convenienceFee: 30,
    discountAmount: 0,
    promoCode: "",
    totalAmount: 280,
    paymentMethod: "Credit Card",
    paymentStatus: "Completed",
    bookingStatus: "Confirmed",
    bookingDate: "2024-07-30T11:10:00.000Z"
  }
];

export const storageService = {
  // Initialize storage defaults if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MOVIES)) {
      localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(INITIAL_MOVIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SELECTED_CITY)) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, JSON.stringify(CITIES[0]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS)) {
      // Seed pre-booked seats
      const occupiedMap = {};
      Object.values(THEATRES_DATA).flat().forEach(theatre => {
        theatre.shows.forEach(show => {
          if (show.bookedSeats && show.bookedSeats.length > 0) {
            occupiedMap[show.id] = [...show.bookedSeats];
          }
        });
      });
      localStorage.setItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS, JSON.stringify(occupiedMap));
    }
  },

  // Users & Auth
  getUsers: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  },

  saveUser: (user) => {
    const users = storageService.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return user;
  },

  updateUser: (updatedUser) => {
    const users = storageService.getUsers().map(u => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    const current = storageService.getCurrentUser();
    if (current && current.id === updatedUser.id) {
      storageService.setCurrentUser(updatedUser);
    }
    return updatedUser;
  },

  getCurrentUser: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    } catch {
      return null;
    }
  },

  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // Movies
  getMovies: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIES)) || INITIAL_MOVIES;
    } catch {
      return INITIAL_MOVIES;
    }
  },

  getMovieById: (id) => {
    const movies = storageService.getMovies();
    return movies.find(m => m.id === id);
  },

  saveMovie: (movie) => {
    const movies = storageService.getMovies();
    const index = movies.findIndex(m => m.id === movie.id);
    if (index >= 0) {
      movies[index] = movie;
    } else {
      movies.unshift(movie);
    }
    localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
    return movie;
  },

  deleteMovie: (id) => {
    let movies = storageService.getMovies();
    movies = movies.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
  },

  // City selection
  getSelectedCity: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_CITY)) || CITIES[0];
    } catch {
      return CITIES[0];
    }
  },

  setSelectedCity: (city) => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, JSON.stringify(city));
  },

  // Show Occupied Seats
  getOccupiedSeatsForShow: (showId) => {
    try {
      const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS)) || {};
      return map[showId] || [];
    } catch {
      return [];
    }
  },

  addOccupiedSeatsForShow: (showId, newSeats) => {
    try {
      const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS)) || {};
      const current = map[showId] || [];
      const updated = Array.from(new Set([...current, ...newSeats]));
      map[showId] = updated;
      localStorage.setItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS, JSON.stringify(map));
      return updated;
    } catch (e) {
      console.error(e);
      return newSeats;
    }
  },

  freeOccupiedSeatsForShow: (showId, seatsToFree) => {
    try {
      const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS)) || {};
      const current = map[showId] || [];
      map[showId] = current.filter(s => !seatsToFree.includes(s));
      localStorage.setItem(STORAGE_KEYS.SHOW_OCCUPIED_SEATS, JSON.stringify(map));
    } catch (e) {
      console.error(e);
    }
  },

  // Bookings
  getBookings: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    } catch {
      return [];
    }
  },

  getUserBookings: (userId) => {
    const bookings = storageService.getBookings();
    return bookings.filter(b => b.userId === userId);
  },

  getBookingById: (bookingId) => {
    const bookings = storageService.getBookings();
    return bookings.find(b => b.bookingId === bookingId);
  },

  createBooking: (bookingData) => {
    const bookings = storageService.getBookings();
    bookings.unshift(bookingData);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Also mark seats as occupied
    if (bookingData.showId && bookingData.seats) {
      const seatNames = bookingData.seats.map(s => s.seatNumber);
      storageService.addOccupiedSeatsForShow(bookingData.showId, seatNames);
    }
    return bookingData;
  },

  cancelBooking: (bookingId) => {
    const bookings = storageService.getBookings();
    const index = bookings.findIndex(b => b.bookingId === bookingId);
    if (index >= 0) {
      bookings[index].bookingStatus = 'Cancelled';
      bookings[index].paymentStatus = 'Refunded';
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

      // Free seats
      if (bookings[index].showId && bookings[index].seats) {
        const seatNames = bookings[index].seats.map(s => s.seatNumber);
        storageService.freeOccupiedSeatsForShow(bookings[index].showId, seatNames);
      }
      return bookings[index];
    }
    return null;
  }
};
