import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCompass, FaCalendarAlt } from 'react-icons/fa';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredTemples, setFeaturedTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/temples?featured=true');
        if (data && data.length > 0) {
          setFeaturedTemples(data.slice(0, 6));
        } else {
          // Fallback to latest temples
          const res = await api.get('/temples');
          setFeaturedTemples(res.data ? res.data.slice(0, 6) : []);
        }
      } catch (err) {
        console.error('Failed to fetch featured temples', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/temples?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickDeities = ['Shiva', 'Vishnu', 'Devi / Shakti', 'Ganesha', 'Murugan'];

  return (
    <div className="home">
      {/* Hero Section with Official Portal Branding */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="portal-badge">
            <img src="/images/logo.png" alt="Emblem" className="portal-badge-logo" />
            <span>Temple Yatra Portal</span>
          </div>

          <h1 className="hero-title">
            India Temple Heritage &amp; Pilgrimage Information Portal
          </h1>

          <p className="hero-subtitle">
            Explore centuries of divine architecture, sacred rituals, darshan timings,
            and timeless spiritual circuits across Bharat.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search temples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search temples"
            />
            <button type="submit" className="search-btn">
              <FaSearch className="search-icon" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick Filters */}
          <div className="quick-tags">
            <span className="quick-tag-label">Explore by Deity:</span>
            {quickDeities.map((d) => (
              <Link key={d} to={`/temples?deity=${encodeURIComponent(d)}`} className="quick-tag">
                {d}
              </Link>
            ))}
          </div>

          <div className="hero-ctas">
            <Link to="/temples" className="cta-btn primary-cta">
              <FaCompass /> Explore All Temples
            </Link>
            <Link to="/circuits" className="cta-btn secondary-cta">
              <FaMapMarkerAlt /> Pilgrimage Circuits
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div className="sub-badge">Sacred Wonders</div>
            <h2>Featured Temple Destinations</h2>
            <p>Discover India's most revered architectural and spiritual marvels</p>
          </div>

          <div className="temple-grid">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading sacred destinations...</p>
              </div>
            ) : featuredTemples.length > 0 ? (
              featuredTemples.map((temple) => (
                <div className="temple-card" key={temple._id}>
                  <div className="card-image-wrapper">
                    {temple.images && temple.images.length > 0 ? (
                      <img
                        src={temple.images[0]}
                        alt={temple.name}
                        className="card-image"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.opacity = '0';
                        }}
                      />
                    ) : (
                      <div className="card-image-fallback">
                        <span className="fallback-icon">🏛️</span>
                      </div>
                    )}
                    {temple.category && (
                      <span className="card-badge">{temple.category}</span>
                    )}
                  </div>

                  <div className="card-content">
                    <div className="card-header-row">
                      <span className="card-deity">{temple.deity}</span>
                      <span className="card-location">
                        <FaMapMarkerAlt /> {temple.location?.city}, {temple.location?.state}
                      </span>
                    </div>

                    <h3>{temple.name}</h3>

                    <p className="desc">
                      {temple.description
                        ? temple.description.length > 110
                          ? `${temple.description.substring(0, 110)}...`
                          : temple.description
                        : 'A sanctified heritage shrine of timeless architecture and spiritual significance.'}
                    </p>

                    <div className="card-footer">
                      <Link
                        to={`/temples/${temple.slug || temple._id}`}
                        className="card-link"
                      >
                        View Temple Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>Sacred Destinations Updating</h3>
                <p>Populating temple heritage information...</p>
              </div>
            )}
          </div>

          <div className="section-footer-cta">
            <Link to="/temples" className="view-all-btn">
              View All Temples Across India &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Pillars Feature Strip */}
      <section className="heritage-pillars">
        <div className="container pillars-grid">
          <div className="pillar-item">
            <div className="pillar-icon">🏛️</div>
            <h4>Architectural Heritage</h4>
            <p>From Dravidian Gopurams to Nagara spires, explore ancient stone masonry.</p>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon">🕉️</div>
            <h4>Darshan &amp; Timings</h4>
            <p>Verified daily pooja schedules, aarti hours, and authentic dress codes.</p>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon"><FaMapMarkerAlt /></div>
            <h4>Pilgrimage Circuits</h4>
            <p>Follow canonical yatras: Char Dham, 12 Jyotirlingas, and Shakti Peethas.</p>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon"><FaCalendarAlt /></div>
            <h4>Cultural Festivals</h4>
            <p>Brahmotsavams, Rath Yatras, and celestial festivals throughout the year.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

