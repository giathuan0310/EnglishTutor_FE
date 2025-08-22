import React, { useState, useMemo, useEffect } from 'react';
// Xóa import dữ liệu tĩnh: import { teachersData } from '../data/teachers';
import './Teachers.css';

const Teachers = ({ setShowBookingModal, setSelectedTeacher, onTeacherClick }) => {
  // --- STATE QUẢN LÝ DỮ LIỆU TỪ API ---
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- STATE CHO BỘ LỌC VÀ TÌM KIẾM (giữ nguyên) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // --- GỌI API ĐỂ LẤY DỮ LIỆU GIÁO VIÊN ---
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('https://englishtutor-be.onrender.com/tutors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeachersData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần khi component mount

  // --- CẬP NHẬT LOGIC ĐỂ LẤY DANH SÁCH CHUYÊN NGÀNH DUY NHẤT TỪ DỮ LIỆU API ---
  const specialties = useMemo(() => {
    const allSpecialties = teachersData.flatMap(teacher => teacher.specializations);
    return [...new Set(allSpecialties)];
  }, [teachersData]);

  // --- CẬP NHẬT LOGIC LỌC VÀ SẮP XẾP VỚI CẤU TRÚC DỮ LIỆU MỚI ---
  const filteredTeachers = useMemo(() => {
    let filtered = teachersData.filter(teacher => {
      // Tìm kiếm theo tên, chuyên ngành hoặc bio
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specializations.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.bio.toLowerCase().includes(searchTerm.toLowerCase());

      // Lọc theo chuyên ngành (kiểm tra trong mảng specializations)
      const matchesSpecialty = !selectedSpecialty || teacher.specializations.includes(selectedSpecialty);

      // Lọc theo khoảng giá (sử dụng pricePerHour là kiểu số)
      let matchesPrice = true;
      if (priceRange) {
        const price = teacher.pricePerHour;
        switch (priceRange) {
          case 'low':
            matchesPrice = price < 300000;
            break;
          case 'medium':
            matchesPrice = price >= 300000 && price <= 350000;
            break;
          case 'high':
            matchesPrice = price > 350000;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesSpecialty && matchesPrice;
    });

    // Sắp xếp
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.pricePerHour - b.pricePerHour;
        case 'price-high':
          return b.pricePerHour - a.pricePerHour;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSpecialty, priceRange, sortBy, teachersData]);

  const handleBookingClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowBookingModal(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setPriceRange('');
    setSortBy('rating');
  };

  // --- RENDER TRẠNG THÁI LOADING VÀ LỖI ---
  if (loading) {
    return <div className="container"><h2>Đang tải danh sách giáo viên...</h2></div>;
  }

  if (error) {
    return <div className="container"><h2>Lỗi: {error}</h2><p>Không thể tải dữ liệu giáo viên. Vui lòng thử lại sau.</p></div>;
  }

  return (
    <div className="teachers">
      <div className="container">
        {/* Header và Filters giữ nguyên */}
        <div className="teachers-header">
          <h1>Đội ngũ giáo viên chất lượng</h1>
          <p>Chọn giáo viên phù hợp với mục tiêu học tập của bạn</p>
        </div>

        <div className="teachers-filters">
          {/* Phần JSX của bộ lọc không thay đổi */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm giáo viên theo tên, chuyên ngành..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Chuyên ngành:</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="filter-select"
              >
                <option value="">Tất cả chuyên ngành</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Khoảng giá:</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-select"
              >
                <option value="">Tất cả mức giá</option>
                <option value="low">Dưới 300.000 VNĐ</option>
                <option value="medium">300.000 - 350.000 VNĐ</option>
                <option value="high">Trên 350.000 VNĐ</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="rating">Đánh giá cao nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="clear-filters-btn"
            >
              Xóa bộ lọc
            </button>
          </div>

          <div className="results-info">
            <span>Tìm thấy {filteredTeachers.length} giáo viên phù hợp</span>
          </div>
        </div>

        {/* --- CẬP NHẬT PHẦN HIỂN THỊ DANH SÁCH GIÁO VIÊN --- */}
        <div className="teachers-grid">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              // Sử dụng _id từ API làm key
              <div key={teacher._id} className="teacher-card">
                <div className="teacher-avatar">
                  {/* Sử dụng avatarUrl */}
                  <img src={teacher.avatarUrl} alt={teacher.name} />
                  <div className="rating">
                    <span>⭐ {teacher.rating || 'Mới'}</span>
                  </div>
                </div>

                <div className="teacher-info">
                  <h3>{teacher.name}</h3>
                  {/* Hiển thị mảng specializations */}
                  <div className="specialty">{teacher.specializations.join(', ')}</div>
                  {/* Sử dụng experienceYears */}
                  <div className="experience">{teacher.experienceYears} năm kinh nghiệm</div>
                  {/* Sử dụng bio */}
                  <p className="description">{teacher.bio}</p>
                  {/* Định dạng lại pricePerHour */}
                  <div className="price">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(teacher.pricePerHour)}/giờ
                  </div>
                </div>

                <div className="teacher-actions">
                  <button
                    className="view-profile-btn"
                    onClick={() => onTeacherClick(teacher._id)} // Chỉ truyền đi ID của giáo viên
                  >
                    Xem chi tiết
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">😔</div>
              <h3>Không tìm thấy giáo viên phù hợp</h3>
              <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
              <button onClick={clearFilters} className="reset-filters-btn">
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Phần CTA giữ nguyên */}
        <div className="teachers-cta">
          <h2>Không tìm thấy giáo viên phù hợp?</h2>
          <p>Liên hệ với chúng tôi để được tư vấn và giới thiệu giáo viên phù hợp nhất</p>
          <button className="contact-btn">Liên hệ tư vấn</button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
