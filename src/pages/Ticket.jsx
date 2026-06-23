import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Ticket.css";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../components/Navbar";
import { FaCheckCircle, FaPrint, FaArrowLeft, FaRegFilePdf } from "react-icons/fa";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "";
  const to = location.state?.to || "";
  const date = location.state?.date || "";
  // const date = location.state?.date || "";
  const seats = location.state?.seats || [];
  const totalFare = location.state?.totalFare || 0;
  const bus = location.state?.bus;
  const passengers = location.state?.passengers || [];

  // State to hold the final saved booking
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!bus || seats.length === 0) return;

    const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];

    // Bug Fix: Check if this booking has already been saved in this flow
    // (Resolves duplicate entry bug due to React StrictMode double effect execution)
    const existingBooking = allBookings.find(b => 
      b.busId === bus.id && 
      b.seats.length === seats.length &&
      b.seats.every((s, i) => s === seats[i])
    );

    if (existingBooking) {
      setBooking(existingBooking);
      localStorage.setItem("latestBooking", JSON.stringify(existingBooking));
      return;
    }

    // Generate unique ID once and save booking
    const bookingId = "RB" + Math.floor(100000 + Math.random() * 900000);
    const bookingData = {
      passengers,
      bookingId,
      route: `${from} → ${to}`,
      bus,
      busId: bus.id,
      travelDate: date,
      seats,
      totalFare,
      bookingDate: new Date().toLocaleString(),
    };

    setBooking(bookingData);
    localStorage.setItem("latestBooking", JSON.stringify(bookingData));

    // Save seats for the bus
    const oldBookedSeats = JSON.parse(localStorage.getItem(`bookedSeats_${bus.id}`)) || [];
    const updatedBookedSeats = [...new Set([...oldBookedSeats, ...seats])];
    localStorage.setItem(`bookedSeats_${bus.id}`, JSON.stringify(updatedBookedSeats));

    // Append to all bookings
    allBookings.push(bookingData);
    localStorage.setItem("allBookings", JSON.stringify(allBookings));
  }, []);

  if (!bus || seats.length === 0) {
    return (
      <>
        <Navbar />
        <div className="ticket-page-wrapper">
          <div className="invalid-ticket-card">
            <h2>No Booking Data Found</h2>
            <button onClick={() => navigate("/")} className="back-btn">Go to Home</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="ticket-page-wrapper">
        <div className="success-banner">
          <FaCheckCircle className="success-icon" />
          <h1>Booking Successful!</h1>
          <p>Your tickets have been reserved. A confirmation email and SMS have been sent.</p>
        </div>

        <div className="ticket-layout">
          {/* THE RECEIPT TICKET */}
          {booking && (
            <div className="boarding-pass-card">
              <div className="pass-header">
                <div className="brand-logo-txt">
                  <span>bus</span><i>wale</i>
                </div>
                <div className="pass-booking-id">
                  <span className="lbl">Booking ID</span>
                  <span className="val">{booking.bookingId}</span>
                </div>
              </div>

              <div className="pass-route-strip">
                <div className="station">
                  <span className="time">{booking.bus?.departure}</span>
                  <span className="city">{from}</span>
                </div>
                <div className="connector">
                  <span className="route-arrow">→</span>
                </div>
                <div className="station text-right">
                  <span className="time">{booking.bus?.arrival}</span>
                  <span className="city">{to}</span>
                </div>
              </div>

              <div className="pass-meta-info">
                <div className="meta-col">
                  <span className="lbl">Bus Operator</span>
                  <span className="val">{booking.bus?.name}</span>
                </div>
                <div className="meta-col">
                  <span className="lbl">Coach Type</span>
                  <span className="val">{booking.bus?.type}</span>
                </div>
                <div className="meta-col">
                  <span className="lbl">Seats Booked</span>
                  <span className="val highlight">{booking.seats.join(", ")}</span>
                  <p><b>Travel Date :</b>  {booking.travelDate}</p>
                </div>
                <div className="meta-col">
                  <span className="lbl">Booking Time</span>
                  <span className="val">{booking.bookingDate}</span>
                </div>
              </div>

              <div className="ticket-passengers-section">
                <h3>Passenger List</h3>
                <table className="passengers-ticket-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Seat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.passengers.map((p, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.age}</td>
                        <td>{p.gender}</td>
                        <td>{p.seat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pass-fare-footer">
                <span className="lbl">Total Paid Amount</span>
                <span className="val fare-amount">₹{booking.totalFare}</span>
              </div>
            </div>
          )}

          {/* QR CODE & ACTIONS PANEL */}
          {booking && (
            <div className="ticket-actions-card">
              <h2>Quick Ticket Access</h2>
              <p>Scan this QR code at boarding point to get your boarding pass</p>
              
              <div className="qr-box-wrapper">
                <QRCodeCanvas
                  value={`Booking ID: ${booking.bookingId} | Route: ${booking.route} | Seats: ${booking.seats.join(", ")} | Paid: ₹${booking.totalFare} | Travel Date: ${date} | Passenger: ${booking.passengers?.map((p,index)=>`${index + 1}. ${p.name} | Age: ${p.age} | Gender: ${p.gender} | Seat: ${p.seat}`).join("\n")} `} 
                  size={220}
                  className="qr-canvas-item"
                />
              </div>

              <div className="action-buttons-list">
                <button
                  className="action-btn pdf-btn"
                  onClick={() => navigate("/ticket-pdf")}
                >
                  <FaRegFilePdf />
                  <span>View Printable PDF</span>
                </button>

                <button
                  className="action-btn home-btn"
                  onClick={() => navigate("/")}
                >
                  <FaArrowLeft />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Ticket;
