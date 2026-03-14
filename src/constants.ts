import { Category, Product, Testimonial } from './types';

export const categories: Category[] = [
  { name: 'Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
  { name: 'Bàn ăn', image: 'https://images.unsplash.com/photo-1577145900570-4c0567ec3792?auto=format&fit=crop&q=80&w=800' },
  { name: 'Giường ngủ', image: 'https://images.unsplash.com/photo-1505693419148-403bb79a9ff1?auto=format&fit=crop&q=80&w=800' },
  { name: 'Trang trí', image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Ghế Scandinavian Đen',
    price: '2.450.000₫',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
    isNew: true
  },
  {
    id: 2,
    name: 'Bàn Trà Gỗ Sồi Tròn',
    price: '3.800.000₫',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
    isNew: false
  },
  {
    id: 3,
    name: 'Sofa Minimalist Grey',
    price: '12.500.000₫',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
    isNew: false
  },
  {
    id: 4,
    name: 'Đèn Đứng Studio Đen',
    price: '1.950.000₫',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
    isNew: false
  }
];

export const sofaProducts: Product[] = [
  {
    id: 101,
    name: 'Sofa Minimalist X1',
    price: '12.500.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy4Kj9BmTCzp5H55Zoli6ifxYMkhAzHQ4d9nbX-VEJGvF7FLepiB_yGaH4wh8Jxe809U32JHADX6-P7jhfQ8Qgt_QAZfH1l4LsSja5oNe1t3UqlH3sc_dJrDpWuBWlsjrFNV-v-Pfj8qqCOZ3D2MV1HqWT6TINZWMGMxlVmvqjEde3HWV2e-ruW3PAuJ_YjHVlKm_BFZkpgV0oH88Zytd9tky7jedlZaCrw1jlDce1bzyMNoGqYhUOX7b-WkTYfcGFc0mJF7kxJLM',
    isNew: true,
    description: 'Sản phẩm biểu tượng cho sự tinh giản và sang trọng. Với chất liệu vải cao cấp nhập khẩu từ Bỉ, khung gỗ sồi tự nhiên, Sofa Minimalist X1 mang lại sự êm ái tuyệt đối cho không gian sống hiện đại.',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAy4Kj9BmTCzp5H55Zoli6ifxYMkhAzHQ4d9nbX-VEJGvF7FLepiB_yGaH4wh8Jxe809U32JHADX6-P7jhfQ8Qgt_QAZfH1l4LsSja5oNe1t3UqlH3sc_dJrDpWuBWlsjrFNV-v-Pfj8qqCOZ3D2MV1HqWT6TINZWMGMxlVmvqjEde3HWV2e-ruW3PAuJ_YjHVlKm_BFZkpgV0oH88Zytd9tky7jedlZaCrw1jlDce1bzyMNoGqYhUOX7b-WkTYfcGFc0mJF7kxJLM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTBD0wwq857HqFwl5OKer0OMfRYDO5wd7lCRvkcS8AUK41sv6fzB1qPdjTVQ8nfnYCN43nQjhdzyWcW-3N5sY4whOClFjXtR9_NWrpy-xw4gjS4NWy3OBUxFclcemRTt7zOq7DZiKZtnlT9B3oSCOsk4tB7NVyvPlrhEs0rDt5DSEOeccG8W1pk_-tN-rgwuzVyomCHXnOz1NTuZw5ewbyyWjvc0H05IxogPV4Rh91_qOGSuD0lbsu3Mpbr-qlSysc6LQ5Wg4MIC-A',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTpiPa0xc45tFfKPuZnR_gCSyHrle0BPna0d50QnBtcll_2r_IuwfWYBtu9TlttGoSRoS219K2Oz2orz6R06a9C6BarTP4DaHmFwVTV2GihRqn5aRmgViZXQmlNqbue3oCUfZne8U-US4E_VM5GYznpxuxEhJoBP1jzLjwBm1aQkDBU13sK4lL5qvMMrPQtIOwi9UCfjb3D-Rv8icIgTit2U03trtsowz9ZatZ1oMOUC5kkQzRF3DUc5OolfcOFuTuFyICL-_L0SA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBof-z7QW7nu8dGwAgJPI2fR36tMsTw-K7iN9ljyrZJ6F4bTd5rJcLXcR89FiR40bvvtjZQaKHjgvY8U1EtdooyvWX-yXfRTiYhv-It3o9mE7pYfNpyq2AXtFKIjssmOdXnDMHqJzqbs7XTZLs2sKqOAzJdqSDcE0m_uUEXPP1Mc3QFi2IJEYadwPTcMCcSi9Jn44l2CqT0dyLnKSnF_r8hKPq3_KtrSFMruUBaAJ29oKJGoMhrl9G98Y-X-V3q3q-8zHwKHCJeVxs'
    ],
    colors: ['#000000', '#9CA3AF', '#FFEDD5'],
    sizes: ['2 Chỗ', '3 Chỗ'],
    specs: {
      'Kích thước (2 chỗ)': 'W180 x D90 x H85 cm',
      'Chất liệu khung': 'Gỗ Sồi (Oak) tự nhiên',
      'Chất liệu bọc': 'Vải Canvas Bỉ cao cấp',
      'Xuất xứ': 'Việt Nam (Thiết kế Ý)'
    }
  },
  {
    id: 102,
    name: 'Sofa Vải Canvas Scandinavian',
    price: '8.900.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaRgcdCknPiRmy6FgcUKgqAcn56YYIiL4lKDUnpm0EHlZaNGiDEz5mN6XVogtlFF5IYDZJ3NfIHo5T2o_PcinzuPNAR7EcLabOptQe4_oTuCAiHuyYDibOKztxfP4gMlYAX4tLd-oQhoAxiRvBkQGholNgMRFmvnUQb96x6LxwBp34Ke9mA36ZyqMXV4X7t1Z_YqJZ_1NUfqdxPgQM0_Pt8wu5RJwsTJCS9_Q4BYk5kO6A-ZqvYjqDWfu-M2NGAa_NINrbZU7jKgw',
    isNew: false
  },
  {
    id: 103,
    name: 'Sofa Da Bò Ý Cao Cấp',
    price: '24.000.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ04GF9KWwOP5I8YzhWdohTiJrlxOYRlulk29cFp82-_SW91FIRs4WMMFZOjzaFt2GJi9_ZBBv76A6azlfvGrqldD_vTydx7lKfQVyNtFKXH2haFk5C5x2-QaG1viQINk2rqCZcuM4RhVHh13Ml5H6VHm4Bv9HvVVMrw4i5FxyupmcN6vINWL7X1kqLt5c3TJAw-6dzrG73Rx5rubCbam1hizHpRZK8FCWWw212tbB3Vm2fIm9yO75ihclZjCG5UaVfA3jxdywCBA',
    isNew: false
  },
  {
    id: 104,
    name: 'Sofa Băng Compact Navy',
    price: '6.500.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNxVCAhDrkW7EwUw8GDzST8pZhPD64R8SJKnpHwJ65AthvB6r_NPaMQB6Co8GAVAGeUL7lrQBK-sp-Cd3FPCmUHlWwQzpWFpCLXxA2K3Q0_sDKEmRJZBBRET-91zBrAFwMM3sr80ortgp9lk0ehZJIZnqEQ19-4aq80jkTLEJjzfHFgn-pOK869dEiDLN6ufcwB_XV5Z7jglB0cwZArTw5ly_LbDpkJjWdNGCV5cbefYY2Kkoa76Q1A1SJfu0QMbgEkeQgU4a4wKw',
    isNew: false
  },
  {
    id: 105,
    name: 'Sofa Góc L Modular Cream',
    price: '18.200.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYEVXQasYn68ldmAZqRtKCgXlg5wer6V7EinlK4tEc_kgwHS08X9-zHduRg68wY6R0QKSt2HXVx2SIu_QhfNMTlBlgVk_qHk29YuHK-MKVD_9rgEDg-ULxwx88bIK72djCD3OUUUlX2bZraQTNHL6qgBBtuTlknKJxjSoPOmkrMIhUPWo7ZkAYFBMxqYSPq-V_SlZ-6rEZ-rbJPj5hMvDC92c5mJ8eKo5VhTik66RIhlIpNfXm3w9wKbh6fIchcACuCHsLc650RBo',
    isNew: false
  },
  {
    id: 106,
    name: 'Sofa Studio Chân Gỗ Sồi',
    price: '7.800.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDssLVFs3gsUH9yhP-ZhsJPd77XLzIf2kcikSIAPf4SDG2V2NIysY7csiVqijXxJEfOOQrMBm_AK9xsP5uHVud39jBKVqWfLDLdRucEA0IRr847iYSJ5gMyUtB4ZaO6P9hi_F-Eedtj7QXta6schhn6ok2knBsH8WU4qTek3dsA3erehncOajzbJBI963piL9MU_4gFee9OIIraw7scHNbvOA_Y9NUa1guCvGjuhx8E78FoMQTBECEQZg4PRHrwbpsMlqFUAGpR2N0',
    isNew: false
  },
  {
    id: 107,
    name: 'Sofa Mây Trắng Oversized',
    price: '15.500.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcGVWd6ExQKIMB91NJbQPNDBZg8d-3Xct2gz0TpTlqdeqhkMIOGsHmZGqmyLxIOEj2i304K5bQ1QCqvCtsVAbOE5MT_XLCL9WZUvLBq1YiVfSos3UuWJJaolam4hq28bI6wS-_01qQipFPAHeaiQr75Ucz8z3uCEYegA0Y5N55GBqsiNywV0rYiH_d1icWox7WkZBv_hqMPCmT7J0QhRPpVlxcwjgbwGarP3sNcsBAjQ2CjXEJNGZCJzz9UGPMA9W8p_bY4d-_Jwk',
    isNew: false
  },
  {
    id: 108,
    name: 'Sofa Classic Tufted Brown',
    price: '17.850.000đ',
    oldPrice: '21.000.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN2D5qh_y9XHg1TO7gE7RzQTR9OB_U78BotEHC5Pv94tcFAWFFTR8BsiZHOWvPn67FUEwHhQM-Cvia9_0e5DBUEvjva4ovDq1OPhiOlBP4rl1AAQh76lNoIT2cTBYRzmuT1AgIdA_pWyQ9hzShGSWRZMPwrNjV4m8oIdJ5nFxZVZwrbjUukDJdSvmOcRXTbprBse0tLvkccOcdiLr6HeagbXx_EwG7ZTnzrRP-BRn9-7axO15CKq2vXldNPtY_e_d9J2QCLKQD7Yo',
    discount: '-15%',
    isNew: false
  }
];

export const testimonials: Testimonial[] = [
  {
    content: "Tôi rất hài lòng với chiếc sofa mua tại NoiThat. Thiết kế thực sự tối giản đúng ý tôi, chất liệu vải rất êm và bền.",
    author: "Minh Anh",
    role: "Kiến trúc sư, Hà Nội"
  },
  {
    content: "Dịch vụ chăm sóc khách hàng cực kỳ tốt. Nhân viên tư vấn nhiệt tình và giao hàng đúng hẹn. Sản phẩm đẹp hơn cả hình.",
    author: "Hoàng Nam",
    role: "Freelancer, TP. HCM"
  },
  {
    content: "Bàn ăn gỗ sồi của NoiThat là điểm nhấn hoàn hảo cho căn hộ nhỏ của tôi. Không gian cảm giác rộng rãi và ấm cúng hơn.",
    author: "Thùy Linh",
    role: "Designer, Đà Nẵng"
  }
];
