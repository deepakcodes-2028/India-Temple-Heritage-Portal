import React from 'react';
import { Link } from 'react-router-dom';
import { FaOm, FaHeart, FaUserShield } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="portal-footer">
      <div className="container footer-grid">
        {/* Col 1: Brand & Overview */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <img src="/images/logo.png" alt="India Temple Heritage Emblem" className="footer-logo-img" />
            <span>Temple<span className="logo-accent">Yatra</span></span>
          </Link>
          <p className="portal-sub">
            India Temple Heritage &amp; Pilgrimage Information Portal
          </p>
          <p className="portal-desc">
            Documenting and honoring millennia of sacred architecture, verified darshan timings,
            divine rituals, and timeless pilgrimage yatras across the Indian subcontinent.
          </p>
          <div className="sanskrit-motto">
            <FaOm className="om-mini" /> <span>धर्मो रक्षति रक्षितः</span> (Dharmo Rakshati Rakshitah)
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="footer-col">
          <h4>Portal Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Portal</Link></li>
            <li><Link to="/temples">Temples Directory</Link></li>
            <li><Link to="/circuits">Pilgrimage Circuits</Link></li>
            <li><Link to="/festivals">Festivals Calendar</Link></li>
          </ul>
        </div>

        {/* Col 3: Popular Circuits */}
        <div className="footer-col">
          <h4>Sacred Yatras</h4>
          <ul className="footer-links">
            <li><Link to="/circuits">The Badi Char Dham Yatra</Link></li>
            <li><Link to="/temples?category=12+Jyotirlingas">12 Jyotirlinga Circuit</Link></li>
            <li><Link to="/temples?category=Dravidian+Heritage">Dravidian Heritage Trail</Link></li>
            <li><Link to="/temples?category=UNESCO+World+Heritage">UNESCO Heritage Temples</Link></li>
          </ul>
        </div>

        {/* Col 4: Heritage Trust & Admin */}
        <div className="footer-col">
          <h4>Heritage Guidelines</h4>
          <p className="disclaimer-text">
            Information presented is curated from verified temple trusts, devasthanams, and archaeological survey documentation.
          </p>
          <div className="admin-portal-link-wrap">
            <Link to="/admin/login" className="admin-footer-btn">
              <FaUserShield /> Administrator Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-content">
          <p>
            &copy; {new Date().getFullYear()} <strong>Temple Yatra</strong> — India Temple Heritage &amp; Pilgrimage Information Portal. Built with <FaHeart className="heart-icon" /> for Indian Cultural Heritage.
          </p>
          <div className="footer-bottom-links">
            <Link to="/">Home</Link>
            <span>•</span>
            <Link to="/temples">Temples</Link>
            <span>•</span>
            <Link to="/circuits">Circuits</Link>
            <span>•</span>
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
