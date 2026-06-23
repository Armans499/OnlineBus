import Navbar from '../components/Navbar'
import darkLogo from '../img/buswale_logo_dark.png'
import mobileApp from '../img/buswale_mobile_app.png'
import './Home.css'
import { Button } from 'react-bootstrap';
import { 
  FaBus, 
  FaShieldAlt, 
  FaHeadset, 
  FaLock, 
  FaUsers, 
  FaRoute, 
  FaStar, 
  FaTag, 
  FaMobileAlt, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaApple,
  FaPlay
} from "react-icons/fa";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import cus1 from '../img/cus1.png'
import cus2 from '../img/cus2.png'
import cus3 from '../img/cus3.png'

function Home(){
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const navigate = useNavigate();

  return(
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="trust-badge">
            <FaShieldAlt className="badge-icon"/>
            <span>India's Most Trusted Bus Booking Platform</span>
          </div>
          
          <h1 className="hero-heading">
            Travel Across India<br />
            with <span className="bus">bus</span><span className='wale'>wale</span>
          </h1>

          <p className="hero-subtitle">
            Book buses across 2500+ routes at the best prices
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <FaBus className="feature-icon" />
              <span>Easy Booking</span>
            </div>
            <div className="feature-item">
              <FaLock className="feature-icon" />
              <span>Secure Payment</span>
            </div>
            <div className="feature-item">
              <FaHeadset className="feature-icon" />
              <span>24x7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH PANEL SECTION */}
      <div className="search-panel-container">
        <div className="search-box">
          <div className="search-input">
            <span className="input-label-container">
              <FaLocationDot className="icon" />
              <span className="input-label">From City</span>
            </span>
            <input
              type="text"
              placeholder="Select From City"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="search-input">
            <span className="input-label-container">
              <FaLocationDot className="icon" />
              <span className="input-label">To City</span>
            </span>
            <input
              type="text"
              placeholder="Select To City"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="search-input date-input-container">
            <span className="input-label-container">
              <FaCalendarDays className="icon" />
              <span className="input-label">Journey Date</span>
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            className="search-submit-btn"
            onClick={() => {
              sessionStorage.removeItem("bookingSaved");
              navigate("/buses", {
                state: {
                  from,
                  to,
                  date,
                },
              });
            }}
          >
            <span>Search Buses</span>
            <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>

      {/* TRUSTED BY MILLIONS SECTION */}
      <section className="stats">
        <div className="section-title-container">
          <span className="title-arrow">→</span>
          <h2 className="section-title">Trusted By <span className="highlight-text">Millions</span></h2>
        </div>
        <p className="section-subtitle">Delivering safe, reliable and comfortable journeys across the country</p>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FaUsers className="stat-card-icon" />
            </div>
            <h3>36M+</h3>
            <p>Happy Customers</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FaRoute className="stat-card-icon" />
            </div>
            <h3>2500+</h3>
            <p>Routes Across India</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FaBus className="stat-card-icon" />
            </div>
            <h3>3500+</h3>
            <p>Trusted Bus Operators</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FaStar className="stat-card-icon star-colored" />
            </div>
            <h3>4.8 ⭐</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BUSWALE SECTION */}
      <section className="why">
        <h2 className="section-title text-center underline-red">
          Why Choose <span className="highlight-text">Buswale</span>?
        </h2>

        <div className="why-container">
          <div className="why-card">
            <div className="why-icon-wrapper">
              <FaShieldAlt className="why-card-icon" />
            </div>
            <h3>Safe & Secure</h3>
            <p>Your safety is our priority. Verified operators and secure payments.</p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrapper">
              <FaTag className="why-card-icon" />
            </div>
            <h3>Best Price Guarantee</h3>
            <p>Get the best deals and exclusive offers on every booking.</p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrapper">
              <FaHeadset className="why-card-icon" />
            </div>
            <h3>24/7 Customer Support</h3>
            <p>We're here for you anytime, anywhere.</p>
          </div>

          <div className="why-card">
            <div className="why-icon-wrapper">
              <FaMobileAlt className="why-card-icon" />
            </div>
            <h3>Easy Booking</h3>
            <p>Book tickets in just a few clicks with a smooth experience.</p>
          </div>
        </div>
      </section>

      {/* WHAT OUR CUSTOMERS SAY (TESTIMONIALS) SECTION */}
      <section className="testimonials">
        <h2 className="section-title text-center underline-red">
          What Our Customers Say
        </h2>
        
        <div className="testimonials-carousel-wrapper">
          <button className="carousel-control-btn prev-btn">
            <FaChevronLeft />
          </button>
          
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={cus1} alt="Prathamesh Dhokale" className="testimonial-avatar" />
                <div className="testimonial-user-info">
                  <h4>Prathamesh Dhokale</h4>
                  <span>Kothurd, Pune</span>
                </div>
                <div className="testimonial-check-icon">✓</div>
              </div>
              <div className="testimonial-rating">
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
              </div>
              <p className="testimonial-text">
                "Amazing experience! Easy booking and great customer support."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={cus2} alt="Sai Dasgude" className="testimonial-avatar" />
                <div className="testimonial-user-info">
                  <h4>Sai Dasgude</h4>
                  <span>Wagholi, Pune</span>
                </div>
                <div className="testimonial-check-icon">✓</div>
              </div>
              <div className="testimonial-rating">
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
              </div>
              <p className="testimonial-text">
                "Clean buses, on-time service and comfortable journey."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={cus3} alt="Suyesh Kale" className="testimonial-avatar" />
                <div className="testimonial-user-info">
                  <h4>Suyesh Kale</h4>
                  <span>Satara</span>
                </div>
                <div className="testimonial-check-icon">✓</div>
              </div>
              <div className="testimonial-rating">
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
                <FaStar className="star-active" />
              </div>
              <p className="testimonial-text">
                "Best prices and widest range of routes. Highly recommended!"
              </p>
            </div>
          </div>

          <button className="carousel-control-btn next-btn">
            <FaChevronRight />
          </button>
        </div>

        <div className="carousel-dots-container">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      {/* DOWNLOAD APP BANNER SECTION */}
      <section className="download-section">
        <div className="download-container">
          <div className="download-left">
            <img src={mobileApp} alt="Buswale App Mockup" className="app-mockup-img" />
          </div>
          
          <div className="download-middle">
            <h2>Download the Buswale App</h2>
            <p>Book tickets on the go and get exclusive app offers!</p>
            
            <div className="app-stores-buttons">
              <a href="#" className="store-btn" onClick={(e) => e.preventDefault()}>
                <FaPlay className="store-icon play-icon" />
                <div className="store-text">
                  <span className="store-small">GET IT ON</span>
                  <span className="store-bold">Google Play</span>
                </div>
              </a>
              
              <a href="#" className="store-btn" onClick={(e) => e.preventDefault()}>
                <FaApple className="store-icon apple-icon" />
                <div className="store-text">
                  <span className="store-small">Download on the</span>
                  <span className="store-bold">App Store</span>
                </div>
              </a>
            </div>
          </div>
          
          <div className="download-right">
            <div className="download-feature-badge">
              <div className="badge-icon-bg">
                <FaBus />
              </div>
              <span>Easy Booking</span>
            </div>
            
            <div className="download-feature-badge">
              <div className="badge-icon-bg">
                <FaTag />
              </div>
              <span>Exclusive Offers</span>
            </div>
            
            <div className="download-feature-badge">
              <div className="badge-icon-bg">
                <FaRoute />
              </div>
              <span>Live Tracking</span>
            </div>
            
            <div className="download-feature-badge">
              <div className="badge-icon-bg">
                <FaShieldAlt />
              </div>
              <span>Safe & Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <img src={darkLogo} alt="Buswale Dark Logo" className="footer-logo" />
            <p className="brand-desc">
              Buswale is India's most trusted bus booking platform. Book safe, comfortable and affordable journeys with us.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" onClick={(e) => e.preventDefault()}><FaFacebookF /></a>
              <a href="#" className="social-icon" onClick={(e) => e.preventDefault()}><FaInstagram /></a>
              <a href="#" className="social-icon" onClick={(e) => e.preventDefault()}><FaTwitter /></a>
              <a href="#" className="social-icon" onClick={(e) => e.preventDefault()}><FaYoutube /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>About Us</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Careers</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Press</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Help & Support</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Payment Options</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Cancellation Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Terms & Conditions</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Top Cities</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Bangalore</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Delhi</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Mumbai</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Hyderabad</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Chennai</a></li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates and offers</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Buswale. All rights reserved.</p>
        </div>
      </footer>
    </>      
  );
}

export default Home;