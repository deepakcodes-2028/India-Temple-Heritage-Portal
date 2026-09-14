import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  FaUserShield,
  FaPlus,
  FaTrash,
  FaCheck,
  FaTimes,
  FaStar,
  FaSignOutAlt,
  FaEye,
  FaSync
} from 'react-icons/fa';
import api from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAdmin, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('list');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form State for creating a temple
  const [formData, setFormData] = useState({
    name: '',
    deity: '',
    state: '',
    city: '',
    address: '',
    lat: '',
    lng: '',
    category: '12 Jyotirlingas',
    description: '',
    history: '',
    morningDarshan: '06:00 AM – 12:30 PM',
    eveningDarshan: '04:00 PM – 09:00 PM',
    dressCode: 'Traditional Indian attire. Shoulders and knees must be covered.',
    imageUrl: '',
    featured: false,
    popular: false,
    published: true,
  });

  const fetchTemples = useCallback(async () => {
    setLoading(true);
    try {
      // Query with all=true so admin sees both published and draft
      const { data } = await api.get('/temples?all=true');
      setTemples(data || []);
    } catch (err) {
      console.error('Admin fetch error', err);
      setError('Failed to fetch temples for administration.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        navigate('/admin/login');
      } else {
        fetchTemples();
      }
    }
  }, [isAdmin, authLoading, navigate, fetchTemples]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateTemple = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const payload = {
        name: formData.name,
        deity: formData.deity,
        location: {
          state: formData.state,
          city: formData.city,
          address: formData.address,
          coordinates: {
            lat: formData.lat ? parseFloat(formData.lat) : undefined,
            lng: formData.lng ? parseFloat(formData.lng) : undefined,
          },
        },
        category: formData.category,
        description: formData.description,
        history: formData.history,
        darshanTimings: {
          morning: formData.morningDarshan,
          evening: formData.eveningDarshan,
        },
        visitorGuidelines: {
          dressCode: formData.dressCode,
        },
        featured: formData.featured,
        popular: formData.popular,
        published: formData.published,
        images: formData.imageUrl ? [formData.imageUrl] : [],
        verificationStatus: 'VERIFIED',
      };

      await api.post('/temples', payload);
      setMessage(`Temple "${formData.name}" added successfully!`);
      setActiveTab('list');
      fetchTemples();
      // Reset form
      setFormData({
        name: '',
        deity: '',
        state: '',
        city: '',
        address: '',
        lat: '',
        lng: '',
        category: '12 Jyotirlingas',
        description: '',
        history: '',
        morningDarshan: '06:00 AM – 12:30 PM',
        eveningDarshan: '04:00 PM – 09:00 PM',
        dressCode: 'Traditional Indian attire. Shoulders and knees must be covered.',
        imageUrl: '',
        featured: false,
        popular: false,
        published: true,
      });
    } catch (err) {
      console.error('Failed to create temple', err);
      setError(err.response?.data?.message || 'Failed to create temple.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.delete(`/temples/${id}`);
      setMessage(`Deleted "${name}" successfully.`);
      fetchTemples();
    } catch (err) {
      console.error('Delete error', err);
      setError(err.response?.data?.message || 'Failed to delete temple.');
    }
  };

  const handleToggleFeatured = async (temple) => {
    try {
      await api.put(`/temples/${temple._id}`, {
        featured: !temple.featured,
      });
      fetchTemples();
    } catch (err) {
      console.error('Update error', err);
      setError('Failed to update featured status.');
    }
  };

  const handleTogglePublished = async (temple) => {
    try {
      await api.put(`/temples/${temple._id}`, {
        published: !temple.published,
      });
      fetchTemples();
    } catch (err) {
      console.error('Update error', err);
      setError('Failed to update publication status.');
    }
  };

  if (authLoading) {
    return <div className="admin-loading">Checking authorization...</div>;
  }

  return (
    <div className="admin-dashboard-page">
      {/* Top Banner */}
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <div className="admin-brand">
            <FaUserShield className="admin-shield-icon" />
            <div>
              <h1>Temple Yatra Admin Console</h1>
              <span className="admin-user-tag">Logged in as {user?.email}</span>
            </div>
          </div>

          <button onClick={logout} className="admin-logout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </header>

      <div className="container admin-body">
        {/* KPI Stats */}
        <section className="stats-row">
          <div className="stat-card">
            <span className="stat-title">Total Temples</span>
            <span className="stat-val">{temples.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Featured Sites</span>
            <span className="stat-val">{temples.filter((t) => t.featured).length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Published Sites</span>
            <span className="stat-val">{temples.filter((t) => t.published).length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Status</span>
            <span className="stat-val active-status">Authorized</span>
          </div>
        </section>

        {/* Action Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Manage Temples ({temples.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <FaPlus /> Add New Temple
          </button>
        </div>

        {/* Notifications */}
        {message && <div className="admin-alert success-alert">{message}</div>}
        {error && <div className="admin-alert error-alert">{error}</div>}

        {/* Tab 1: List & Manage */}
        {activeTab === 'list' && (
          <div className="admin-table-container">
            <div className="table-header-row">
              <h3>Existing Temple Heritage Records</h3>
              <button onClick={fetchTemples} className="refresh-btn">
                <FaSync /> Refresh
              </button>
            </div>

            {loading ? (
              <div className="table-loading">Loading records...</div>
            ) : temples.length === 0 ? (
              <div className="empty-table">No temples found. Click "Add New Temple" to create one.</div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Temple Name</th>
                      <th>Deity</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Featured</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {temples.map((temple) => (
                      <tr key={temple._id}>
                        <td className="temple-name-cell">
                          <strong>{temple.name}</strong>
                          <span className="slug-hint">/{temple.slug || temple._id}</span>
                        </td>
                        <td>{temple.deity}</td>
                        <td>{temple.location?.city}, {temple.location?.state}</td>
                        <td><span className="category-chip">{temple.category || 'Heritage'}</span></td>
                        <td>
                          <button
                            onClick={() => handleToggleFeatured(temple)}
                            className={`toggle-flag-btn ${temple.featured ? 'is-active' : ''}`}
                            title="Toggle featured status"
                          >
                            <FaStar /> {temple.featured ? 'Featured' : 'Regular'}
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleTogglePublished(temple)}
                            className={`toggle-status-btn ${temple.published ? 'is-published' : 'is-draft'}`}
                            title="Toggle published status"
                          >
                            {temple.published ? <FaCheck /> : <FaTimes />}
                            <span>{temple.published ? 'Live' : 'Draft'}</span>
                          </button>
                        </td>
                        <td className="actions-cell">
                          <button
                            onClick={() => window.open(`/temples/${temple.slug || temple._id}`, '_blank')}
                            className="view-action-btn"
                            title="View public page"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDelete(temple._id, temple.name)}
                            className="delete-action-btn"
                            title="Delete temple"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Add New Temple Form */}
        {activeTab === 'create' && (
          <div className="admin-form-card">
            <h3>Add New Sacred Temple</h3>
            <p className="form-subtitle">Enter verified information for the new temple entry.</p>

            <form onSubmit={handleCreateTemple} className="temple-create-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Temple Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Mahakaleshwar Jyotirlinga"
                  />
                </div>
                <div className="form-group">
                  <label>Presiding Deity *</label>
                  <input
                    type="text"
                    name="deity"
                    value={formData.deity}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Lord Shiva"
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Madhya Pradesh"
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Ujjain"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="12 Jyotirlingas">12 Jyotirlingas</option>
                    <option value="Char Dham">Char Dham</option>
                    <option value="Divya Desam">Divya Desam</option>
                    <option value="Pancha Bhoota Stalam">Pancha Bhoota Stalam</option>
                    <option value="Shakti Peetha">Shakti Peetha</option>
                    <option value="UNESCO World Heritage">UNESCO World Heritage</option>
                    <option value="Dravidian Heritage">Dravidian Heritage</option>
                    <option value="Cave & Rock-Cut">Cave &amp; Rock-Cut</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Full road and district address"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Latitude (GPS)</label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.lat}
                    onChange={handleInputChange}
                    placeholder="e.g. 23.1827"
                  />
                </div>
                <div className="form-group">
                  <label>Longitude (GPS)</label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.lng}
                    onChange={handleInputChange}
                    placeholder="e.g. 75.7682"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/temple-photo.jpg"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Morning Darshan Timings</label>
                  <input
                    type="text"
                    name="morningDarshan"
                    value={formData.morningDarshan}
                    onChange={handleInputChange}
                    placeholder="06:00 AM – 12:30 PM"
                  />
                </div>
                <div className="form-group">
                  <label>Evening Darshan Timings</label>
                  <input
                    type="text"
                    name="eveningDarshan"
                    value={formData.eveningDarshan}
                    onChange={handleInputChange}
                    placeholder="04:00 PM – 09:00 PM"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Dress Code / Visitor Guidelines</label>
                <input
                  type="text"
                  name="dressCode"
                  value={formData.dressCode}
                  onChange={handleInputChange}
                  placeholder="Traditional Indian attire required..."
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Comprehensive description of the temple..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Historical Significance &amp; Architecture</label>
                <textarea
                  name="history"
                  rows="3"
                  value={formData.history}
                  onChange={handleInputChange}
                  placeholder="Centuries of historical and architectural heritage..."
                ></textarea>
              </div>

              <div className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>Show in Featured Section</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleInputChange}
                  />
                  <span>Mark as Popular</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                  />
                  <span>Publish Immediately (Make Live)</span>
                </label>
              </div>

              <button type="submit" className="submit-temple-btn">
                Save &amp; Publish Temple Entry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
