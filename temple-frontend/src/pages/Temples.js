import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaFilter, FaUndo } from 'react-icons/fa';
import api from '../services/api';
import './Temples.css';

const Temples = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [stateFilter, setStateFilter] = useState(searchParams.get('state') || '');
  const [deityFilter, setDeityFilter] = useState(searchParams.get('deity') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');

  const fetchTemples = useCallback(async (paramsObj = {}) => {
    setLoading(true);
    setError('');
    try {
      const queryParams = {
        search: paramsObj.search !== undefined ? paramsObj.search : searchTerm,
        state: paramsObj.state !== undefined ? paramsObj.state : stateFilter,
        deity: paramsObj.deity !== undefined ? paramsObj.deity : deityFilter,
        category: paramsObj.category !== undefined ? paramsObj.category : categoryFilter,
      };

      // Clean empty keys
      Object.keys(queryParams).forEach((key) => {
        if (!queryParams[key]) delete queryParams[key];
      });

      const { data } = await api.get('/temples', { params: queryParams });
      setTemples(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to load temples. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, stateFilter, deityFilter, categoryFilter]);

  // Sync with URL parameters on mount or when URL query changes
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlState = searchParams.get('state') || '';
    const urlDeity = searchParams.get('deity') || '';
    const urlCategory = searchParams.get('category') || '';

    setSearchTerm(urlSearch);
    setStateFilter(urlState);
    setDeityFilter(urlDeity);
    setCategoryFilter(urlCategory);

    fetchTemples({
      search: urlSearch,
      state: urlState,
      deity: urlDeity,
      category: urlCategory,
    });
  }, [searchParams, fetchTemples]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newParams = {};
    if (searchTerm) newParams.search = searchTerm;
    if (stateFilter) newParams.state = stateFilter;
    if (deityFilter) newParams.deity = deityFilter;
    if (categoryFilter) newParams.category = categoryFilter;
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStateFilter('');
    setDeityFilter('');
    setCategoryFilter('');
    setSearchParams({});
  };

  const stateOptions = [
    'Tamil Nadu',
    'Uttar Pradesh',
    'Uttarakhand',
    'Andhra Pradesh',
    'Gujarat',
    'Odisha',
    'Maharashtra',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Punjab',
    'Rajasthan',
  ];

  const deityOptions = [
    'Shiva',
    'Vishnu',
    'Venkateswara (Balaji)',
    'Devi / Shakti / Meenakshi',
    'Ganesha',
    'Murugan',
    'Surya (Sun God)',
    'Jagannath',
  ];

  const categoryOptions = [
    '12 Jyotirlingas',
    'Char Dham',
    'Divya Desam',
    'Pancha Bhoota Stalam',
    'Shakti Peetha',
    'UNESCO World Heritage',
    'Dravidian Heritage',
    'Cave & Rock-Cut',
  ];

  return (
    <div className="temples-page">
      <div className="discovery-header">
        <span className="discovery-subtitle">Temple Heritage Directory</span>
        <h1>Discover Sacred Temples of India</h1>
        <p>Explore ancient sanctums by historical deity, state, pilgrimage circuit, or name</p>
      </div>

      <div className="container discovery-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="sidebar-title-row">
            <h3><FaFilter className="filter-icon" /> Filters</h3>
            {(searchTerm || stateFilter || deityFilter || categoryFilter) && (
              <span className="filter-count-badge">Active</span>
            )}
          </div>

          <form onSubmit={handleFilterSubmit}>
            <div className="filter-group">
              <label htmlFor="search-input">Search Name or Description</label>
              <div className="input-with-icon">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search temples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="state-select">State</label>
              <select
                id="state-select"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
              >
                <option value="">All States</option>
                {stateOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="deity-select">Deity</label>
              <select
                id="deity-select"
                value={deityFilter}
                onChange={(e) => setDeityFilter(e.target.value)}
              >
                <option value="">All Deities</option>
                {deityOptions.map((dt) => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="category-select">Pilgrimage Circuit / Category</label>
              <select
                id="category-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="apply-btn">
              <FaSearch /> Apply Filters
            </button>
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearFilters}
            >
              <FaUndo /> Reset All
            </button>
          </form>
        </aside>

        {/* Results Main Section */}
        <main className="results-main">
          <div className="results-status-bar">
            <span className="results-count">
              Showing <strong>{temples.length}</strong> sanctified destination{temples.length === 1 ? '' : 's'}
            </span>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Exploring sacred records...</p>
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button onClick={() => fetchTemples()} className="retry-btn">
                Retry Connection
              </button>
            </div>
          ) : temples.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏛️</div>
              <h3>No temples found</h3>
              <p>No destinations match your current filter selection. Try clearing or broadening your criteria.</p>
              <button className="clear-filter-inline" onClick={handleClearFilters}>
                Clear Search Filters
              </button>
            </div>
          ) : (
            <div className="temple-grid">
              {temples.map((temple) => (
                <article className="temple-card" key={temple._id}>
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
                        ? temple.description.length > 120
                          ? `${temple.description.substring(0, 120)}...`
                          : temple.description
                        : 'Sacred heritage temple of spiritual excellence.'}
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
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Temples;

