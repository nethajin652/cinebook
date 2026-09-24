export const THEATRES_DATA = {
  chennai: [
    {
      id: "th-chn-1",
      name: "PVR Cinemas: Grand Galada Mall",
      location: "Chennai",
      area: "Pallavaram",
      distance: "2.5 km away",
      amenities: ["M-Ticket", "Dolby Atmos", "Food & Beverage", "Wheelchair Accessible", "Parking"],
      shows: [
        { id: "sh-101", time: "10:15 AM", format: "2D", language: "Tamil", price: 150, bookedSeats: ["A3", "A4", "C6", "D5", "D6"] },
        { id: "sh-102", time: "01:45 PM", format: "3D", language: "Tamil", price: 180, bookedSeats: ["B2", "B3", "B4", "E4", "E5"] },
        { id: "sh-103", time: "06:30 PM", format: "2D", language: "Tamil", price: 200, bookedSeats: ["C3", "C4", "C5", "F7", "F8", "G1", "G2"] },
        { id: "sh-104", time: "10:00 PM", format: "2D", language: "Tamil", price: 180, bookedSeats: ["D3", "D4"] }
      ]
    },
    {
      id: "th-chn-2",
      name: "SPI Cinemas: Sathyam (Royapettah)",
      location: "Chennai",
      area: "Royapettah",
      distance: "5.1 km away",
      amenities: ["Iconic Popcorn", "Dolby Atmos 64 Ch", "RGB Laser", "Valet Parking"],
      shows: [
        { id: "sh-105", time: "09:45 AM", format: "2D", language: "Tamil", price: 160, bookedSeats: ["A1", "A2", "D1", "D2"] },
        { id: "sh-106", time: "01:15 PM", format: "IMAX 2D", language: "English", price: 280, bookedSeats: ["C4", "C5", "C6", "C7", "E5", "E6"] },
        { id: "sh-107", time: "05:00 PM", format: "2D", language: "Tamil", price: 200, bookedSeats: ["B5", "B6", "F4", "F5"] },
        { id: "sh-108", time: "08:45 PM", format: "IMAX 2D", language: "Tamil", price: 280, bookedSeats: ["C3", "C4", "D4", "D5", "D6"] }
      ]
    },
    {
      id: "th-chn-3",
      name: "INOX: Phoenix Marketcity",
      location: "Chennai",
      area: "Velachery",
      distance: "4.2 km away",
      amenities: ["IMAX", "MX4D", "Insignia Lounge", "Gourmet Menu"],
      shows: [
        { id: "sh-109", time: "11:00 AM", format: "4DX 3D", language: "English", price: 320, bookedSeats: ["A5", "A6", "B6", "B7"] },
        { id: "sh-110", time: "02:30 PM", format: "2D", language: "Tamil", price: 170, bookedSeats: ["E2", "E3"] },
        { id: "sh-111", time: "07:15 PM", format: "IMAX 3D", language: "Telugu", price: 290, bookedSeats: ["C1", "C2", "C3", "D7", "D8"] },
        { id: "sh-112", time: "10:30 PM", format: "2D", language: "Hindi", price: 180, bookedSeats: ["F1", "F2"] }
      ]
    },
    {
      id: "th-chn-4",
      name: "AGS Cinemas: Villivakkam",
      location: "Chennai",
      area: "Villivakkam",
      distance: "7.0 km away",
      amenities: ["Dolby Atmos", "Recliner Seating", "Canteen", "Fast Track Entry"],
      shows: [
        { id: "sh-113", time: "10:30 AM", format: "2D", language: "Tamil", price: 140, bookedSeats: ["B1", "B2"] },
        { id: "sh-114", time: "02:00 PM", format: "2D", language: "Tamil", price: 160, bookedSeats: ["D3", "D4", "D5"] },
        { id: "sh-115", time: "06:15 PM", format: "2D", language: "Tamil", price: 180, bookedSeats: ["C5", "C6", "E3", "E4"] },
        { id: "sh-116", time: "09:45 PM", format: "2D", language: "Tamil", price: 160, bookedSeats: ["A7", "A8"] }
      ]
    }
  ],
  bengaluru: [
    {
      id: "th-blr-1",
      name: "PVR: Forum Mall (Koramangala)",
      location: "Bengaluru",
      area: "Koramangala",
      distance: "3.2 km away",
      amenities: ["Gold Class", "IMAX", "Dolby 7.1", "Food Court"],
      shows: [
        { id: "sh-201", time: "10:00 AM", format: "IMAX 2D", language: "English", price: 300, bookedSeats: ["C3", "C4", "C5"] },
        { id: "sh-202", time: "01:30 PM", format: "2D", language: "Kannada", price: 170, bookedSeats: ["B4", "B5"] },
        { id: "sh-203", time: "06:00 PM", format: "IMAX 3D", language: "Hindi", price: 320, bookedSeats: ["D4", "D5", "D6"] },
        { id: "sh-204", time: "09:30 PM", format: "2D", language: "Tamil", price: 200, bookedSeats: ["E2", "E3"] }
      ]
    },
    {
      id: "th-blr-2",
      name: "INOX: Nexus Mall (Whitefield)",
      location: "Bengaluru",
      area: "Whitefield",
      distance: "6.5 km away",
      amenities: ["Insignia", "Barco Laser", "Dolby Atmos"],
      shows: [
        { id: "sh-205", time: "11:15 AM", format: "2D", language: "Telugu", price: 180, bookedSeats: ["A1", "A2"] },
        { id: "sh-206", time: "03:45 PM", format: "3D", language: "English", price: 220, bookedSeats: ["F3", "F4"] },
        { id: "sh-207", time: "07:30 PM", format: "2D", language: "Hindi", price: 210, bookedSeats: ["B2", "B3", "C2"] }
      ]
    }
  ],
  hyderabad: [
    {
      id: "th-hyd-1",
      name: "Prasad's Multiplex: Large Screen",
      location: "Hyderabad",
      area: "Necklace Road",
      distance: "2.1 km away",
      amenities: ["Giant Screen", "Laser Projection", "Food Court", "Gaming Zone"],
      shows: [
        { id: "sh-301", time: "09:30 AM", format: "Large Screen 2D", language: "Telugu", price: 220, bookedSeats: ["B3", "B4"] },
        { id: "sh-302", time: "01:00 PM", format: "Large Screen 3D", language: "Telugu", price: 250, bookedSeats: ["C4", "C5", "C6"] },
        { id: "sh-303", time: "06:15 PM", format: "Large Screen 2D", language: "Telugu", price: 250, bookedSeats: ["D4", "D5", "E4", "E5"] },
        { id: "sh-304", time: "09:45 PM", format: "2D", language: "Hindi", price: 200, bookedSeats: ["A4", "A5"] }
      ]
    },
    {
      id: "th-hyd-2",
      name: "AMB Cinemas: Gachibowli",
      location: "Hyderabad",
      area: "Gachibowli",
      distance: "4.8 km away",
      amenities: ["VIP Lounge", "Dolby Atmos", "Recliners", "Laser Projection"],
      shows: [
        { id: "sh-305", time: "10:45 AM", format: "2D", language: "Telugu", price: 250, bookedSeats: ["C3", "C4"] },
        { id: "sh-306", time: "02:15 PM", format: "3D", language: "English", price: 280, bookedSeats: ["E3", "E4", "E5"] },
        { id: "sh-307", time: "07:00 PM", format: "2D", language: "Telugu", price: 250, bookedSeats: ["D2", "D3", "F5"] }
      ]
    }
  ],
  coimbatore: [
    {
      id: "th-cbe-1",
      name: "KG Cinemas: Race Course",
      location: "Coimbatore",
      area: "Race Course",
      distance: "1.8 km away",
      amenities: ["Dolby Atmos", "M-Ticket", "Cafeteria", "Easy Parking"],
      shows: [
        { id: "sh-401", time: "10:30 AM", format: "2D", language: "Tamil", price: 140, bookedSeats: ["B2", "B3"] },
        { id: "sh-402", time: "02:00 PM", format: "2D", language: "Tamil", price: 160, bookedSeats: ["C4", "C5"] },
        { id: "sh-403", time: "06:30 PM", format: "2D", language: "Tamil", price: 180, bookedSeats: ["D3", "D4", "E4"] },
        { id: "sh-404", time: "10:00 PM", format: "2D", language: "Tamil", price: 150, bookedSeats: ["A2", "A3"] }
      ]
    },
    {
      id: "th-cbe-2",
      name: "Broadway Cinemas: Peelamedu",
      location: "Coimbatore",
      area: "Peelamedu",
      distance: "3.5 km away",
      amenities: ["Laser IMAX", "EPIQ", "Gold Class", "Food Lounge"],
      shows: [
        { id: "sh-405", time: "11:15 AM", format: "EPIQ 2D", language: "Tamil", price: 220, bookedSeats: ["C3", "C4"] },
        { id: "sh-406", time: "03:30 PM", format: "2D", language: "English", price: 170, bookedSeats: ["D2", "D3"] },
        { id: "sh-407", time: "07:45 PM", format: "EPIQ 2D", language: "Tamil", price: 240, bookedSeats: ["E3", "E4", "E5"] }
      ]
    }
  ],
  madurai: [
    {
      id: "th-mdu-1",
      name: "Inox: Vishaal de Mal",
      location: "Madurai",
      area: "Chinna Chokkikulam",
      distance: "2.0 km away",
      amenities: ["Dolby 7.1", "Recliners", "Food Court", "Parking"],
      shows: [
        { id: "sh-501", time: "10:00 AM", format: "2D", language: "Tamil", price: 130, bookedSeats: ["A3", "A4"] },
        { id: "sh-502", time: "01:30 PM", format: "2D", language: "Tamil", price: 150, bookedSeats: ["C3", "C4"] },
        { id: "sh-503", time: "06:00 PM", format: "2D", language: "Tamil", price: 170, bookedSeats: ["D4", "D5", "D6"] },
        { id: "sh-504", time: "09:30 PM", format: "2D", language: "Tamil", price: 150, bookedSeats: ["B3", "B4"] }
      ]
    }
  ],
  mumbai: [
    {
      id: "th-mum-1",
      name: "PVR ICON: Phoenix Palladium (Lower Parel)",
      location: "Mumbai",
      area: "Lower Parel",
      distance: "3.8 km away",
      amenities: ["IMAX Laser", "4DX", "Insignia", "Valet"],
      shows: [
        { id: "sh-601", time: "10:30 AM", format: "IMAX 2D", language: "English", price: 350, bookedSeats: ["C4", "C5"] },
        { id: "sh-602", time: "02:15 PM", format: "2D", language: "Hindi", price: 240, bookedSeats: ["D3", "D4"] },
        { id: "sh-603", time: "07:00 PM", format: "IMAX 3D", language: "English", price: 380, bookedSeats: ["E4", "E5", "E6"] },
        { id: "sh-604", time: "10:30 PM", format: "2D", language: "Hindi", price: 260, bookedSeats: ["B2", "B3"] }
      ]
    }
  ],
  delhi: [
    {
      id: "th-del-1",
      name: "PVR Director's Cut: Ambience Mall (Vasant Kunj)",
      location: "Delhi-NCR",
      area: "Vasant Kunj",
      distance: "4.0 km away",
      amenities: ["Luxury Recliner", "Chef-Crafted Food", "Prive Lounge", "Dolby Atmos"],
      shows: [
        { id: "sh-701", time: "11:00 AM", format: "2D", language: "Hindi", price: 320, bookedSeats: ["A3", "A4"] },
        { id: "sh-702", time: "03:00 PM", format: "IMAX 2D", language: "English", price: 380, bookedSeats: ["C3", "C4", "C5"] },
        { id: "sh-703", time: "07:30 PM", format: "2D", language: "Hindi", price: 340, bookedSeats: ["D4", "D5"] }
      ]
    }
  ]
};

// Seat layout definition: 3 Tiers (Recliner, Gold, Silver)
export const SEAT_TIERS = [
  {
    tier: "Recliner",
    name: "VIP Recliner",
    price: 250,
    rows: ["A"],
    seatsPerRow: 8,
    perks: "Push-back leather recliners with personal charging & food service"
  },
  {
    tier: "Gold",
    name: "Executive Gold",
    price: 180,
    rows: ["B", "C", "D"],
    seatsPerRow: 10,
    perks: "Prime viewing angles with extra legroom and cup holders"
  },
  {
    tier: "Silver",
    name: "Standard Silver",
    price: 130,
    rows: ["E", "F", "G"],
    seatsPerRow: 10,
    perks: "Clear audio & front-to-mid cinema view"
  }
];
