import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import Navbar from "../components/Navbar";
import { FaCreditCard, FaMobileAlt, FaUniversity, FaLock } from "react-icons/fa";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "";
  const to = location.state?.to || "";
  const date = location.state?.date || "";
  const seats = location.state?.seats || [];
  const bus = location.state?.bus;
  const passengers = location.state?.passengers || [];

  const farePerSeat = bus?.price || 0;
  const totalFare = seats.length * farePerSeat;

  // State to track selected payment option
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayNow = () => {
    // Bug Fix: Check if a payment method was selected before proceeding
    if (!paymentMethod) {
      alert("Please select a payment method to complete your booking.");
      return;
    }

    navigate("/ticket", {
      state: {
        seats,
        totalFare,
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

      <div className="payment-page-wrapper">
        <div className="payment-layout-grid">
          {/* MAIN PAYMENT BOX */}
          <div className="payment-options-card">
            <h1>Select Payment Method</h1>
            <p className="payment-subtitle">Choose how you would like to pay for your tickets</p>

            <div className="options-list">
              <div 
                className={`payment-option-item ${paymentMethod === "UPI" ? "active" : ""}`}
                onClick={() => setPaymentMethod("UPI")}
              >
                <div className="option-radio-input">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                  />
                </div>
                <div className="option-icon-wrapper">
                  <FaMobileAlt className="option-icon" />
                </div>
                <div className="option-details">
                  <h3>UPI (GPay / PhonePe / Paytm)</h3>
                  <p>Pay instantly using your UPI ID or scanner</p>
                </div>
              </div>

              <div 
                className={`payment-option-item ${paymentMethod === "Card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("Card")}
              >
                <div className="option-radio-input">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={() => setPaymentMethod("Card")}
                  />
                </div>
                <div className="option-icon-wrapper">
                  <FaCreditCard className="option-icon" />
                </div>
                <div className="option-details">
                  <h3>Credit / Debit Card</h3>
                  <p>Visa, MasterCard, RuPay, and Maestro supported</p>
                </div>
              </div>

              <div 
                className={`payment-option-item ${paymentMethod === "Net Banking" ? "active" : ""}`}
                onClick={() => setPaymentMethod("Net Banking")}
              >
                <div className="option-radio-input">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="Net Banking"
                    checked={paymentMethod === "Net Banking"}
                    onChange={() => setPaymentMethod("Net Banking")}
                  />
                </div>
                <div className="option-icon-wrapper">
                  <FaUniversity className="option-icon" />
                </div>
                <div className="option-details">
                  <h3>Net Banking</h3>
                  <p>Secure transactions via all major Indian banks</p>
                </div>
              </div>
            </div>

            <button className="pay-now-action-btn" onClick={handlePayNow}>
              <FaLock />
              <span>Pay Securely ₹{totalFare}</span>
            </button>
          </div>

          {/* SIDEBAR TICKET SUMMARY */}
          <div className="booking-summary-sidebar">
            <h2>Fare Summary</h2>
            
            <div className="sidebar-details-list">
              <div className="sidebar-row">
                <span className="lbl">Operator</span>
                <span className="val">{bus?.name}</span>
              </div>

              <div className="sidebar-row">
                <span className="lbl">Type</span>
                <span className="val">{bus?.type}</span>
              </div>

              <div className="sidebar-row">
                <span className="lbl">Journey</span>
                <span className="val">{from} → {to}</span>
              </div>

              {date && (
                <div className="sidebar-row">
                  <span className="lbl">Date</span>
                  <span className="val">{date}</span>
                </div>
              )}

              <div className="sidebar-row">
                <span className="lbl">Seats</span>
                <span className="val highlight">{seats.join(", ")}</span>
              </div>

              <div className="sidebar-row">
                <span className="lbl">Fare Per Seat</span>
                <span className="val">₹{farePerSeat}</span>
              </div>

              <div className="line-break"></div>

              <div className="sidebar-row total-sum-row">
                <span className="lbl-total">Total Amount</span>
                <span className="val-total">₹{totalFare}</span>
              </div>
            </div>

            <div className="safety-guarantee-note">
              <span className="lock-badge">🛡️ SSL Secure</span>
              <p>Your payment data is fully encrypted and secure. We comply with PCI-DSS safety standards.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;