// ============================================
// DÒNG CHẢY GIÁ TRỊ — Story Data
// Complete story for 3 chapters
// ============================================

export const storyData = {
  // ==========================================
  // CHAPTER 1: KHỞI NGHIỆP — HÀNG HÓA VÀ GIÁ TRỊ
  // ==========================================

  ch1_intro: {
    id: "ch1_intro",
    chapter: 1,
    chapterTitle: "Khởi Nghiệp — Hàng Hóa và Giá Trị",
    video: "/videos/ch1_intro.mp4",
    title: "Giấc mơ khởi nghiệp",
    narrator: "Người dẫn chuyện",
    narration:
      "Năm 2024, giữa lòng thành phố Hồ Chí Minh nhộn nhịp, Minh — một chàng trai 28 tuổi đầy nhiệt huyết — quyết định mở một xưởng sản xuất giày da thủ công. Với số vốn khiêm tốn từ gia đình và niềm đam mê với nghề truyền thống, anh tin rằng chất lượng sản phẩm sẽ tạo nên sự khác biệt.",
    backgroundTheme: "factory-startup",
    choices: null,
    insight: null,
    nextScene: "ch1_problem",
  },

  ch1_problem: {
    id: "ch1_problem",
    chapter: 1,
    chapterTitle: "Khởi Nghiệp — Hàng Hóa và Giá Trị",
    video: "/videos/ch1_problem.mp4",
    title: "Cuộc cạnh tranh khốc liệt",
    narrator: "Người dẫn chuyện",
    narration:
      "Chỉ sau ba tháng, Minh nhận ra thực tế phũ phàng: các đối thủ cạnh tranh bán giày với giá rẻ hơn 40%. Những đôi giày sản xuất hàng loạt từ các nhà máy lớn tràn ngập thị trường. Đơn hàng của Minh giảm dần. Anh đứng trước ngã rẽ quan trọng nhất trong sự nghiệp...",
    backgroundTheme: "competition",
    choices: [
      {
        id: "ch1_choice_machine",
        label: "Đầu tư máy móc hiện đại",
        description: "Vay vốn để mua dây chuyền sản xuất tự động, tăng năng suất lao động",
        icon: "⚙️",
        nextScene: "ch1_machine",
        consequence: "Năng suất tăng gấp 3 lần, giá thành giảm 35%",
        journalEntry: "Đầu tư vào công nghệ sản xuất",
        scores: { production: 90, efficiency: 85, social: 70 },
      },
      {
        id: "ch1_choice_manual",
        label: "Giữ phương pháp thủ công",
        description: "Tập trung vào chất lượng thủ công, xây dựng thương hiệu cao cấp",
        icon: "🤲",
        nextScene: "ch1_manual",
        consequence: "Giữ được chất lượng nhưng khó mở rộng quy mô",
        journalEntry: "Giữ gìn giá trị thủ công truyền thống",
        scores: { production: 60, efficiency: 50, social: 85 },
      },
    ],
    insight: null,
    nextScene: null,
  },

  ch1_machine: {
    id: "ch1_machine",
    chapter: 1,
    chapterTitle: "Khởi Nghiệp — Hàng Hóa và Giá Trị",
    video: "/videos/ch1_machine.mp4",
    title: "Sức mạnh của công nghệ",
    narrator: "Người dẫn chuyện",
    narration:
      "Minh quyết định vay ngân hàng để đầu tư dây chuyền sản xuất hiện đại. Chỉ sau hai tháng, năng suất tăng gấp ba lần. Giá thành mỗi đôi giày giảm đáng kể. Sản phẩm của Minh giờ đây có thể cạnh tranh trực tiếp với các đối thủ lớn trên thị trường. Quyết định này đã thay đổi hoàn toàn cục diện...",
    backgroundTheme: "technology",
    choices: null,
    insight: {
      title: "Quy Luật Giá Trị",
      concept: "Hàng hóa, Giá trị sử dụng và Giá trị",
      content:
        "Theo Kinh tế Chính trị Mác-Lênin, hàng hóa có hai thuộc tính: giá trị sử dụng (công dụng của sản phẩm) và giá trị (lượng lao động xã hội cần thiết kết tinh trong hàng hóa).\n\nQuy luật giá trị yêu cầu sản xuất và trao đổi hàng hóa phải dựa trên cơ sở thời gian lao động xã hội cần thiết. Khi Minh đầu tư máy móc, anh đã giảm thời gian lao động cá biệt xuống dưới mức trung bình xã hội, từ đó tạo ra lợi thế cạnh tranh.\n\nĐây chính là động lực thúc đẩy cải tiến kỹ thuật và phát triển lực lượng sản xuất.",
      keyTerms: [
        "Hàng hóa (Commodity)",
        "Giá trị sử dụng (Use Value)",
        "Giá trị (Value)",
        "Thời gian lao động xã hội cần thiết",
        "Quy luật giá trị (Law of Value)",
      ],
    },
    nextScene: "ch1_convergence",
  },

  ch1_manual: {
    id: "ch1_manual",
    chapter: 1,
    chapterTitle: "Khởi Nghiệp — Hàng Hóa và Giá Trị",
    video: "/videos/ch1_manual.mp4",
    title: "Con đường thủ công",
    narrator: "Người dẫn chuyện",
    narration:
      "Minh quyết định giữ vững phương pháp sản xuất thủ công. Anh tập trung nâng cao tay nghề thợ, chọn nguyên liệu tốt nhất, và xây dựng thương hiệu giày cao cấp. Tuy không thể cạnh tranh về giá, nhưng sản phẩm của Minh được đánh giá cao về chất lượng. Con đường này đòi hỏi kiên nhẫn và niềm tin...",
    backgroundTheme: "craftsman",
    choices: null,
    insight: {
      title: "Lao Động Cụ Thể và Lao Động Trừu Tượng",
      concept: "Tính hai mặt của lao động sản xuất hàng hóa",
      content:
        "Lao động sản xuất hàng hóa có tính hai mặt: lao động cụ thể và lao động trừu tượng.\n\nLao động cụ thể tạo ra giá trị sử dụng — đó là kỹ năng thủ công tinh xảo của người thợ giày, tạo nên đôi giày chất lượng. Lao động trừu tượng tạo ra giá trị — là hao phí sức lao động nói chung của con người.\n\nKhi Minh giữ phương pháp thủ công, thời gian lao động cá biệt cao hơn thời gian lao động xã hội cần thiết, nhưng giá trị sử dụng đặc biệt giúp sản phẩm tồn tại ở phân khúc cao cấp.",
      keyTerms: [
        "Lao động cụ thể (Concrete Labor)",
        "Lao động trừu tượng (Abstract Labor)",
        "Thời gian lao động cá biệt",
        "Giá trị sử dụng đặc biệt",
      ],
    },
    nextScene: "ch1_convergence",
  },

  ch1_convergence: {
    id: "ch1_convergence",
    chapter: 1,
    chapterTitle: "Khởi Nghiệp — Hàng Hóa và Giá Trị",
    video: "/videos/ch1_convergence.mp4",
    title: "Bài học đầu tiên",
    narrator: "Người dẫn chuyện",
    narration:
      "Dù chọn con đường nào, Minh đều nhận ra một điều: trong nền kinh tế thị trường, mọi quyết định sản xuất đều phải tuân theo quy luật giá trị. Giá cả xoay quanh giá trị, và người sản xuất phải không ngừng nâng cao hiệu quả. Xưởng giày của Minh đã vượt qua giai đoạn khó khăn đầu tiên. Nhưng thử thách lớn hơn đang chờ phía trước...",
    backgroundTheme: "reflection",
    choices: null,
    insight: null,
    nextScene: "ch2_intro",
  },

  // ==========================================
  // CHAPTER 2: PHÁT TRIỂN — GIÁ TRỊ THẶNG DƯ
  // ==========================================

  ch2_intro: {
    id: "ch2_intro",
    chapter: 2,
    chapterTitle: "Phát Triển — Giá Trị Thặng Dư",
    video: "/videos/ch2_intro.mp4",
    title: "Tham vọng mở rộng",
    narrator: "Người dẫn chuyện",
    narration:
      "Hai năm sau, công ty của Minh đã phát triển đáng kể. Từ một xưởng nhỏ, giờ đây anh có 50 công nhân và doanh thu ổn định. Nhưng áp lực từ nhà đầu tư ngày càng lớn — họ muốn lợi nhuận cao hơn. Minh phải tìm cách tăng giá trị thặng dư, nhưng bằng cách nào?",
    backgroundTheme: "corporate-growth",
    choices: null,
    insight: null,
    nextScene: "ch2_problem",
  },

  ch2_problem: {
    id: "ch2_problem",
    chapter: 2,
    chapterTitle: "Phát Triển — Giá Trị Thặng Dư",
    video: "/videos/ch2_problem.mp4",
    title: "Áp lực lợi nhuận",
    narrator: "Người dẫn chuyện",
    narration:
      "Trong cuộc họp hội đồng quản trị, hai phương án được đưa ra. Phương án thứ nhất: tăng thời gian làm việc của công nhân từ 8 giờ lên 10 giờ mỗi ngày. Phương án thứ hai: đầu tư vào công nghệ mới để nâng cao năng suất lao động. Cả hai đều có thể tăng lợi nhuận, nhưng hệ quả rất khác nhau...",
    backgroundTheme: "boardroom",
    choices: [
      {
        id: "ch2_choice_hours",
        label: "Tăng thời gian lao động",
        description: "Yêu cầu công nhân làm thêm giờ, tăng ca sản xuất để tăng sản lượng",
        icon: "⏰",
        nextScene: "ch2_hours",
        consequence: "Lợi nhuận tăng ngay nhưng công nhân kiệt sức",
        journalEntry: "Tăng thời gian lao động để tăng lợi nhuận",
        scores: { production: 75, efficiency: 65, social: 40 },
      },
      {
        id: "ch2_choice_tech",
        label: "Cải tiến công nghệ",
        description: "Đầu tư nghiên cứu quy trình mới, tự động hóa một phần sản xuất",
        icon: "💡",
        nextScene: "ch2_tech",
        consequence: "Năng suất tăng bền vững, công nhân được đào tạo nâng cao",
        journalEntry: "Đầu tư cải tiến công nghệ sản xuất",
        scores: { production: 85, efficiency: 90, social: 80 },
      },
    ],
    insight: null,
    nextScene: null,
  },

  ch2_hours: {
    id: "ch2_hours",
    chapter: 2,
    chapterTitle: "Phát Triển — Giá Trị Thặng Dư",
    video: "/videos/ch2_hours.mp4",
    title: "Cái giá của tăng ca",
    narrator: "Người dẫn chuyện",
    narration:
      "Chính sách tăng ca được áp dụng. Lúc đầu, doanh thu tăng rõ rệt. Nhưng chỉ sau vài tháng, hậu quả bắt đầu xuất hiện: công nhân mệt mỏi, tai nạn lao động gia tăng, chất lượng sản phẩm giảm sút. Một số thợ lành nghề xin nghỉ việc. Minh nhận ra rằng kéo dài thời gian lao động không phải là giải pháp bền vững...",
    backgroundTheme: "factory-pressure",
    choices: null,
    insight: {
      title: "Giá Trị Thặng Dư Tuyệt Đối",
      concept: "Phương pháp sản xuất giá trị thặng dư tuyệt đối",
      content:
        "Giá trị thặng dư tuyệt đối là giá trị thặng dư thu được do kéo dài thời gian lao động vượt quá thời gian lao động cần thiết, trong khi năng suất lao động, giá trị sức lao động và thời gian lao động cần thiết không đổi.\n\nKhi Minh tăng giờ làm từ 8 lên 10 giờ, phần thời gian thặng dư tăng thêm 2 giờ, tạo ra thêm giá trị thặng dư. Tuy nhiên, phương pháp này bị giới hạn bởi sức chịu đựng của người lao động và quy định pháp luật.\n\nĐây là phương pháp phổ biến trong giai đoạn đầu của chủ nghĩa tư bản.",
      keyTerms: [
        "Giá trị thặng dư (Surplus Value)",
        "Giá trị thặng dư tuyệt đối (Absolute Surplus Value)",
        "Thời gian lao động cần thiết",
        "Thời gian lao động thặng dư",
        "Tỷ suất giá trị thặng dư",
      ],
    },
    nextScene: "ch2_convergence",
  },

  ch2_tech: {
    id: "ch2_tech",
    chapter: 2,
    chapterTitle: "Phát Triển — Giá Trị Thặng Dư",
    video: "/videos/ch2_tech.mp4",
    title: "Đổi mới sáng tạo",
    narrator: "Người dẫn chuyện",
    narration:
      "Minh quyết định đầu tư vào dây chuyền sản xuất thông minh. Công nhân được đào tạo sử dụng công nghệ mới. Năng suất lao động tăng 60% mà thời gian làm việc không đổi. Chi phí đầu tư ban đầu cao, nhưng chỉ sau sáu tháng, hiệu quả kinh tế đã vượt xa kỳ vọng. Công nhân hài lòng vì được nâng cao tay nghề...",
    backgroundTheme: "innovation",
    choices: null,
    insight: {
      title: "Giá Trị Thặng Dư Tương Đối",
      concept: "Phương pháp sản xuất giá trị thặng dư tương đối",
      content:
        "Giá trị thặng dư tương đối là giá trị thặng dư thu được nhờ rút ngắn thời gian lao động cần thiết, do đó kéo dài tương ứng thời gian lao động thặng dư, trong điều kiện độ dài ngày lao động không đổi.\n\nKhi Minh cải tiến công nghệ, năng suất lao động tăng lên, giá trị hàng tiêu dùng giảm, từ đó giá trị sức lao động giảm và thời gian lao động cần thiết rút ngắn. Phần thời gian thặng dư tăng lên tương ứng.\n\nĐây là phương pháp đặc trưng của chủ nghĩa tư bản phát triển, thúc đẩy tiến bộ khoa học kỹ thuật.",
      keyTerms: [
        "Giá trị thặng dư tương đối (Relative Surplus Value)",
        "Năng suất lao động",
        "Giá trị sức lao động",
        "Tiến bộ khoa học kỹ thuật",
      ],
    },
    nextScene: "ch2_convergence",
  },

  ch2_convergence: {
    id: "ch2_convergence",
    chapter: 2,
    chapterTitle: "Phát Triển — Giá Trị Thặng Dư",
    video: "/videos/ch2_convergence.mp4",
    title: "Nhìn lại hành trình",
    narrator: "Người dẫn chuyện",
    narration:
      "Qua thử thách này, Minh hiểu sâu hơn về bản chất của giá trị thặng dư — nguồn gốc của lợi nhuận. Dù chọn tăng thời gian hay cải tiến công nghệ, cả hai đều là cách tạo ra giá trị thặng dư. Nhưng phương pháp nào mang lại phát triển bền vững? Câu trả lời sẽ định hình tương lai của doanh nghiệp. Và một cuộc cách mạng công nghệ lớn đang đến...",
    backgroundTheme: "reflection",
    choices: null,
    insight: null,
    nextScene: "ch3_intro",
  },

  // ==========================================
  // CHAPTER 3: THỜI ĐẠI MỚI — PHÁT TRIỂN BỀN VỮNG
  // ==========================================

  ch3_intro: {
    id: "ch3_intro",
    chapter: 3,
    chapterTitle: "Thời Đại Mới — Phát Triển Bền Vững",
    video: "/videos/ch3_intro.mp4",
    title: "Kỷ nguyên trí tuệ nhân tạo",
    narrator: "Người dẫn chuyện",
    narration:
      "Năm 2026, làn sóng trí tuệ nhân tạo (AI) đang thay đổi mọi ngành công nghiệp. Công ty của Minh — giờ đã là một doanh nghiệp vừa với hơn 200 công nhân — đối mặt với bước ngoặt lớn nhất. Hệ thống AI mới có thể thay thế 70% công việc thủ công. Quyết định tiếp theo sẽ không chỉ ảnh hưởng đến doanh nghiệp, mà còn đến cuộc sống của hàng trăm gia đình...",
    backgroundTheme: "ai-future",
    choices: null,
    insight: null,
    nextScene: "ch3_problem",
  },

  ch3_problem: {
    id: "ch3_problem",
    chapter: 3,
    chapterTitle: "Thời Đại Mới — Phát Triển Bền Vững",
    video: "/videos/ch3_problem.mp4",
    title: "Quyết định của thời đại",
    narrator: "Người dẫn chuyện",
    narration:
      "Ban giám đốc họp khẩn cấp. Số liệu cho thấy nếu triển khai AI toàn diện, chi phí sản xuất giảm 50% nhưng 140 công nhân sẽ mất việc. Đây không chỉ là quyết định kinh tế — đây là quyết định về con người, về trách nhiệm xã hội. Minh nhìn xuống danh sách nhân viên, những người đã gắn bó từ ngày đầu...",
    backgroundTheme: "decision-crossroad",
    choices: [
      {
        id: "ch3_choice_cut",
        label: "Cắt giảm lao động ngay",
        description: "Triển khai AI toàn diện, sa thải phần lớn công nhân để tối ưu chi phí",
        icon: "📉",
        nextScene: "ch3_cut",
        consequence: "Hiệu quả tăng mạnh nhưng gây bất ổn xã hội",
        journalEntry: "Ưu tiên hiệu quả kinh tế, cắt giảm nhân sự",
        scores: { production: 95, efficiency: 90, social: 30 },
      },
      {
        id: "ch3_choice_retrain",
        label: "Đào tạo lại và đổi mới",
        description: "Chuyển đổi dần, đào tạo công nhân thích ứng với AI, tạo vị trí mới",
        icon: "🌱",
        nextScene: "ch3_retrain",
        consequence: "Chi phí ban đầu cao nhưng phát triển hài hòa và bền vững",
        journalEntry: "Đào tạo lại lao động, phát triển bền vững",
        scores: { production: 80, efficiency: 85, social: 95 },
      },
    ],
    insight: null,
    nextScene: null,
  },

  ch3_cut: {
    id: "ch3_cut",
    chapter: 3,
    chapterTitle: "Thời Đại Mới — Phát Triển Bền Vững",
    video: "/videos/ch3_cut.mp4",
    title: "Hệ quả của sự vội vàng",
    narrator: "Người dẫn chuyện",
    narration:
      "Hệ thống AI được triển khai nhanh chóng. 140 công nhân nhận thông báo nghỉ việc. Nhà máy vận hành hiệu quả chưa từng có. Nhưng bên ngoài cổng nhà máy, những người mất việc đối mặt với tương lai bất định. Truyền thông đưa tin, dư luận xôn xao. Minh nhận ra rằng lợi nhuận không thể đo bằng những con số lạnh lùng...",
    backgroundTheme: "social-impact",
    choices: null,
    insight: {
      title: "Quan Hệ Lao Động và Lợi Ích Xã Hội",
      concept: "Mâu thuẫn giữa lợi ích cá nhân và lợi ích xã hội",
      content:
        "Theo quan điểm Mác-Lênin, lực lượng sản xuất phát triển nhưng phải phù hợp với quan hệ sản xuất. Khi công nghệ tiến bộ, nếu chỉ tập trung vào lợi nhuận mà bỏ qua lợi ích người lao động, sẽ tạo ra mâu thuẫn xã hội sâu sắc.\n\nViệc sa thải hàng loạt không chỉ ảnh hưởng đến người lao động mà còn tác động đến sức mua xã hội, ổn định kinh tế vĩ mô, và sự phát triển bền vững của chính doanh nghiệp.\n\nPhát triển kinh tế phải gắn liền với tiến bộ và công bằng xã hội — đó là nguyên tắc của nền kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam.",
      keyTerms: [
        "Quan hệ sản xuất",
        "Lực lượng sản xuất",
        "Mâu thuẫn xã hội",
        "Lợi ích xã hội",
        "Kinh tế thị trường định hướng XHCN",
      ],
    },
    nextScene: "ch3_convergence",
  },

  ch3_retrain: {
    id: "ch3_retrain",
    chapter: 3,
    chapterTitle: "Thời Đại Mới — Phát Triển Bền Vững",
    video: "/videos/ch3_retrain.mp4",
    title: "Con đường bền vững",
    narrator: "Người dẫn chuyện",
    narration:
      "Minh chọn con đường khó hơn nhưng đúng đắn hơn. Anh thành lập trung tâm đào tạo nội bộ, giúp công nhân học kỹ năng số, vận hành và bảo trì hệ thống AI. Không ai bị bỏ lại phía sau. Sau một năm, công ty không chỉ tăng trưởng mà còn trở thành hình mẫu cho phát triển bền vững. Câu chuyện của Minh được đưa lên báo chí như một tấm gương kinh doanh có trách nhiệm...",
    backgroundTheme: "sustainable",
    choices: null,
    insight: {
      title: "Phát Triển Bền Vững",
      concept: "Kết hợp tăng trưởng kinh tế với tiến bộ xã hội",
      content:
        "Phát triển bền vững trong kinh tế chính trị Mác-Lênin đòi hỏi sự hài hòa giữa ba trụ cột: kinh tế, xã hội và môi trường.\n\nKhi Minh đào tạo lại công nhân, anh đã thực hiện nguyên tắc: phát triển lực lượng sản xuất phải đi đôi với hoàn thiện quan hệ sản xuất. Người lao động không chỉ là chi phí — họ là nguồn lực quý giá nhất.\n\nMô hình kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam đặt con người làm trung tâm, kết hợp tăng trưởng kinh tế với công bằng xã hội và phát triển bền vững.",
      keyTerms: [
        "Phát triển bền vững",
        "Quan hệ sản xuất tiến bộ",
        "Con người là trung tâm",
        "Kinh tế thị trường định hướng XHCN",
        "Công bằng xã hội",
      ],
    },
    nextScene: "ch3_convergence",
  },

  ch3_convergence: {
    id: "ch3_convergence",
    chapter: 3,
    chapterTitle: "Thời Đại Mới — Phát Triển Bền Vững",
    video: "/videos/ch3_convergence.mp4",
    title: "Dòng chảy giá trị",
    narrator: "Người dẫn chuyện",
    narration:
      "Từ một xưởng giày nhỏ, hành trình của Minh đã đi qua ba chương lớn của kinh tế chính trị: từ hiểu bản chất hàng hóa và giá trị, đến nắm bắt quy luật giá trị thặng dư, và cuối cùng là nhận thức về phát triển bền vững.\n\nMỗi quyết định kinh tế đều tạo nên dòng chảy — dòng chảy của giá trị, của lao động, của những mối quan hệ giữa con người với con người trong quá trình sản xuất. Và dòng chảy ấy sẽ tiếp tục...",
    backgroundTheme: "finale",
    choices: null,
    insight: null,
    nextScene: "ending",
  },
};

