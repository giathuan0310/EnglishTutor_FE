import React, { useState, useEffect } from 'react';
import './Pricing.css';

// Dữ liệu tĩnh cho giao diện (giữ nguyên)
const staticPackageData = {
  10: {
    originalPrice: 3500000,
    discount: "Tiết kiệm 300.000đ",
    popular: false,
    benefits: [
      "10 buổi học 1-1 với giáo viên",
      "Lịch học linh hoạt",
      "Tài liệu học tập miễn phí",
      "Hỗ trợ trực tuyến 24/7",
      "Đánh giá trình độ đầu vào"
    ]
  },
  20: {
    originalPrice: 7000000,
    discount: "Tiết kiệm 1.000.000đ",
    popular: true,
    benefits: [
      "20 buổi học 1-1 với giáo viên",
      "Lịch học linh hoạt",
      "Tài liệu học tập miễn phí",
      "Hỗ trợ trực tuyến 24/7",
      "Đánh giá trình độ đầu vào",
      "Báo cáo tiến độ hàng tuần",
      "1 buổi học nhóm miễn phí/tuần"
    ]
  },
  50: {
    originalPrice: 17500000,
    discount: "Tiết kiệm 4.000.000đ",
    popular: false,
    benefits: [
      "50 buổi học 1-1 với giáo viên",
      "Lịch học linh hoạt",
      "Tài liệu học tập miễn phí",
      "Báo cáo tiến độ hàng tuần",
      "Học nhóm không giới hạn",
      "Tư vấn lộ trình cá nhân hóa"
    ],
  },
  default: {
    originalPrice: 0,
    discount: "Ưu đãi",
    popular: false,
    benefits: ["Học 1-1 với giáo viên", "Lịch học linh hoạt"]
  }
};


const Pricing = ({ onBack, onBookingClick }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- THAY ĐỔI 1: Thêm state để quản lý quá trình mua gói ---
  const [purchasingPackageId, setPurchasingPackageId] = useState(null);

  // Fetch dữ liệu các gói học (giữ nguyên)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://englishtutor-be.onrender.com/packages');
        if (!response.ok) {
          throw new Error('Không thể tải danh sách gói học.');
        }
        const apiPackages = await response.json();
        const enhancedPackages = apiPackages.map(apiPackage => {
          const staticData = staticPackageData[apiPackage.totalSessions] || staticPackageData.default;
          const pricePerLesson = apiPackage.price / apiPackage.totalSessions;
          return {
            ...apiPackage,
            ...staticData,
            pricePerLesson: `${Math.round(pricePerLesson / 1000) * 1000 .toLocaleString()}đ/buổi`,
          };
        });
        setPackages(enhancedPackages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // --- THAY ĐỔI 2: Viết lại hàm xử lý mua gói để gọi API ---
  const handlePurchase = async (plan) => {
    // 1. Lấy access token
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('Vui lòng đăng nhập để thực hiện chức năng này.');
      return;
    }

    setPurchasingPackageId(plan._id); // Bắt đầu trạng thái loading cho nút này

    try {
      // 2. Gọi API để mua gói
      const response = await fetch('https://englishtutor-be.onrender.com/users/purchase-package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ packageId: plan._id }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Nếu có lỗi từ server, ném ra lỗi để bắt ở dưới
        throw new Error(result.message || 'Mua gói học không thành công.');
      }

      // 3. Xử lý khi thành công
      alert(`Bạn đã mua thành công "${plan.name}"! Vui lòng kiểm tra thông tin trong trang cá nhân.`);
      // Tùy chọn: có thể cập nhật lại thông tin user ở đây hoặc điều hướng
      // Ví dụ: onBack();

    } catch (err) {
      // 4. Xử lý khi có lỗi
      console.error("Purchase Error:", err);
      alert(`Đã xảy ra lỗi: ${err.message}`);
    } finally {
      // 5. Dù thành công hay thất bại, luôn reset trạng thái loading
      setPurchasingPackageId(null);
    }
  };

  if (loading) {
    return <div className="pricing-container"><h2>Đang tải bảng giá...</h2></div>;
  }
  if (error) {
    return <div className="pricing-container"><h2>Lỗi: {error}</h2></div>;
  }

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        <button className="back-btn" onClick={onBack}>
          ← Quay lại
        </button>

        <div className="pricing-header">
          <h1>Chọn gói học phù hợp với bạn</h1>
          <p>Đầu tư cho tương lai - Thành thạo tiếng Anh chỉ trong vài tháng</p>
        </div>

        <div className="pricing-plans">
          <h2>Bảng giá các gói học</h2>
          <div className="plans-grid">
            {packages.map(plan => (
              <div key={plan._id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Phổ biến nhất</div>}

                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="original-price">{plan.originalPrice.toLocaleString()}đ</span>
                    <span className="current-price">{plan.price.toLocaleString()}đ</span>
                    <span className="price-per-lesson">{plan.pricePerLesson}</span>
                  </div>
                  <div className="discount-badge">{plan.discount}</div>
                </div>

                <div className="plan-description">
                  <p>{plan.description}</p>
                </div>

                <div className="plan-benefits">
                  <ul>
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                {/* --- THAY ĐỔI 3: Cập nhật lại nút bấm --- */}
                <button
                  className={`select-plan-btn ${plan.popular ? 'popular' : ''}`}
                  onClick={() => handlePurchase(plan)}
                  // Vô hiệu hóa nút khi đang trong quá trình xử lý
                  disabled={purchasingPackageId === plan._id}
                >
                  {purchasingPackageId === plan._id ? 'Đang xử lý...' : 'Chọn gói này'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;