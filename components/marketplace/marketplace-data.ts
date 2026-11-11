export type MarketplaceProduct = {
  id: number
  title: string
  price: number
  originalPrice?: number
  category: string
  condition: string
  city: string
  seller: string
  sellerAvatar: string
  image: string
  listed: string
  shipping?: boolean
  views: number
  status: 'Đang bán' | 'Đã bán' | 'Bản nháp'
}

export const categories = ['Thời trang', 'Điện tử', 'Nhà cửa', 'Sách & học tập', 'Thể thao', 'Sưu tầm']

export const products: MarketplaceProduct[] = [
  {
    id: 1,
    title: 'Túi baguette da vintage màu cognac',
    price: 890000,
    originalPrice: 1850000,
    category: 'Thời trang',
    condition: 'Rất tốt',
    city: 'Quận 3, TP. Hồ Chí Minh',
    seller: 'Mai Anh',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=760&h=860&q=85',
    listed: '12 phút trước',
    shipping: true,
    views: 184,
    status: 'Đang bán',
  },
  {
    id: 2,
    title: 'Máy ảnh film Canon AE-1 Program',
    price: 2450000,
    originalPrice: 3200000,
    category: 'Điện tử',
    condition: 'Tốt',
    city: 'Ba Đình, Hà Nội',
    seller: 'Minh Khoa',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=760&h=860&q=85',
    listed: '34 phút trước',
    shipping: true,
    views: 92,
    status: 'Đang bán',
  },
  {
    id: 3,
    title: 'Ghế gỗ sồi phong cách Scandinavian',
    price: 1750000,
    originalPrice: 2800000,
    category: 'Nhà cửa',
    condition: 'Rất tốt',
    city: 'Thủ Đức, TP. Hồ Chí Minh',
    seller: 'Huyền Trân',
    sellerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=760&h=860&q=85',
    listed: '1 giờ trước',
    shipping: false,
    views: 231,
    status: 'Đang bán',
  },
  {
    id: 4,
    title: 'Sneaker New Balance 530 chính hãng',
    price: 1190000,
    originalPrice: 2490000,
    category: 'Thời trang',
    condition: 'Tốt',
    city: 'Cầu Giấy, Hà Nội',
    seller: 'Quốc Bảo',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=760&h=860&q=85',
    listed: '2 giờ trước',
    shipping: true,
    views: 316,
    status: 'Đang bán',
  },
  {
    id: 5,
    title: 'Đèn bàn gốm men xanh thủ công',
    price: 680000,
    originalPrice: 1200000,
    category: 'Nhà cửa',
    condition: 'Rất tốt',
    city: 'Quận 1, TP. Hồ Chí Minh',
    seller: 'Ngọc Diệp',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=760&h=860&q=85',
    listed: '3 giờ trước',
    shipping: true,
    views: 67,
    status: 'Đang bán',
  },
  {
    id: 6,
    title: 'Áo khoác denim Levi’s 90s form rộng',
    price: 750000,
    originalPrice: 1650000,
    category: 'Thời trang',
    condition: 'Tốt',
    city: 'Bình Thạnh, TP. Hồ Chí Minh',
    seller: 'Linh Phạm',
    sellerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=760&h=860&q=85',
    listed: '4 giờ trước',
    shipping: true,
    views: 152,
    status: 'Đang bán',
  },
  {
    id: 7,
    title: 'Tai nghe Sony WH-1000XM4',
    price: 3950000,
    originalPrice: 6990000,
    category: 'Điện tử',
    condition: 'Rất tốt',
    city: 'Nam Từ Liêm, Hà Nội',
    seller: 'Đức Anh',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=760&h=860&q=85',
    listed: 'Hôm qua',
    shipping: true,
    views: 208,
    status: 'Đang bán',
  },
  {
    id: 8,
    title: 'Sách nghệ thuật The Kinfolk Home',
    price: 420000,
    originalPrice: 780000,
    category: 'Sách & học tập',
    condition: 'Rất tốt',
    city: 'Quận 7, TP. Hồ Chí Minh',
    seller: 'Thảo Vy',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=760&h=860&q=85',
    listed: 'Hôm qua',
    shipping: true,
    views: 46,
    status: 'Đang bán',
  },
]

export const formatPrice = (price: number) => `${new Intl.NumberFormat('vi-VN').format(price)}đ`
