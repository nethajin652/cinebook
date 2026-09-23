# CineBook – BookMyShow Clone (Movie Ticket Booking System)

A modern, responsive, full-featured cinema ticket booking web application inspired by BookMyShow. Built as a Web Essentials Mini Project.

---

## 📽️ Project Overview

**CineBook** delivers an end-to-end movie ticket booking experience with an original, cinema-themed UI. The platform allows users to browse blockbusters, view movie trailers, filter shows by language/genre/rating, select theatres across cities, reserve seats in an interactive cinema screen layout with tiered pricing, apply discount coupons, complete simulated payments, generate digital QR tickets, and manage booking history with cancellation support.

---

## 🚀 Key Features

1. **User Authentication & Profiles:**
   - Registration & Login with validation
   - One-Click Fast Demo Login for standard user (`Nethaji R`) and Administrator
   - User profile management with booking statistics & edit profile
2. **Dynamic Movie Catalog & Discovery:**
   - 14+ realistic movie records across Tamil, Telugu, Hindi, English, Malayalam, and Kannada
   - Now Showing & Upcoming releases
   - Dynamic real-time search bar with instant drop-down suggestions
   - Multi-facet filters: Language, Genre, Rating (8.5+, 9.0+), and Release Status
   - Clear filters reset
3. **Rich Movie Details:**
   - Cinematic backdrop banner, synopsis, certs, runtime, and formats (IMAX, 3D, 4DX, Dolby Atmos)
   - Interactive modal trailer player (YouTube trailers)
   - Cast & crew profiles with character roles
4. **City & Theatre Selection:**
   - Multi-city switcher (Chennai, Bengaluru, Hyderabad, Coimbatore, Madurai, Mumbai, Delhi-NCR)
   - 7-day calendar date selector (Today, Tomorrow, and upcoming dates)
   - Multiplex listings (PVR, INOX, SPI Cinemas, AGS) with amenities and show timings
5. **Interactive Cinema Seating:**
   - Screen with curved glow bar: `ALL EYES THIS WAY ⬇ SCREEN`
   - Tiered seating: VIP Recliner (₹250), Executive Gold (₹180), Standard Silver (₹130)
   - Seat states: Available, Selected (crimson glow), Booked (disabled)
   - Aisle walkway separation and seat limit validation (max 8 seats)
6. **Automatic Pricing & Promo Codes:**
   - Dynamic subtotal calculation
   - Convenience fee + GST
   - Working coupon system (`FIRST20` for 20% off, `CINEUPI` for ₹50 off, `WEEKEND15` for 15% off)
7. **Simulated Payment Gateway:**
   - Multiple simulated payment options: UPI (Google Pay, PhonePe, Paytm, VPA), Credit/Debit Card, Net Banking, and CineWallet
   - Animated payment processing state
8. **Digital QR Ticket & Confirmation:**
   - Perforated cinema pass design with barcode and tear notches
   - Unique alphanumeric booking ID (e.g. `CB-8492048`)
   - Scannable SVG QR Code containing verified booking payload
   - Print Ticket / Download preview feature
9. **Booking History & Cancellations:**
   - Full history of active and past bookings
   - "View Ticket" modal
   - "Cancel Booking" action with automated seat freeing and simulated refund
10. **Admin Dashboard:**
    - Real-time KPIs: Total Movies, Theatres, Users, Bookings, and Box Office Revenue
    - Movie CRUD: Add new movie modal with instant catalog publication, delete movie
    - Customer booking audit trail

---

## 🛠️ Technology Stack

- **Frontend:** React 19, JavaScript (ES6+), Tailwind CSS v4, Lucide React, Canvas Confetti, Vite 8
- **Routing:** React Router v7
- **Client Persistence:** LocalStorage Service Layer (ensures 100% standalone functionality)
- **Backend (API):** Node.js, Express.js, JWT (`jsonwebtoken`), `bcryptjs`, CORS
- **Database Architecture:** MongoDB / Mongoose Schemas (configured for local MongoDB or MongoDB Atlas)

---

## 📂 Project Structure

