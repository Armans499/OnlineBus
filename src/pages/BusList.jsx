import React from "react";
import "./BusList.css";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBus, FaStar, FaRoute, FaArrowRight, FaClock } from "react-icons/fa";

const buses = [
  {
    id: 1,
    name: "Orange Travels",
    totalSeats: 30,
    from: "Pune",
    to: "Mumbai",
    type: "AC Sleeper",
    departure: "10:00 PM",
    arrival: "06:00 AM",
    price: 899,
    rating: 4.5,
  },
  {
    id: 2,
    name: "VRL Travels",
    totalSeats: 30,
    from: "Pune",
    to: "Mumbai",
    type: "AC Seater",
    departure: "11:00 PM",
    arrival: "07:00 AM",
    price: 799,
    rating: 4.2,
  },
  {
    id: 3,
    name: "SRS Travels",
    totalSeats: 30,
    from: "Delhi",
    to: "Jaipur",
    type: "Sleeper",
    departure: "09:30 PM",
    arrival: "05:30 AM",
    price: 999,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Red Express",
    totalSeats: 30,
    from: "Mumbai",
    to: "Bangalore",
    type: "AC Sleeper",
    departure: "08:00 PM",
    arrival: "08:00 AM",
    price: 1299,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Mahendra Travels",
    totalSeats: 30,
    from: "Pune",
    to: "Mumbai",
    type: "AC Sleeper",
    departure: "09:00 PM",
    arrival: "05:30 AM",
    price: 1099,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Sharma Travels",
    totalSeats: 30,
    from: "Pune",
    to: "Mumbai",
    type: "Non AC Sleeper",
    departure: "08:00 PM",
    arrival: "04:30 AM",
    price: 699,
    rating: 4.1,
  },
  {
    id: 7,
    name: "Purple Travels",
    totalSeats: 30,
    from: "Mumbai",
    to: "Bangalore",
    type: "Volvo AC",
    departure: "07:00 PM",
    arrival: "08:00 AM",
    price: 1499,
    rating: 4.9,
  },
  {
    id: 8,
    name: "National Travels",
    totalSeats: 30,
    from: "Delhi",
    to: "Jaipur",
    type: "AC Sleeper",
    departure: "10:30 PM",
    arrival: "04:30 AM",
    price: 899,
    rating: 4.4,
  }
];

function BusList() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "";
  const to = location.state?.to || "";
  const date = location.state?.date || "";

  // Dynamic filtering of buses matching selected From and To cities (case-insensitive & trimmed)
  const filteredBuses = buses.filter(bus => 
    bus.from.toLowerCase().trim() === from.toLowerCase().trim() && 
    bus.to.toLowerCase().trim() === to.toLowerCase().trim()
  );

  return (
    <>
      <Navbar />
      
      <div className="bus-page-wrapper">
        <div className="search-summary-banner">
          <div className="summary-left">
            <h1>Available Coaches</h1>
            <div className="route-indicator">
              <span>{from}</span>
              <FaArrowRight className="arrow-divider" />
              <span>{to}</span>
            </div>
            {date && <p className="travel-date">📅 Journey Date: {date}</p>}
          </div>
          <div className="summary-right">
            <span className="results-count-badge">
              {filteredBuses.length} Buses Found
            </span>
          </div>
        </div>

        <div className="bus-list-container">
          {filteredBuses.length === 0 ? (
            <div className="no-buses-card">
              <FaBus className="no-bus-icon" />
              <h2>No Buses Found</h2>
              <p>We couldn't find any coaches operating from <b>{from}</b> to <b>{to}</b>. Please search for alternative cities (e.g., Pune → Mumbai, Delhi → Jaipur, or Mumbai → Bangalore).</p>
              <button onClick={() => navigate("/")} className="back-btn">Go Back to Search</button>
            </div>
          ) : (
            filteredBuses.map((bus) => {
              const bookedSeats = JSON.parse(
                localStorage.getItem(`bookedSeats_${bus.id}`)
              ) || [];

              const uniqueBookedSeats = [...new Set(bookedSeats)];
              const seatsLeft = bus.totalSeats - uniqueBookedSeats.length;

              return (
                <div className="bus-result-card" key={bus.id}>
                  <div className="card-top-section">
                    <div className="bus-visual-box">
                      <FaBus className="bus-card-icon" />
                    </div>
                    
                    <div className="bus-header-details">
                      <div className="title-row">
                        <h2>{bus.name}</h2>
                        <span className="rating-badge">
                          <FaStar className="star-icon" /> {bus.rating}
                        </span>
                      </div>
                      <p className="bus-type-lbl">{bus.type}</p>
                    </div>
                  </div>

                  <div className="card-middle-section">
                    <div className="timing-details-grid">
                      <div className="time-col">
                        <span className="time-lbl">{bus.departure}</span>
                        <span className="city-lbl">{from}</span>
                      </div>

                      <div className="duration-col">
                        <span className="dur-text"><FaClock /> Overnight</span>
                        <div className="line-connector">
                          <span className="dot start-dot"></span>
                          <span className="line-path"></span>
                          <span className="dot end-dot"></span>
                        </div>
                      </div>

                      <div className="time-col text-right">
                        <span className="time-lbl">{bus.arrival}</span>
                        <span className="city-lbl">{to}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-bottom-section">
                    <div className="seats-info">
                      <span className="seats-count">{seatsLeft}</span> Seats Left
                    </div>
                    
                    <div className="price-tag">
                      <span className="currency">₹</span>
                      <span className="price-value">{bus.price}</span>
                    </div>

                    <button
                      className="select-seats-btn"
                      onClick={() =>
                        navigate("/seats", {
                          state: {
                            bus,
                            from,
                            to,
                            date,
                          }
                        })
                      }
                    >
                      View Seats
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default BusList;