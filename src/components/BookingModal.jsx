
import React, { useState, useEffect } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, selectedTeacher, scheduleInfo }) => {
  const [notes, setNotes] = useState('');
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNotes('');
      setBookingStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('pending');
    setErrorMessage('');
    const accessToken = localStorage.getItem('accessToken');
    const bookingData = {
      tutorId: selectedTeacher?._id,
      timeSlotId: scheduleInfo?.id,
      notes: notes,
    };
    if (!bookingData.tutorId || !bookingData.timeSlotId) {
      setErrorMessage('Thông tin giáo viên hoặc lịch học không hợp lệ.');
      setBookingStatus('error');
      return;
    }
    if (!accessToken) {
      setErrorMessage('Bạn cần đăng nhập để đặt lịch.');
      setBookingStatus('error');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/bookings/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Đặt lịch không thành công. Vui lòng thử lại.');
      }
      setBookingStatus('success');
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      setErrorMessage(err.message);
      setBookingStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {bookingStatus !== 'success' ? (
          <>
            <div className="modal-header">
              <h2>Xác nhận lịch học thử</h2>
              {selectedTeacher && (
                <div className="selected-teacher">
                  <img src={selectedTeacher.avatarUrl || selectedTeacher.avatar} alt={selectedTeacher.name} />
                  <div>
                    <h3>{selectedTeacher.name}</h3>
                    <p>Giáo viên</p>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="booking-form">
              {scheduleInfo && (
                <div className="booking-summary-info">
                  <h4>Thông tin buổi học:</h4>
                  <p><strong>Ngày:</strong> {scheduleInfo.day}</p>
                  <p><strong>Giờ:</strong> {scheduleInfo.time}</p>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="notes">Ghi chú (tùy chọn)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mục tiêu học tập, trình độ hiện tại, yêu cầu đặc biệt..."
                  rows="3"
                />
              </div>
              {bookingStatus === 'error' && <p className="error-message">{errorMessage}</p>}
              <button
                type="submit"
                className="submit-btn"
                disabled={bookingStatus === 'pending'}
              >
                {bookingStatus === 'pending' ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Đặt lịch thành công!</h2>
            <p>Chúng tôi đã nhận được yêu cầu của bạn. Giáo viên sẽ sớm liên hệ để xác nhận.</p>
            <div className="booking-summary">
              <h4>Thông tin đặt lịch:</h4>
              <p><strong>Giáo viên:</strong> {selectedTeacher?.name}</p>
              <p><strong>Ngày:</strong> {scheduleInfo?.day}</p>
              <p><strong>Giờ:</strong> {scheduleInfo?.time}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;