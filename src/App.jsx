import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import TeacherDetail from './pages/TeacherDetail';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import Pricing from './pages/Pricing';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedScheduleInfo, setSelectedScheduleInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tự động kiểm tra trạng thái đăng nhập khi ứng dụng được tải
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Nếu có token trong localStorage, coi như người dùng đã đăng nhập
      setIsLoggedIn(true);
    }
  }, []); // Mảng rỗng đảm bảo hook này chỉ chạy một lần lúc đầu

  const handleTeacherClick = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setCurrentPage('teacher-detail');
  };

  const handleBookingClick = (teacher, scheduleInfo) => {
    setSelectedTeacher(teacher);
    setSelectedScheduleInfo(scheduleInfo);
    setShowBookingModal(true);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  // Hàm quản lý logic đăng xuất tập trung tại đây
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Xóa token
    setIsLoggedIn(false); // Cập nhật state
    setCurrentPage('home'); // Chuyển về trang chủ
    alert('Bạn đã đăng xuất thành công.'); // Thông báo (tùy chọn)
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setShowBookingModal={setShowBookingModal} />;
      case 'teachers':
        return <Teachers onTeacherClick={handleTeacherClick} />;
      case 'teacher-detail':
        return (
          <TeacherDetail
            teacherId={selectedTeacherId}
            onBookingClick={handleBookingClick}
            onBack={() => {
              setCurrentPage('teachers');
              setSelectedTeacherId(null);
            }}
          />
        );
      case 'auth':
        return <Auth onBack={() => setCurrentPage('home')} onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        // Bảo vệ route: Nếu chưa đăng nhập mà cố vào dashboard thì về trang chủ
        return isLoggedIn ? <StudentDashboard onNavigate={handleNavigation} onBack={() => setCurrentPage('home')} /> : <Home />;
      case 'pricing':
        return <Pricing onBack={() => setCurrentPage('home')} onBookingClick={handleBookingClick} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setShowBookingModal={setShowBookingModal} />;
    }
  }

  return (
    <div className="app">
      {/* Truyền isLoggedIn và hàm onLogout xuống Navbar */}
      {/* Xóa prop setIsLoggedIn không cần thiết */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {renderCurrentPage()}
      </main>

      <Footer />

      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          selectedTeacher={selectedTeacher}
          scheduleInfo={selectedScheduleInfo}
        />
      )}
    </div>
  )
}

export default App;