import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaOm, FaLandmark, FaArrowRight } from 'react-icons/fa';
import api from '../services/api';
import './Festivals.css';

const Festivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/festivals');
        setFestivals(data || []);
      } catch (err) {
        console.error('Failed to load festivals', err);
        setError('Unable to load festival calendar. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchFestivals();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="festivals-page">
      <div className="festivals-header">
        <span className="festivals-badge"><FaOm /> Celestial Utsavams</span>
        <h1>Sacred Temple Festivals of India</h1>
        <p>Explore celestial brahmotsavams, chariot processions, and festive rituals across sacred Bharat</p>
      </div>

      <div className="container festivals-container">
        {loading ? (
          <div className="festivals-loading">
            <div className="spinner"></div>
            <p>Loading festival calendar...</p>
          </div>
        ) : error ? (
          <div className="festivals-error">
            <p>{error}</p>
          </div>
        ) : festivals.length === 0 ? (
          <div className="empty-festivals">
            <div className="empty-icon">🪔</div>
            <h3>Festivals calendar updating</h3>
            <p>Check back later for newly added festival dates and celebrations.</p>
          </div>
        ) : (
          <div className="festivals-grid">
            {festivals.map((fest) => (
              <article className="festival-card" key={fest._id}>
                <div className="festival-header-strip">
                  <span className="period-badge">
                    <FaCalendarAlt /> {fest.period}
                  </span>
                  <h2>{fest.name}</h2>
                </div>

                <div className="festival-body">
                  <div className="festival-info-group">
                    <h4>Significance</h4>
                    <p>{fest.significance || 'Celebrated with deep devotion across sacred shrines.'}</p>
                  </div>

                  <div className="festival-info-group">
                    <h4>Description &amp; Observance</h4>
                    <p>{fest.description}</p>
                  </div>

                  {fest.associatedTemples && fest.associatedTemples.length > 0 && (
                    <div className="associated-temples-group">
                      <h4><FaLandmark className="temple-icon" /> Major Participating Temples:</h4>
                      <div className="temple-links-wrap">
                        {fest.associatedTemples.map((t) => (
                          <Link
                            key={t._id}
                            to={`/temples/${t._id}`}
                            className="fest-temple-chip"
                          >
                            <span>{t.name}</span>
                            <FaArrowRight className="chip-arrow" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Festivals;
