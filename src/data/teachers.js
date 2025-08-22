export const teachersData = [
  {
    id: 1,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8,
    detailedInfo: {
      fullDescription: "Tôi là Gia Thuận với 7 năm kinh nghiệm giảng dạy tiếng Anh thương mại. Từng làm việc tại các tập đoàn đa quốc gia, tôi hiểu rõ nhu cầu giao tiếp tiếng Anh trong môi trường công sở hiện đại.",
      qualifications: ["IELTS 8.5", "TESOL Certificate", "Business English Certification", "Cử nhân Ngôn ngữ Anh"],
      teachingAreas: ["Business English", "Interview Skills", "Presentation Skills", "Email Writing"],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      availableSlots: [
        { day: "Thứ 2", times: ["09:00", "14:00", "19:00"] },
        { day: "Thứ 3", times: ["10:00", "15:00", "20:00"] },
        { day: "Thứ 4", times: ["09:00", "14:00", "19:00"] },
        { day: "Thứ 5", times: ["10:00", "15:00", "20:00"] },
        { day: "Thứ 6", times: ["09:00", "14:00"] }
      ],
      reviews: [
        { studentName: "Minh Anh", rating: 5, comment: "Cô Thuận dạy rất hay, giúp em tự tin hơn khi giao tiếp với khách hàng nước ngoài.", date: "2024-12-15" },
        { studentName: "Văn Đức", rating: 5, comment: "Phương pháp dạy thực tế, áp dụng ngay được vào công việc.", date: "2024-12-10" },
        { studentName: "Thu Hà", rating: 4, comment: "Rất professional và kiên nhẫn với học viên.", date: "2024-12-05" }
      ]
    }
  },
  {
    id: 2,
    name: "Minh Châu",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    specialty: "IELTS Preparation",
    experience: "5 năm kinh nghiệm",
    description: "Chuyên luyện thi IELTS với phương pháp độc quyền",
    price: "400.000 VNĐ/buổi",
    rating: 4.9,
    detailedInfo: {
      fullDescription: "Với 5 năm kinh nghiệm luyện thi IELTS, tôi đã giúp hơn 200 học viên đạt band điểm mong muốn. Phương pháp giảng dạy của tôi tập trung vào việc nâng cao kỹ năng thực tế và chiến lược làm bài hiệu quả.",
      qualifications: ["IELTS 9.0", "Cambridge CELTA", "MA in Applied Linguistics"],
      teachingAreas: ["IELTS Speaking", "IELTS Writing", "Academic English", "Test Strategies"],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      availableSlots: [
        { day: "Thứ 2", times: ["08:00", "13:00", "18:00"] },
        { day: "Thứ 3", times: ["09:00", "14:00", "19:00"] },
        { day: "Thứ 4", times: ["08:00", "13:00", "18:00"] },
        { day: "Thứ 6", times: ["09:00", "14:00", "19:00"] },
        { day: "Chủ nhật", times: ["10:00", "15:00"] }
      ],
      reviews: [
        { studentName: "Hoàng Nam", rating: 5, comment: "Từ 5.5 lên 7.5 IELTS chỉ sau 3 tháng học với cô Châu!", date: "2024-12-12" },
        { studentName: "Linh Chi", rating: 5, comment: "Cô dạy writing rất chi tiết, giúp em hiểu cấu trúc bài viết.", date: "2024-12-08" }
      ]
    }
  },
  {
    id: 3,
    name: "Quốc Anh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialty: "Conversation & Pronunciation",
    experience: "6 năm kinh nghiệm",
    description: "Chuyên phát âm và giao tiếp tự nhiên như người bản ngữ",
    price: "320.000 VNĐ/buổi",
    rating: 4.7,
    detailedInfo: {
      fullDescription: "Tôi là Quốc Anh, có thời gian học tập và làm việc tại Úc 4 năm. Chuyên môn của tôi là giúp học viên cải thiện phát âm và khả năng giao tiếp tự nhiên, tự tin như người bản ngữ.",
      qualifications: ["Native-like Pronunciation", "TESOL Advanced", "Communication Coach Certification"],
      teachingAreas: ["Pronunciation Training", "Fluency Development", "Conversation Practice", "Accent Reduction"],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      availableSlots: [
        { day: "Thứ 2", times: ["07:00", "12:00", "17:00"] },
        { day: "Thứ 4", times: ["07:00", "12:00", "17:00"] },
        { day: "Thứ 6", times: ["07:00", "12:00", "17:00"] },
        { day: "Thứ 7", times: ["09:00", "14:00", "19:00"] },
        { day: "Chủ nhật", times: ["09:00", "14:00"] }
      ],
      reviews: [
        { studentName: "Thanh Tùng", rating: 5, comment: "Thầy Anh giúp em phát âm chuẩn hơn rất nhiều, bạn bè đều khen em nói hay.", date: "2024-12-14" },
        { studentName: "Mai Linh", rating: 4, comment: "Học với thầy em tự tin giao tiếp hơn nhiều.", date: "2024-12-09" }
      ]
    }
  },
  {
    id: 4,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8
  },
  {
    id: 5,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8
  },
  {
    id: 6,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8
  },
  {
    id: 7,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8
  },
  {
    id: 8,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8
  },
  {
    id: 9,
    name: "Gia Thuận",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialty: "Business English",
    experience: "7 năm kinh nghiệm",
    description: "Chuyên gia tiếng Anh thương mại và giao tiếp công sở",
    price: "350.000 VNĐ/buổi",
    rating: 4.8
  }
];
