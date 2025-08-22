import React from 'react';
import './Home.css';

const Home = ({ setCurrentPage, setShowBookingModal }) => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Học tiếng Anh 1-1 với giáo viên phù hợp</h1>
            <p>Đặt lịch học thử miễn phí ngay hôm nay và trải nghiệm phương pháp học hiệu quả nhất!</p>
            <div className="hero-buttons">
              <button 
                className="cta-button primary"
                onClick={() => setCurrentPage('teachers')}
              >
                Đặt lịch học thử ngay
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => setCurrentPage('teachers')}
              >
                Xem danh sách giáo viên
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
              alt="Online English Learning"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
