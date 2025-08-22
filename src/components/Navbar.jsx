
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage, isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <h2>EnglishTutor</h2>
        </div>
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <a
              href="#"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a
              href="#"
              className={currentPage === 'teachers' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick('teachers'); }}
            >
              Giáo viên
            </a>
          </li>
          <li>
            <a
              href="#"
              className={currentPage === 'pricing' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick('pricing'); }}
            >
              Bảng giá
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a
                  href="#"
                  className={currentPage === 'dashboard' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick('dashboard'); }}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="logout-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </a>
              </li>
            </>
          ) : (
            <li>
              <a
                href="#"
                className={`auth-btn ${currentPage === 'auth' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('auth'); }}
              >
                Đăng nhập
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;