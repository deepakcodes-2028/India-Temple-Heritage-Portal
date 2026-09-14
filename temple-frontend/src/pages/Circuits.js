import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaRoute, FaArrowRight, FaOm } from 'react-icons/fa';
import api from '../services/api';
import './Circuits.css';

const Circuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCircuits = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/pilgrimage-circuits');
        setCircuits(data || []);
      } catch (err) {
        console.error('Failed to load pilgrimage circuits', err);
        setError('Unable to load pilgrimage circuits. Please check backend connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchCircuits();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="circuits-page">
      <div className="circuits-header">
        <span className="circuits-badge"><FaOm /> Sacred Yatras</span>
        <h1>Iconic Pilgrimage Circuits of India</h1>
        <p>Follow timeless spiritual paths established by ancient rishis and acharyas across sacred Bharat</p>
      </div>

      <div className="container circuits-container">
        {loading ? (
          <div className="circuits-loading">
            <div className="spinner"></div>
            <p>Loading pilgrimage routes...</p>
          </div>
        ) : error ? (
          <div className="circuits-error">
            <p>{error}</p>
          </div>
        ) : circuits.length === 0 ? (
          <div className="empty-circuits">
            <div className="empty-icon">🗺️</div>
            <h3>Pilgrimage circuits coming soon</h3>
            <p>New sacred routes are currently being documented.</p>
          </div>
        ) : (
          <div className="circuits-grid">
            {circuits.map((circuit) => (
              <div className="circuit-card" key={circuit._id}>
                <div className="circuit-card-header">
                  <span className="circuit-region-badge">
                    <FaMapMarkedAlt /> {circuit.region}
                  </span>
                  <h2>{circuit.name}</h2>
                </div>

                <div className="circuit-card-body">
                  <p className="circuit-desc">{circuit.description}</p>

                  {circuit.suggestedOrder && circuit.suggestedOrder.length > 0 && (
                    <div className="suggested-order-section">
                      <h4><FaRoute className="route-icon" /> Suggested Sequence of Shrines:</h4>
                      <ol className="order-list">
                        {circuit.suggestedOrder.map((step, idx) => (
                          <li key={idx}>
                            <span className="step-num">{idx + 1}</span>
                            <span className="step-text">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {circuit.temples && circuit.temples.length > 0 && (
                    <div className="covered-temples-section">
                      <h4>Temples in this Yatra:</h4>
                      <div className="temple-tags">
                        {circuit.temples.map((t) => (
                          <Link
                            key={t._id}
                            to={`/temples/${t._id}`}
                            className="temple-chip-link"
                          >
                            <span>{t.name}</span>
                            <FaArrowRight className="tag-arrow" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="circuit-card-footer">
                  <Link to="/temples" className="explore-all-link">
                    Explore Included Temples &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Circuits;
