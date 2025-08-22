import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EnglishTutor</h3>
            <p>Nền tảng học tiếng Anh 1-1 hàng đầu với đội ngũ giáo viên chất lượng cao.</p>
          </div>
          
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>📞 Hotline: 0982-xxx-xxx</p>
            <p>📧 Email: 123@gmail.com</p>
            <p>📍 Địa chỉ: 129/62 Nguyễn Văn Nghi, Gò Vấp, TP.HCM</p>
          </div>
          
          <div className="footer-section">
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">YouTube</a>
              <a href="#" className="social-link">TikTok</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EnglishTutor. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
