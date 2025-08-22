import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

const StudentDashboard = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // State cho thông tin user
  const [studentData, setStudentData] = useState(null);
  const [studentLoading, setStudentLoading] = useState(true);

  // --- THAY ĐỔI 1: Thêm state cho danh sách buổi học ---
  const [myBookings, setMyBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // --- THAY ĐỔI 2: Fetch cả thông tin user và danh sách buổi học ---
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setApiError("Không tìm thấy token xác thực. Vui lòng đăng nhập lại.");
      setStudentLoading(false);
      setBookingsLoading(false);
      return;
    }

    // Hàm fetch thông tin user
    const fetchUser = async () => {
      try {
        const res = await fetch('https://englishtutor-be.onrender.com/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Không thể tải thông tin học viên.");
        const data = await res.json();
        setStudentData(data);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setStudentLoading(false);
      }
    };

    // Hàm fetch danh sách buổi học
    const fetchMyBookings = async () => {
      try {
        const res = await fetch('https://englishtutor-be.onrender.com/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Không thể tải lịch sử buổi học.");
        const data = await res.json();
        setMyBookings(data);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchUser();
    fetchMyBookings();
  }, []); // Mảng rỗng đảm bảo chỉ chạy 1 lần

  // --- COMPONENT TỔNG QUAN (Giữ nguyên, chỉ thêm xử lý loading/error) ---
  const renderOverview = () => {
    if (studentLoading) return <div>Đang tải thông tin học viên...</div>;
    if (!studentData) return <div>Không thể tải dữ liệu. Vui lòng thử lại.</div>;

    return (
      <div className="overview-section">
        <div className="welcome-card">
          <h2>Chào mừng trở lại, {studentData.name}!</h2>
          <p>Email: {studentData.email}</p>
          <p>Số điện thoại: {studentData.phone}</p>
        </div>
        <div className="quick-actions">
          <h3>Hành động nhanh</h3>
          <div className="action-buttons">
            <button onClick={() => onNavigate('teachers')} className="action-btn">
              <span className="action-icon">👨‍🏫</span> Tìm giáo viên
            </button>
            <button onClick={() => onNavigate('pricing')} className="action-btn">
              <span className="action-icon">💰</span> Mua thêm gói học
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- THAY ĐỔI 3: Viết lại hoàn toàn tab "My Teacher" ---
  const renderTeacher = () => {
    if (bookingsLoading) return <div>Đang tải danh sách buổi học...</div>;
    if (apiError) return <div>Lỗi: {apiError}</div>;
    if (myBookings.length === 0) {
      return (
        <div className="empty-state">
          <h2>Bạn chưa có buổi học nào</h2>
          <p>Hãy bắt đầu tìm kiếm giáo viên và đặt lịch học thử ngay hôm nay!</p>
          <button onClick={() => onNavigate('teachers')} className="action-btn">
            Tìm giáo viên ngay
          </button>
        </div>
      );
    }

    return (
      <div className="my-teacher-section">
        <h2>Các buổi học của tôi</h2>
        <div className="bookings-list">
          {myBookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="teacher-info">
                <img
                  src={booking.tutor?.avatarUrl || 'default-avatar.png'}
                  alt={booking.tutor?.name}
                  className="teacher-avatar"
                />
                <div>
                  <h4>Giáo viên: {booking.tutor?.name || 'Không xác định'}</h4>
                  <p>{booking.tutor?.specializations?.join(', ')}</p>
                </div>
              </div>
              <div className="booking-details">
                <p><strong>Ngày học:</strong> {new Date(booking.bookingDate).toLocaleDateString('vi-VN')}</p>
                <p><strong>Giờ học:</strong> {new Date(booking.bookingDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Trạng thái:</strong> <span className={`status-badge ${booking.status}`}>{booking.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- THAY ĐỔI 4: Viết lại hoàn toàn tab "Thông tin gói học" ---
  const renderPackageInfo = () => {
    if (studentLoading) return <div>Đang tải thông tin gói học...</div>;
    if (!studentData) return <div>Không thể tải dữ liệu.</div>;

    const { purchasedPackages } = studentData;

    if (!purchasedPackages || purchasedPackages.length === 0) {
      return (
        <div className="empty-state">
          <h2>Bạn chưa sở hữu gói học nào</h2>
          <p>Hãy chọn một gói học phù hợp để bắt đầu hành trình chinh phục tiếng Anh của bạn.</p>
          <button onClick={() => onNavigate('pricing')} className="action-btn">
            Xem bảng giá
          </button>
        </div>
      );
    }

    return (
      <div className="package-info-section">
        <h2>Các gói học của bạn</h2>
        <div className="packages-grid">
          {purchasedPackages.map((pkg, index) => {
            const progress = (pkg.completedSessions / pkg.totalSessions) * 100;
            return (
              <div key={index} className="package-card">
                <h3>{pkg.packageName}</h3>
                <p>Ngày mua: {new Date(pkg.purchaseDate).toLocaleDateString('vi-VN')}</p>
                <div className="progress-bar">
                  <div className="progress-label">
                    <span>Tiến độ</span>
                    <span>{pkg.completedSessions}/{pkg.totalSessions} buổi</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Phần JSX chính của component
  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <button className="back-btn" onClick={onBack}>← Quay lại trang chủ</button>
        <h1>Dashboard học viên</h1>
      </div>
      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">🏠</span> Tổng quan
          </button>
          <button
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="nav-icon">📚</span> Buổi học của tôi
          </button>
          <button
            className={`nav-item ${activeTab === 'packageInfo' ? 'active' : ''}`}
            onClick={() => setActiveTab('packageInfo')}
          >
            <span className="nav-icon">📦</span> Thông tin gói học
          </button>
        </nav>
        <main className="dashboard-main">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'history' && renderTeacher()}
          {activeTab === 'packageInfo' && renderPackageInfo()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;