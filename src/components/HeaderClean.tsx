import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <div style={headerContentStyles}>
          {/* Logo */}
          <div style={logoSectionStyles}>
            <Link to="/" style={logoLinkStyles}>
              <div style={logoIconStyles}>
                <span style={logoTextStyles}>SHRM</span>
              </div>
              <div style={logoSubtextStyles}>
                <span>Safe Haven Restoration Ministries</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav style={desktopNavStyles}>
            <ul style={navListStyles}>
              <li>
                <Link 
                  to="/" 
                  style={{
                    ...navLinkStyles,
                    ...(isActiveLink('/') ? activeLinkStyles : {})
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  style={{
                    ...navLinkStyles,
                    ...(isActiveLink('/about') ? activeLinkStyles : {})
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  style={{
                    ...navLinkStyles,
                    ...(isActiveLink('/services') ? activeLinkStyles : {})
                  }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  style={{
                    ...navLinkStyles,
                    ...(isActiveLink('/contact') ? activeLinkStyles : {})
                  }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/appointments" style={ctaButtonStyles}>
                  📅 Book Appointment
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            style={mobileMenuButtonStyles}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div style={{
              ...hamburgerLineStyles,
              transform: isMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
            }}></div>
            <div style={{
              ...hamburgerLineStyles,
              opacity: isMenuOpen ? '0' : '1'
            }}></div>
            <div style={{
              ...hamburgerLineStyles,
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
            }}></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav style={mobileNavStyles}>
            <ul style={mobileNavListStyles}>
              <li>
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    ...mobileNavLinkStyles,
                    ...(isActiveLink('/') ? mobileActiveLinkStyles : {})
                  }}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    ...mobileNavLinkStyles,
                    ...(isActiveLink('/about') ? mobileActiveLinkStyles : {})
                  }}
                >
                  ℹ️ About
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    ...mobileNavLinkStyles,
                    ...(isActiveLink('/services') ? mobileActiveLinkStyles : {})
                  }}
                >
                  💚 Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    ...mobileNavLinkStyles,
                    ...(isActiveLink('/contact') ? mobileActiveLinkStyles : {})
                  }}
                >
                  📧 Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/appointments" 
                  onClick={() => setIsMenuOpen(false)}
                  style={mobileCtaStyles}
                >
                  📅 Book Appointment
                </Link>
              </li>
            </ul>
            
            {/* Emergency Contact */}
            <div style={emergencyContactStyles}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                24/7 Crisis Support
              </p>
              <a 
                href="tel:5551234567" 
                style={emergencyPhoneStyles}
              >
                (555) 123-4567
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Styles
const headerStyles: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

const containerStyles: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const headerContentStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 0',
};

const logoSectionStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const logoLinkStyles: React.CSSProperties = {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const logoIconStyles: React.CSSProperties = {
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(14, 165, 233, 0.3)',
};

const logoTextStyles: React.CSSProperties = {
  color: 'white',
  fontSize: '20px',
  fontWeight: 'bold',
};

const logoSubtextStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const desktopNavStyles: React.CSSProperties = {
  display: 'none',
  // Responsive styles should be handled via CSS classes or a CSS-in-JS library
};

const navListStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const navLinkStyles: React.CSSProperties = {
  padding: '8px 16px',
  textDecoration: 'none',
  color: '#374151',
  fontWeight: '500',
  borderRadius: '8px',
  transition: 'all 0.2s',
  fontSize: '14px',
};

const activeLinkStyles: React.CSSProperties = {
  color: '#0ea5e9',
  backgroundColor: '#eff6ff',
};

const ctaButtonStyles: React.CSSProperties = {
  padding: '10px 20px',
  background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '14px',
  boxShadow: '0 4px 8px rgba(14, 165, 233, 0.3)',
  transition: 'all 0.2s',
};

const mobileMenuButtonStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  background: '#f9fafb',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  gap: '4px',
  // Responsive styles should be handled via CSS classes or a CSS-in-JS library
};

const hamburgerLineStyles: React.CSSProperties = {
  width: '20px',
  height: '2px',
  backgroundColor: '#374151',
  transition: 'all 0.3s',
  transformOrigin: 'center',
};

const mobileNavStyles: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderRadius: '16px',
  margin: '16px 8px',
  padding: '24px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
};

const mobileNavListStyles: React.CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const mobileNavLinkStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  textDecoration: 'none',
  color: '#374151',
  borderRadius: '12px',
  transition: 'all 0.2s',
  fontWeight: '500',
};

const mobileActiveLinkStyles: React.CSSProperties = {
  backgroundColor: '#dbeafe',
  color: '#1d4ed8',
};

const mobileCtaStyles: React.CSSProperties = {
  ...mobileNavLinkStyles,
  background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
  color: 'white',
  fontWeight: '600',
  justifyContent: 'center',
  marginTop: '16px',
  paddingTop: '16px',
  borderTop: '1px solid #e2e8f0',
};

const emergencyContactStyles: React.CSSProperties = {
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: '1px solid #e2e8f0',
  textAlign: 'center',
};

const emergencyPhoneStyles: React.CSSProperties = {
  color: '#0ea5e9',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
};

export default Header;