```text
bookmyshow_clone/
├── frontend/
│   ├── index.html                   # HTML entry point with Google Fonts & metadata
│   ├── vite.config.js               # Vite config with Tailwind CSS v4 plugin
│   ├── package.json                 # Frontend dependencies & scripts
│   └── src/
│       ├── main.jsx                 # React root render
│       ├── App.jsx                  # Main router & providers
│       ├── index.css                # Cinema theme, custom scrollbars, screen glow
│       ├── context/
│       │   ├── AuthContext.jsx      # Authentication & session state
│       │   └── BookingContext.jsx   # Booking flow, selected seats, coupons
│       ├── data/
│       │   ├── mockMovies.js        # 14+ movie records, cities, promo offers
│       │   └── mockTheatres.js      # Theatres, showtimes, formats, seat tiers
│       ├── services/
│       │   └── storage.js           # LocalStorage persistence & seat management
│       ├── components/
│       │   ├── Navbar.jsx           # CineBook header, search, city & profile
│       │   ├── Footer.jsx           # Cinema perks, hubs, project specs
│       │   ├── HeroBanner.jsx       # Featured movie carousel & trailer button
│       │   ├── MovieCard.jsx        # Poster, rating, Book Now & Details buttons
│       │   ├── MovieGrid.jsx        # Responsive grid with empty state
│       │   ├── FilterBar.jsx        # Multi-attribute filters & reset
│       │   ├── LocationSelector.jsx # City switcher modal
│       │   ├── DateSelector.jsx     # 7-day calendar navigation
│       │   ├── TheatreCard.jsx      # Cinema info, amenities & show pills
│       │   ├── ShowTimeButton.jsx   # Clickable showtime pills
│       │   ├── SeatLayout.jsx       # Cinema screen, tiers & seat matrix
│       │   ├── Seat.jsx             # Individual interactive seat
│       │   ├── BookingSummary.jsx   # Ticket breakdown, coupon input & proceed
│       │   ├── PaymentMethod.jsx    # UPI, Card, NetBanking sandbox forms
│       │   ├── BookingTicket.jsx    # Perforated digital pass & QR code
│       │   ├── QRCode.jsx           # SVG QR code generator
│       │   ├── TrailerModal.jsx     # Embedded YouTube trailer player
│       │   ├── Modal.jsx            # Accessible dialog modal
│       │   ├── Toast.jsx            # Toast notifications provider
│       │   └── LoadingSpinner.jsx   # Loading state spinner
│       └── pages/
│           ├── Home.jsx             # Hero banner, Now Showing, Offers, Upcoming
│           ├── Movies.jsx           # Search & filter catalog
│           ├── MovieDetails.jsx     # Backdrop, synopsis, cast, trailer, book
│           ├── Theatres.jsx         # Cinemas listing by selected city
│           ├── Offers.jsx           # Coupons and discount codes
│           ├── ShowSelection.jsx    # Date, theatre, and showtime selection
│           ├── SeatSelection.jsx    # Interactive seating & pricing
│           ├── Payment.jsx          # Checkout & simulated payment
│           ├── BookingConfirmation.jsx # Success banner & QR ticket
│           ├── BookingHistory.jsx   # User booking logs & cancellation
│           ├── Profile.jsx          # User profile & credentials
│           ├── Login.jsx            # Login with one-click demo pills
│           ├── Signup.jsx           # Signup with validation
│           └── AdminDashboard.jsx   # Stats, movie CRUD & booking auditing
│
├── backend/
│   ├── package.json                 # Express, Mongoose, JWT dependencies
│   ├── server.js                    # Express app & route registration
│   ├── .env.example                 # Port & MongoDB URI configuration
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verify & admin authorization
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Movie.js                 # Movie schema
│   │   ├── Theatre.js               # Theatre schema
│   │   ├── Show.js                  # Show & seat schema
│   │   └── Booking.js               # Booking record schema
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   ├── theatreController.js
│   │   ├── bookingController.js
│   │   └── adminController.js
│   └── routes/
│       ├── authRoutes.js
│       ├── movieRoutes.js
│       ├── theatreRoutes.js
│       ├── bookingRoutes.js
│       └── adminRoutes.js
└── README.md
```

---

## 🏃 How to Run the Project

### 1. Run Frontend (Standalone & Instant)

The frontend operates completely standalone using the built-in LocalStorage and Mock Data engine:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

### 2. Run Backend (Optional / For MongoDB integration)

```bash
cd backend
npm install
npm start
```

Backend API will start on port `5000` (`http://localhost:5000/api/health`).

---

## 🔑 Demo Accounts

Use the **One-Click Demo buttons** on the Login page, or enter manually:

| Role | Email | Password | Features Accessible |
| :--- | :--- | :--- | :--- |
| **Standard User** | `demo@cinebook.com` | `password123` | Booking tickets, QR Pass, Booking history, Profile |
| **Administrator** | `admin@cinebook.com` | `adminpassword` | All user features + Admin Dashboard, Movie CRUD, Revenue Stats |

---

## 🎟️ Available Promo Codes

| Code | Benefit | Condition |
| :--- | :--- | :--- |
| `FIRST20` | 20% Off (up to ₹100) | Valid on all bookings |
| `CINEUPI` | Flat ₹50 Off | Min order ₹300 |
| `WEEKEND15` | 15% Off (up to ₹150) | Weekend screenings |

---

## 📄 License & Attribution

Built for academic & learning purposes as a Web Essentials Mini Project. Original cinema-themed design with mock assets from Unsplash.
