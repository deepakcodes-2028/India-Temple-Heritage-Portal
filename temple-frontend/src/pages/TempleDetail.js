import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaClock,
  FaDirections,
  FaShareAlt,
  FaCheck,
  FaTshirt,
  FaCamera,
  FaShoePrints,
  FaHotel,
  FaBus,
  FaUtensils,
  FaCalendarAlt,
  FaArrowLeft,
  FaOm,
  FaPray
} from 'react-icons/fa';
import api from '../services/api';
import './TempleDetail.css';

const TempleDetail = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTemple = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/temples/${id}`);
        setTemple(data);
      } catch (err) {
        console.error('Failed to load temple details', err);
        setError('Temple details not found or temporarily unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchTemple();
    window.scrollTo(0, 0);
  }, [id]);

  const handleDirections = () => {
    if (!temple) return;
    const { coordinates, address, name, location } = temple;
    let url = '';
    if (coordinates && coordinates.lat && coordinates.lng) {
      url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    } else if (address) {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${location?.city}, ${location?.state}`)}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${temple.name} — Temple Yatra`,
      text: `Discover ${temple.name} in ${temple.location?.city}, ${temple.location?.state} on Temple Yatra: India Temple Heritage Portal.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Web Share failed, falling back to clipboard', err);
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Clipboard copy error', err);
    }
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading sacred temple information...</p>
      </div>
    );
  }

  if (error || !temple) {
    return (
      <div className="detail-error-container">
        <div className="detail-error-card">
          <div className="error-icon">🏛️</div>
          <h2>Temple Not Found</h2>
          <p>{error || 'The requested temple profile could not be located.'}</p>
          <Link to="/temples" className="back-btn">
            <FaArrowLeft /> Return to Temples Directory
          </Link>
        </div>
      </div>
    );
  }

  const images = temple.images && temple.images.length > 0
    ? temple.images
    : ['https://images.unsplash.com/photo-1595166297397-601426477e38?auto=format&fit=crop&q=80&w=1200'];

  return (
    <div className="temple-detail-page">
      {/* Toast Notification */}
      {copied && (
        <div className="toast-notification">
          <FaCheck /> Temple link copied to clipboard!
        </div>
      )}

      {/* Navigation Breadcrumb Strip */}
      <div className="breadcrumb-strip">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <Link to="/temples">Temples</Link>
            <span className="separator">/</span>
            <span className="current-crumb">{temple.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="detail-hero">
        <div className="container detail-hero-content">
          <div className="detail-badges">
            {temple.category && <span className="category-pill">{temple.category}</span>}
            <span className="deity-pill"><FaOm /> {temple.deity}</span>
          </div>

          <h1 className="temple-title">{temple.name}</h1>

          <p className="temple-location-row">
            <FaMapMarkerAlt className="loc-icon" />
            <span>{temple.location?.address || `${temple.location?.city}, ${temple.location?.state}, India`}</span>
          </p>

          <div className="action-buttons-group">
            <button onClick={handleDirections} className="action-btn directions-btn">
              <FaDirections /> Get Directions (Google Maps)
            </button>
            <button onClick={handleShare} className="action-btn share-btn">
              <FaShareAlt /> {copied ? 'Link Copied!' : 'Share Temple'}
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container detail-body-layout">
        <div className="detail-main-column">
          {/* Gallery Showcase */}
          <div className="gallery-showcase">
            <div className="main-image-container">
              <img
                src={images[activeImageIndex]}
                alt={`${temple.name} view ${activeImageIndex + 1}`}
                className="main-gallery-img"
                referrerPolicy="no-referrer"
              />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-gallery-row">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="detail-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview &amp; History
            </button>
            <button
              className={`tab-btn ${activeTab === 'darshan' ? 'active' : ''}`}
              onClick={() => setActiveTab('darshan')}
            >
              Darshan &amp; Rituals
            </button>
            <button
              className={`tab-btn ${activeTab === 'visit' ? 'active' : ''}`}
              onClick={() => setActiveTab('visit')}
            >
              Plan Your Visit
            </button>
            <button
              className={`tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('facilities')}
            >
              Nearby Facilities
            </button>
          </div>

          {/* Tab Content 1: Overview & History */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="content-card">
                <h3>About the Sacred Sanctum</h3>
                <p className="paragraph-text">{temple.description}</p>
              </div>

              {temple.history && (
                <div className="content-card">
                  <h3>Historical Significance &amp; Architecture</h3>
                  <p className="paragraph-text">{temple.history}</p>
                </div>
              )}

              {temple.festivals && temple.festivals.length > 0 && (
                <div className="content-card">
                  <h3>Major Celebrated Festivals</h3>
                  <div className="festivals-pill-list">
                    {temple.festivals.map((fest, idx) => (
                      <div className="festival-chip" key={fest._id || idx}>
                        <FaCalendarAlt className="chip-icon" />
                        <div>
                          <strong>{fest.name || 'Festival'}</strong>
                          {fest.period && <span> — {fest.period}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 2: Darshan & Rituals */}
          {activeTab === 'darshan' && (
            <div className="tab-pane">
              <div className="content-card">
                <h3><FaClock className="section-icon" /> Daily Darshan Timings</h3>
                <div className="timings-grid">
                  <div className="timing-box">
                    <span className="timing-period">Morning Hours</span>
                    <span className="timing-hours">
                      {temple.darshanTimings?.morning || '06:00 AM – 12:30 PM'}
                    </span>
                  </div>
                  <div className="timing-box">
                    <span className="timing-period">Evening Hours</span>
                    <span className="timing-hours">
                      {temple.darshanTimings?.evening || '04:00 PM – 09:00 PM'}
                    </span>
                  </div>
                </div>
                {temple.darshanTimings?.specialTimings && (
                  <div className="special-timing-note">
                    <strong>Special Occasions:</strong> {temple.darshanTimings.specialTimings}
                  </div>
                )}
              </div>

              <div className="content-card">
                <h3><FaPray className="section-icon" /> Daily Rituals &amp; Poojas</h3>
                {temple.rituals && temple.rituals.length > 0 ? (
                  <div className="rituals-list">
                    {temple.rituals.map((ritual, idx) => (
                      <div className="ritual-item" key={idx}>
                        <div className="ritual-header">
                          <span className="ritual-name">{ritual.name}</span>
                          {ritual.time && <span className="ritual-time"><FaClock /> {ritual.time}</span>}
                        </div>
                        {ritual.description && (
                          <p className="ritual-desc">{ritual.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="subtle-text">Regular nitya poojas are performed morning, noon, and evening according to Agama traditions.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab Content 3: Plan Your Visit */}
          {activeTab === 'visit' && (
            <div className="tab-pane">
              <div className="content-card">
                <h3>Visitor Guidelines &amp; Temple Etiquette</h3>
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <div className="guide-icon-wrapper"><FaTshirt /></div>
                    <h4>Dress Code</h4>
                    <p>{temple.visitorGuidelines?.dressCode || 'Traditional attire recommended. Shoulders and knees must be respectfully covered.'}</p>
                  </div>

                  <div className="guideline-card">
                    <div className="guide-icon-wrapper"><FaShoePrints /></div>
                    <h4>Footwear Rules</h4>
                    <p>{temple.visitorGuidelines?.footwearRules || 'Must be deposited at temple footwear stands outside before entering.'}</p>
                  </div>

                  <div className="guideline-card">
                    <div className="guide-icon-wrapper"><FaCamera /></div>
                    <h4>Photography</h4>
                    <p>{temple.visitorGuidelines?.photographyRules || 'Photography strictly prohibited inside inner garbhagriha.'}</p>
                  </div>

                  <div className="guideline-card">
                    <div className="guide-icon-wrapper"><FaOm /></div>
                    <h4>General Behavior</h4>
                    <p>{temple.visitorGuidelines?.generalBehavior || 'Maintain peace and follow queue etiquette inside the sanctum.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Facilities */}
          {activeTab === 'facilities' && (
            <div className="tab-pane">
              <div className="content-card">
                <h3>Pilgrim Facilities &amp; Amenities</h3>
                <div className="facilities-sections">
                  <div className="facility-block">
                    <h4><FaHotel className="fac-icon" /> Accommodation</h4>
                    <ul>
                      {temple.nearbyFacilities?.accommodation && temple.nearbyFacilities.accommodation.length > 0
                        ? temple.nearbyFacilities.accommodation.map((item, i) => <li key={i}>{item}</li>)
                        : <li>Temple dharamshalas and nearby guest houses available.</li>}
                    </ul>
                  </div>

                  <div className="facility-block">
                    <h4><FaBus className="fac-icon" /> Transportation &amp; Access</h4>
                    <ul>
                      {temple.nearbyFacilities?.transportation && temple.nearbyFacilities.transportation.length > 0
                        ? temple.nearbyFacilities.transportation.map((item, i) => <li key={i}>{item}</li>)
                        : <li>Regular state transport buses, local taxis, and auto-rickshaws.</li>}
                    </ul>
                  </div>

                  <div className="facility-block">
                    <h4><FaUtensils className="fac-icon" /> Food &amp; Mahaprasadam</h4>
                    <ul>
                      {temple.nearbyFacilities?.food && temple.nearbyFacilities.food.length > 0
                        ? temple.nearbyFacilities.food.map((item, i) => <li key={i}>{item}</li>)
                        : <li>Sacred temple prasadam and pure vegetarian bhojanalayas.</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Card */}
        <aside className="detail-sidebar">
          <div className="quick-info-card">
            <h3>Quick Information</h3>
            <ul className="quick-info-list">
              <li>
                <span className="info-label">Presiding Deity:</span>
                <span className="info-val">{temple.deity}</span>
              </li>
              <li>
                <span className="info-label">State:</span>
                <span className="info-val">{temple.location?.state}</span>
              </li>
              <li>
                <span className="info-label">City:</span>
                <span className="info-val">{temple.location?.city}</span>
              </li>
              {temple.category && (
                <li>
                  <span className="info-label">Classification:</span>
                  <span className="info-val">{temple.category}</span>
                </li>
              )}
              {temple.location?.coordinates && temple.location.coordinates.lat && (
                <li>
                  <span className="info-label">Coordinates:</span>
                  <span className="info-val">
                    {temple.location.coordinates.lat.toFixed(4)}° N, {temple.location.coordinates.lng.toFixed(4)}° E
                  </span>
                </li>
              )}
            </ul>

            <button onClick={handleDirections} className="sidebar-directions-btn">
              <FaDirections /> Open in Google Maps
            </button>
          </div>

          <div className="sidebar-circuit-promo">
            <h4>Planning a Pilgrimage?</h4>
            <p>Explore curated sacred routes connecting ancient temples across Bharat.</p>
            <Link to="/circuits" className="circuit-promo-link">
              Explore Pilgrimage Circuits &rarr;
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TempleDetail;
