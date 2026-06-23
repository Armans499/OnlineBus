import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PassengerDetails.css";
import Navbar from "../components/Navbar";
import { FaUser, FaIdCard, FaArrowRight } from "react-icons/fa";

const PassengerDetails = () => {
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "";
  const to = location.state?.to || "";
  const date = location.state?.date || "";
  const seats = location.state?.seats || [];
  const bus = location.state?.bus;

  useEffect(() => {
    const data = seats.map((seat) => ({
      seat,
      name: "",
      age: "",
      gender: "",
    }));
    setPassengers(data);
  }, [seats]);

  const handleContinue = () => {
    // Bug Fix: Validate all fields for every passenger
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name || !p.name.trim()) {
        alert(`Please enter the name for Passenger ${i + 1} (Seat ${p.seat}).`);
        return;
      }
      if (!p.age || parseInt(p.age) <= 0 || isNaN(p.age)) {
        alert(`Please enter a valid age for Passenger ${i + 1} (Seat ${p.seat}).`);
        return;
      }
      if (!p.gender) {
        alert(`Please select a gender for Passenger ${i + 1} (Seat ${p.seat}).`);
        return;
      }
    }

    navigate("/payment", {
      state: {
        seats,
        passengers,
        bus,
        from,
        to,
        date,
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="passengers-page-wrapper">
        <div className="passenger-header-section">
          <h1>Passenger Details</h1>
          <p className="passenger-subheader">Provide traveler details for booking confirmation</p>
          <span className="seats-summary-badge">
            🎟️ Seats Selected: {seats.join(", ")}
          </span>
        </div>

        <div className="passenger-cards-list">
          {seats.length === 0 ? (
            <div className="no-seats-selected-card">
              <h2>No Seats Selected</h2>
              <p>Please select your seats on the bus layout before entering traveler information.</p>
              <button onClick={() => navigate("/")} className="back-home-btn">Go to Home</button>
            </div>
          ) : (
            passengers.map((passenger, index) => (
              <div className="passenger-form-card" key={passenger.seat}>
                <div className="passenger-card-header">
                  <div className="avatar-icon-bg">
                    <FaUser />
                  </div>
                  <h3>Passenger {index + 1} <span className="seat-badge">Seat {passenger.seat}</span></h3>
                </div>

                <div className="passenger-inputs-grid">
                  <div className="input-field-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      value={passenger.name}
                      onChange={(e) => {
                        const updated = [...passengers];
                        updated[index].name = e.target.value;
                        setPassengers(updated);
                      }}
                    />
                  </div>

                  <div className="input-field-group">
                    <label>Age</label>
                    <input
                      type="number"
                      placeholder="Enter Age"
                      min="1"
                      max="120"
                      value={passenger.age}
                      onChange={(e) => {
                        const updated = [...passengers];
                        updated[index].age = e.target.value;
                        setPassengers(updated);
                      }}
                    />
                  </div>

                  <div className="input-field-group">
                    <label>Gender</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => {
                        const updated = [...passengers];
                        updated[index].gender = e.target.value;
                        setPassengers(updated);
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}

          {seats.length > 0 && (
            <div className="button-action-row">
              <button className="continue-payment-btn" onClick={handleContinue}>
                <span>Continue to Payment</span>
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PassengerDetails;