// Chapter metadata
export const chapters = [
  {
    id: 1,
    title: "Khởi Nghiệp",
    subtitle: "Hàng Hóa và Giá Trị",
    scenes: ["ch1_intro", "ch1_problem", "ch1_machine", "ch1_manual", "ch1_convergence"],
    startScene: "ch1_intro",
  },
  {
    id: 2,
    title: "Phát Triển",
    subtitle: "Giá Trị Thặng Dư",
    scenes: ["ch2_intro", "ch2_problem", "ch2_hours", "ch2_tech", "ch2_convergence"],
    startScene: "ch2_intro",
  },
  {
    id: 3,
    title: "Thời Đại Mới",
    subtitle: "Phát Triển Bền Vững",
    scenes: ["ch3_intro", "ch3_problem", "ch3_cut", "ch3_retrain", "ch3_convergence"],
    startScene: "ch3_intro",
  },
];

// Background themes for cinematic placeholder
export const backgroundThemes = {
  "factory-startup": {
    gradient: "from-amber-900/40 via-stone-900/60 to-zinc-950",
    particles: "warm",
    icon: "🏭",
    ambientText: "Xưởng giày nhỏ — TP. Hồ Chí Minh",
  },
  competition: {
    gradient: "from-red-900/40 via-stone-900/60 to-zinc-950",
    particles: "tense",
    icon: "⚔️",
    ambientText: "Cuộc chiến giá cả",
  },
  technology: {
    gradient: "from-blue-900/40 via-cyan-900/40 to-zinc-950",
    particles: "tech",
    icon: "⚙️",
    ambientText: "Dây chuyền sản xuất hiện đại",
  },
  craftsman: {
    gradient: "from-amber-800/40 via-orange-900/30 to-zinc-950",
    particles: "warm",
    icon: "🤲",
    ambientText: "Nghề thủ công truyền thống",
  },
  reflection: {
    gradient: "from-indigo-900/30 via-purple-900/20 to-zinc-950",
    particles: "calm",
    icon: "💭",
    ambientText: "Suy ngẫm",
  },
  "corporate-growth": {
    gradient: "from-emerald-900/30 via-teal-900/20 to-zinc-950",
    particles: "rising",
    icon: "📈",
    ambientText: "Doanh nghiệp phát triển",
  },
  boardroom: {
    gradient: "from-slate-800/50 via-gray-900/40 to-zinc-950",
    particles: "formal",
    icon: "🏢",
    ambientText: "Phòng họp hội đồng quản trị",
  },
  "factory-pressure": {
    gradient: "from-orange-900/40 via-red-900/30 to-zinc-950",
    particles: "tense",
    icon: "😰",
    ambientText: "Áp lực sản xuất",
  },
  innovation: {
    gradient: "from-cyan-900/30 via-blue-900/30 to-zinc-950",
    particles: "tech",
    icon: "💡",
    ambientText: "Đổi mới sáng tạo",
  },
  "ai-future": {
    gradient: "from-violet-900/30 via-purple-900/30 to-zinc-950",
    particles: "tech",
    icon: "🤖",
    ambientText: "Kỷ nguyên AI — 2026",
  },
  "decision-crossroad": {
    gradient: "from-yellow-900/30 via-amber-900/20 to-zinc-950",
    particles: "dramatic",
    icon: "⚖️",
    ambientText: "Ngã rẽ định mệnh",
  },
  "social-impact": {
    gradient: "from-red-900/30 via-rose-900/20 to-zinc-950",
    particles: "somber",
    icon: "👥",
    ambientText: "Hệ quả xã hội",
  },
  sustainable: {
    gradient: "from-green-900/30 via-emerald-900/20 to-zinc-950",
    particles: "peaceful",
    icon: "🌱",
    ambientText: "Phát triển bền vững",
  },
  finale: {
    gradient: "from-amber-900/20 via-indigo-900/20 to-zinc-950",
    particles: "celebratory",
    icon: "✨",
    ambientText: "Dòng chảy giá trị",
  },
};
