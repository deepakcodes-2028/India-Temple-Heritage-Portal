import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Temples from './pages/Temples';
import TempleDetail from './pages/TempleDetail';
import Circuits from './pages/Circuits';
import Festivals from './pages/Festivals';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/temples" element={<Temples />} />
              <Route path="/temples/:id" element={<TempleDetail />} />
              <Route path="/circuits" element={<Circuits />} />
              <Route path="/festivals" element={<Festivals />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/login" element={<Navigate to="/admin/login" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;


