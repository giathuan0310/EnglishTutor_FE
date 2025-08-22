export const pricingPlans = [
  {
    id: 1,
    name: "Gói Khởi Đầu",
    lessons: 10,
    price: 3200000,
    originalPrice: 3500000,
    discount: "Tiết kiệm 300.000đ",
    popular: false,
    benefits: [
      "10 buổi học 1-1 với giáo viên",
      "Lịch học linh hoạt",
      "Tài liệu học tập miễn phí",
      "Hỗ trợ trực tuyến 24/7",
      "Đánh giá trình độ đầu vào"
    ],
    description: "Phù hợp cho người mới bắt đầu muốn thử nghiệm phương pháp học",
    pricePerLesson: "320.000đ/buổi"
  },
  {
    id: 2,
    name: "Gói Phổ Biến",
    lessons: 20,
    price: 6000000,
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
    ],
    description: "Lựa chọn tốt nhất cho việc học đều đặn và đạt kết quả nhanh",
    pricePerLesson: "300.000đ/buổi"
  },
  {
    id: 3,
    name: "Gói Chuyên Sâu",
    lessons: 50,
    price: 13500000,
    originalPrice: 17500000,
    discount: "Tiết kiệm 4.000.000đ",
    popular: false,
    benefits: [
      "50 buổi học 1-1 với giáo viên",
      "Lịch học linh hoạt",
      "Tài liệu học tập miễn phí",
      "Hỗ trợ trực tuyến 24/7",
      "Đánh giá trình độ đầu vào",
      "Báo cáo tiến độ hàng tuần",
      "Học nhóm không giới hạn",
      "Mock test IELTS/TOEIC miễn phí",
      "Tư vấn lộ trình cá nhân hóa"
    ],
    description: "Dành cho học viên muốn đầu tư nghiêm túc và đạt mục tiêu cao",
    pricePerLesson: "270.000đ/buổi"
  }
];

export const faqData = [
  {
    question: "Tôi có thể hủy buổi học không?",
    answer: "Bạn có thể hủy buổi học trước 24 giờ mà không mất phí. Nếu hủy trong vòng 24 giờ, buổi học sẽ bị trừ vào số buổi của gói."
  },
  {
    question: "Thời hạn sử dụng gói học là bao lâu?",
    answer: "Gói 10 buổi: 3 tháng, Gói 20 buổi: 6 tháng, Gói 50 buổi: 12 tháng. Bạn có thể gia hạn thêm nếu cần thiết."
  },
  {
    question: "Tôi có thể đổi giáo viên không?",
    answer: "Có, bạn hoàn toàn có thể đổi giáo viên nếu cảm thấy không phù hợp. Chúng tôi sẽ hỗ trợ tìm giáo viên phù hợp nhất với bạn."
  },
  {
    question: "Có hỗ trợ hoàn tiền không?",
    answer: "Chúng tôi có chính sách hoàn tiền trong vòng 7 ngày đầu nếu bạn không hài lòng với chất lượng dịch vụ."
  }
];
