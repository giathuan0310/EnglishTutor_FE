import React, { useState, useEffect, useMemo } from 'react';
import './TeacherDetail.css';

// --- HÀM HỖ TRỢ ---
const getEmbedUrl = (url) => {
  if (!url) return '';
  try {
    const videoId = new URL(url).searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  } catch (error) {
    console.error('Invalid video URL:', url);
    return '';
  }
};

const formatPrice = (price) => {
  if (typeof price !== 'number') return '';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// --- COMPONENT CHÍNH ---
const TeacherDetail = ({ teacherId, onBookingClick, onBack }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // <-- THAY ĐỔI 1: Gộp state để lưu cả ID của slot
  const [selectedSlot, setSelectedSlot] = useState(null); // Sẽ là object { day, time, id }

  useEffect(() => {
    if (!teacherId) return;

    const fetchTeacherDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://englishtutor-be.onrender.com/tutors/${teacherId}`);
        if (!response.ok) {
          throw new Error(`Không tìm thấy giáo viên với ID: ${teacherId}`);
        }
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetail();
  }, [teacherId]);

  // <-- THAY ĐỔI 2: Xử lý lịch trống để lấy cả ID
  const availableSchedule = useMemo(() => {
    if (!teacher?.availability) return [];

    const availableSlots = teacher.availability.filter(slot => slot.status === 'available');

    const groupedByDay = availableSlots.reduce((acc, slot) => {
      const date = new Date(slot.startTime);
      const dayKey = date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }
      // Lưu một object chứa cả giờ và ID của slot, thay vì chỉ chuỗi giờ
      acc[dayKey].push({ time, id: slot._id });
      return acc;
    }, {});

    return Object.entries(groupedByDay).map(([day, times]) => ({ day, times }));
  }, [teacher]);

  // <-- THAY ĐỔI 4: Cập nhật hàm xử lý đặt lịch
  const handleBooking = () => {
    if (selectedSlot) {
      // Truyền cả object giáo viên và object lịch đã chọn (chứa id) lên component App
      onBookingClick(teacher, selectedSlot);
    } else {
      // Bắt buộc người dùng phải chọn giờ
      alert("Vui lòng chọn một khung giờ học thử trước khi đặt lịch.");
    }
  };

  // --- CÁC TRẠNG THÁI RENDER ---
  if (loading) {
    return <div className="teacher-detail-status"><h2>Đang tải thông tin giáo viên...</h2></div>;
  }
  if (error) {
    return <div className="teacher-detail-status"><h2>Lỗi: {error}</h2><button className="back-btn" onClick={onBack}>← Quay lại</button></div>;
  }
  if (!teacher) {
    return null;
  }

  // --- RENDER GIAO DIỆN CHÍNH ---
  return (
    <div className="teacher-detail">
      <button className="back-btn" onClick={onBack}>
        ← Quay lại danh sách
      </button>

      {/* Phần header và thông tin giáo viên không thay đổi */}
      <div className="teacher-header">
        <div className="teacher-basic-info">
          <img src={teacher.avatarUrl} alt={teacher.name} className="teacher-avatar-large" />
          <div className="teacher-main-info">
            <h1>{teacher.name}</h1>
            <div className="teacher-specialty">{teacher.specializations.join(', ')}</div>
            <div className="teacher-experience">{teacher.experienceYears} năm kinh nghiệm</div>
            <div className="teacher-rating">
              <span className="rating-stars">{"★".repeat(Math.floor(teacher.rating))}</span>
              <span className="rating-number">{teacher.rating || 'Mới'}</span>
              {/* Lưu ý: API hiện tại không có dữ liệu về số lượng reviews */}
            </div>
            <div className="teacher-price">{formatPrice(teacher.pricePerHour)}/giờ</div>
          </div>
        </div>

        <div className="teacher-video">
          <h3>Video giới thiệu</h3>
          <div className="video-container">
            <iframe
              src={teacher.videoUrl}
              title={`Video giới thiệu ${teacher.name}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="teacher-content">
        <div className="teacher-info-section">
          <div className="description-section">
            <h3>Giới thiệu</h3>
            <p>{teacher.bio}</p>
          </div>

          <div className="qualifications-section">
            <h3>Bằng cấp & Chứng chỉ</h3>
            <ul className="qualifications-list">
              {teacher.certifications?.map((cert, index) => (
                <li key={index}>
                  {cert.name}
                  {cert.issuingOrganization && ` - ${cert.issuingOrganization}`}
                </li>
              ))}
            </ul>
          </div>

          <div className="teaching-areas-section">
            <h3>Chuyên môn giảng dạy</h3>
            <div className="teaching-areas">
              {teacher.specializations?.map((area, index) => (
                <span key={index} className="teaching-area-tag">{area}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-section">
          <div className="schedule-section">
            <h3>Lịch trống</h3>
            <div className="available-slots">
              {availableSchedule.length > 0 ? availableSchedule.map((dayGroup, index) => (
                <div key={index} className="day-slot">
                  <h4>{dayGroup.day}</h4>
                  <div className="time-slots">
                    {/* <-- THAY ĐỔI 3: Cập nhật JSX cho việc chọn lịch --> */}
                    {dayGroup.times.map((timeSlot) => (
                      <button
                        key={timeSlot.id} // Dùng id làm key cho ổn định
                        className={`time-slot ${selectedSlot?.id === timeSlot.id ? 'selected' : ''}`}
                        onClick={() => {
                          // Lưu cả object slot vào state
                          setSelectedSlot({ day: dayGroup.day, time: timeSlot.time, id: timeSlot.id });
                        }}
                      >
                        {timeSlot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )) : <p>Giáo viên chưa cập nhật lịch trống.</p>}
            </div>
          </div>

          <div className="booking-actions">
            <button
              className="book-trial-btn primary-btn"
              onClick={handleBooking}
              disabled={!selectedSlot} // Vô hiệu hóa nút nếu chưa chọn slot
            >
              Đặt lịch học thử miễn phí
            </button>
            <p className="booking-note">
              {selectedSlot
                ? `Đã chọn: ${selectedSlot.time} - ${selectedSlot.day}`
                : "Chọn thời gian phù hợp để đặt lịch học thử"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;