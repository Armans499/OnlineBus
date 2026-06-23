import React from "react";
import Navbar from "../components/Navbar";
import "./MyBookings.css";
import { FaBus, FaCalendarAlt, FaRoute, FaTicketAlt, FaTimesCircle } from "react-icons/fa";

const MyBookings = () => {
  const bookings = JSON.parse(localStorage.getItem("allBookings")) || [];

  const cancelBooking = (bookingIndex) => {
    const bookingToDelete = bookings[bookingIndex];

    // Bug Fix: Clean up seats from the correct bus-specific key (bookedSeats_${busId}) 
    // instead of the global key "bookedSeats" which was leaving seats permanently blocked.
    const busId = bookingToDelete.busId || bookingToDelete.bus?.id;
    const bookedSeatsKey = `bookedSeats_${busId}`;

    const bookedSeats = JSON.parse(localStorage.getItem(bookedSeatsKey)) || [];

    const updatedBookedSeats = bookedSeats.filter(
      seat => !bookingToDelete.seats.includes(seat)
    );

    localStorage.setItem(
      bookedSeatsKey,
      JSON.stringify(updatedBookedSeats)
    );

    // Filter out the cancelled booking from the list
    const updatedBookings = bookings.filter(
      (_, index) => index !== bookingIndex
    );

    localStorage.setItem(
      "allBookings",
      JSON.stringify(updatedBookings)
    );

    // Reload window to update state
    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="bookings-page-wrapper">
        <div className="bookings-header-row">
          <h1>My Bookings</h1>
          <p>View your past bookings and manage current travel tickets</p>
        </div>

        <div className="bookings-cards-list">
          {bookings.length === 0 ? (
            <div className="no-bookings-card-box">
              <FaTicketAlt className="no-bookings-icon" />
              <h2>No Bookings Found</h2>
              <p>You haven't booked any bus tickets yet. Start planning your journey now!</p>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <div className="booking-receipt-card" key={index}>
                <div className="card-top">
                  <div className="card-top-left">
                    <FaBus className="bus-icn" />
                    <div>
                      <h3>{booking.bus?.name || "Premium Coach"}</h3>
                      <p>{booking.bus?.type || "AC Seater"}</p>
                    </div>
                  </div>
                  <div className="status-conf-badge">
                    Confirmed
                  </div>
                </div>

                <div className="card-details-grid">
                  <div className="details-col">
                    <span className="lbl"><FaRoute /> Route</span>
                    <span className="val">{booking.route}</span>
                  </div>

                  <div className="details-col">
                    <span className="lbl"><FaCalendarAlt /> Travel Date</span>
                    <span className="val">{booking.travelDate}</span>
                  </div>

                  <div className="details-col">
                    <span className="lbl">🎟️ Booked Seats</span>
                    <span className="val highlight-val">{booking.seats.join(", ")}</span>
                  </div>

                  <div className="details-col">
                    <span className="lbl">💳 Total Amount</span>
                    <span className="val price-val">₹{booking.totalFare}</span>
                  </div>

                  <div className="details-col">
                    <span className="lbl">🔑 Ticket ID</span>
                    <span className="val id-val">{booking.bookingId}</span>
                  </div>
                </div>

                <div className="card-actions-strip">
                  <button
                    className="cancel-ticket-action-btn"
                    onClick={() => {
                      const confirmCancel = window.confirm(
                        "Are you sure you want to cancel this booking? This action cannot be undone."
                      );
                      if (confirmCancel) {
                        cancelBooking(index);
                      }
                    }}
                  >
                    <FaTimesCircle />
                    <span>Cancel Ticket</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;