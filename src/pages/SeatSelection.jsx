import React, { useState } from "react";
import { FaBus, FaRegCheckCircle } from "react-icons/fa";
import "./SeatSelection.css";
import { useNavigate, useLocation } from "react-router-dom";
import { GiSteeringWheel } from "react-icons/gi";
import Navbar from "../components/Navbar";

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "";
  const to = location.state?.to || "";
  const date = location.state?.date || "";
  const bus = location.state?.bus;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const farePerSeat = bus?.price || 0;
  const totalFare = selectedSeats.length * farePerSeat;

  const bookedSeats = JSON.parse(
    localStorage.getItem(`bookedSeats_${bus?.id}`)
  ) || [];

  const handleSeatClick = (seatNo) => {
    if (bookedSeats.includes(seatNo)) return;

    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNo));
    } else {
      setSelectedSeats([...selectedSeats, seatNo]);
    }
  };

  const renderSeat = (seatNo) => {
    const isBooked = bookedSeats.includes(seatNo);
    const isSelected = selectedSeats.includes(seatNo);
    
    return (
      <div
        key={seatNo}
        className={`seat-box-item 
          ${isBooked ? "booked" : ""} 
          ${isSelected ? "selected" : ""}`}
        onClick={() => handleSeatClick(seatNo)}
      >
        <span>{seatNo}</span>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="seats-page-wrapper">
        <div className="page-header-row">
          <h1>Select Your Seats</h1>
          <p className="bus-subinfo">{bus?.name} • {bus?.type}</p>
          <p className="route-timing">{bus?.departure} → {bus?.arrival}</p>
        </div>

        <div className="seats-main-layout">
          {/* BUS LAYOUT CARD */}
          <div className="bus-cabin-card">
            <div className="cabin-header">
              <span className="cabin-gate">Entrance</span>
              <div className="driver-cockpit">
                <GiSteeringWheel className="steering-icon" />
                <span className="driver-label">Driver</span>
              </div>
            </div>

            <div className="seats-grid-cabin">
              {[1, 5, 9, 13, 17, 21].map((start) => (
                <div className="seat-row-strip" key={start}>
                  <div className="seat-pair left-pair">
                    {renderSeat(start)}
                    {renderSeat(start + 1)}
                  </div>

                  <div className="aisle-space"></div>

                  <div className="seat-pair right-pair">
                    {renderSeat(start + 2)}
                    {renderSeat(start + 3)}
                  </div>
                </div>
              ))}

              <div className="last-row-strip">
                {renderSeat(25)}
                {renderSeat(26)}
                {renderSeat(27)}
                {renderSeat(28)}
                {renderSeat(29)}
                {renderSeat(30)}
              </div>
            </div>
          </div>

          {/* CHECKOUT SUMMARY CARD */}
          <div className="checkout-summary-card">
            <h2>Booking Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Route</span>
                <span className="summary-val">{from} → {to}</span>
              </div>

              {date && (
                <div className="summary-row">
                  <span className="summary-label">Date</span>
                  <span className="summary-val">{date}</span>
                </div>
              )}

              <div className="summary-row">
                <span className="summary-label">Selected Seats</span>
                <span className="summary-val highlight">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None selected"}
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Fare Per Seat</span>
                <span className="summary-val">₹{farePerSeat}</span>
              </div>

              <div className="divider-line"></div>

              <div className="summary-row total-row">
                <span className="summary-label">Total Amount</span>
                <span className="summary-val total-price">₹{totalFare}</span>
              </div>
            </div>

            <button
              className="proceed-checkout-btn"
              onClick={() => {
                // Bug Fix: Check if no seats are selected before proceeding
                if (selectedSeats.length === 0) {
                  alert("Please select at least one seat to proceed.");
                  return;
                }

                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

                if (!isLoggedIn) {
                  navigate("/login", {
                    state: {
                      seats: selectedSeats,
                      bus,
                      from,
                      to,
                      date,
                    },
                  });
                  return;
                }

                navigate("/passenger-details", {
                  state: {
                    seats: selectedSeats,
                    bus,
                    from,
                    to,
                    date,
                  },
                });
              }}
            >
              <span>Proceed to Booking</span>
              <FaRegCheckCircle />
            </button>
          </div>
        </div>

        {/* LEGEND SECTION */}
        <div className="seat-legend-bar">
          <div className="legend-item">
            <span className="legend-color available-col"></span>
            <span>Available</span>
          </div>

          <div className="legend-item">
            <span className="legend-color booked-col"></span>
            <span>Booked</span>
          </div>

          <div className="legend-item">
            <span className="legend-color selected-col"></span>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelection;