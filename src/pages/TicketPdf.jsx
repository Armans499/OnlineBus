import React from "react";
import { useNavigate } from "react-router-dom";
import "./TicketPdf.css";
import { FaBus, FaPrint, FaArrowLeft } from "react-icons/fa";

const TicketPdf = () => {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("latestBooking"));

  // Bug Fix: Handle null booking data safely to prevent page crashes on manual reload
  if (!booking) {
    return (
      <div className="ticketpdf-page-wrapper error-page">
        <div className="error-card">
          <FaBus className="error-icon" />
          <h2>Ticket Details Not Found</h2>
          <p>We couldn't load the requested boarding pass. This can happen if the browser session was reset.</p>
          <button onClick={() => navigate("/")} className="go-home-btn">
            <FaArrowLeft />
            <span>Go to Home</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ticketpdf-page-wrapper">
      <div className="print-controls no-print">
        <button onClick={() => navigate("/")} className="control-btn back">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <button onClick={() => window.print()} className="control-btn print">
          <FaPrint />
          <span>Print / Download PDF</span>
        </button>
      </div>

      <div className="ticket-printable-document">
        <div className="doc-header">
          <div className="brand-section">
            <div className="brand-logo">
              <span>bus</span><i>wale</i>
            </div>
            <p className="brand-tagline">BOOK YOUR JOURNEY, YOUR WAY</p>
          </div>
          
          <div className="doc-type-badge">
            <span className="badge-lbl">Boarding Pass</span>
            <span className="booking-id-txt">{booking.bookingId}</span>
          </div>
        </div>

        <div className="doc-body">
          <div className="info-grid">
            <div className="info-cell full-width">
              <h4>Route / Journey</h4>
              <p className="route-bold">{booking.route}</p>
            </div>

            <div className="info-cell">
              <h4>Bus Operator</h4>
              <p>{booking.bus?.name}</p>
            </div>

            <div className="info-cell">
              <h4>Coach Type</h4>
              <p>{booking.bus?.type}</p>
            </div>

            <div className="info-cell">
              <h4>Departure Time</h4>
              <p className="time-highlight">{booking.bus?.departure}</p>
            </div>

            <div className="info-cell">
              <h4>Arrival Time</h4>
              <p className="time-highlight">{booking.bus?.arrival}</p>
            </div>

            <div className="info-cell">
              <h4>Travel Date</h4>
              <p>{booking.travelDate}</p>
            </div>

            <div className="info-cell">
              <h4>Selected Seats</h4>
              <p className="seats-highlight">{booking.seats.join(", ")}</p>
            </div>

            <div className="info-cell">
              <h4>Total Paid Fare</h4>
              <p className="fare-highlight">₹{booking.totalFare}</p>
            </div>

            <div className="info-cell full-width border-top">
              <h4>Booking Date & Time</h4>
              <p>{booking.bookingDate}</p>
            </div>
          </div>

          <div className="passenger-section">
            <h3>Passenger Details</h3>
            <table className="doc-passenger-table">
              <thead>
                <tr>
                  <th>Passenger Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Seat No</th>
                </tr>
              </thead>
              <tbody>
                {booking.passengers?.map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td><b>{p.seat}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doc-footer">
          <div className="status-container">
            <span className="status-stamp">Confirmed</span>
          </div>
          <div className="instructions">
            <h5>Boarding Instructions:</h5>
            <ol>
              <li>Please report at the boarding point at least 15 minutes before departure.</li>
              <li>Show this digital/printed ticket along with a valid Government ID card during boarding.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPdf;