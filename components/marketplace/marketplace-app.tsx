'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { ArrowRight, Heart, Menu, Plus, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { HomeScreen } from './home-screen'
import { BrowseScreen, CreateListingScreen, DetailScreen, ManageScreen, ProfileScreen } from './secondary-screens'
import { categories, type MarketplaceProduct, products } from './marketplace-data'

type PageName = 'home' | 'browse' | 'detail' | 'create' | 'profile' | 'manage'

export function MarketplaceApp() {
  const [page, setPage] = useState<PageName>('home')
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct>(products[0])
  const [favorites, setFavorites] = useState<number[]>([3])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toast, setToast] = useState('')

  const navigate = (nextPage: PageName) => {
    setPage(nextPage)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const chooseCategory = (category: string) => {
    setSelectedCategory(category)
    setSearchTerm('')
    setSearchValue('')
    navigate('browse')
  }

  const openProduct = (product: MarketplaceProduct) => {
    setSelectedProduct(product)
    navigate('detail')
  }

  const toggleFavorite = (productId: number) => {
    const alreadySaved = favorites.includes(productId)
    setFavorites((current) => alreadySaved ? current.filter((id) => id !== productId) : [...current, productId])
    setToast(alreadySaved ? 'Đã bỏ khỏi danh sách yêu thích.' : 'Đã lưu vào danh sách yêu thích.')
    window.setTimeout(() => setToast(''), 2600)
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchTerm(searchValue.trim())
    setSelectedCategory('Tất cả')
    navigate('browse')
  }

  const browseItems = useMemo(() => products.filter((product) => {
    const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory
    const normalizedQuery = searchTerm.toLocaleLowerCase('vi-VN')
    const matchesSearch = !normalizedQuery || `${product.title} ${product.category} ${product.city} ${product.seller}`.toLocaleLowerCase('vi-VN').includes(normalizedQuery)
    return matchesCategory && matchesSearch
  }), [selectedCategory, searchTerm])

  return <div className="marketplace-app">
    <div className="announcement-bar"><span><span className="announcement-mark">L</span> Mỗi món đồ tốt đều xứng đáng có thêm một vòng đời.</span><button onClick={() => navigate('browse')}>Khám phá câu chuyện LẠI <ArrowRight size={13} /></button></div>
    <header className="site-header"><div className="header-main page-wrap">
      <button className="brand-lockup" onClick={() => navigate('home')} aria-label="LẠI — về trang chủ"><span className="brand-symbol"><span>L</span><i /></span><span className="brand-name">LẠI<small>CHỢ ĐỒ CŨ TỬ TẾ</small></span></button>
      <form className="header-search" onSubmit={submitSearch}><Search size={18} /><input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Tìm món đồ bạn đang cần..." aria-label="Tìm kiếm sản phẩm" /><kbd>⌘ K</kbd><button type="submit" aria-label="Tìm kiếm"><ArrowRight size={16} /></button></form>
      <div className="header-actions"><button className="header-icon-button favorite-nav" onClick={() => { setSelectedCategory('Tất cả'); setSearchTerm(''); navigate('profile') }} aria-label={`Danh sách yêu thích, ${favorites.length} món`}><Heart size={19} /><span className="action-label">Yêu thích</span>{favorites.length > 0 && <i>{favorites.length}</i>}</button><button className="header-icon-button account-nav" onClick={() => navigate('profile')}><span className="user-round"><UserRound size={17} /></span><span className="action-label">Tài khoản</span></button><button className="header-sell-button" onClick={() => navigate('create')}><Plus size={16} /> Đăng bán</button></div>
      <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}>{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
    </div><div className={`header-subnav page-wrap${mobileMenuOpen ? ' mobile-open' : ''}`}><nav aria-label="Điều hướng chính"><button className={page === 'home' ? 'nav-active' : ''} onClick={() => navigate('home')}>Trang chủ</button><button className={page === 'browse' ? 'nav-active' : ''} onClick={() => chooseCategory('Tất cả')}>Mua sắm</button>{categories.slice(0, 4).map((category) => <button key={category} onClick={() => chooseCategory(category)}>{category}</button>)}</nav><button className="nav-sell-link" onClick={() => navigate('manage')}><ShoppingBag size={15} /> Kênh người bán</button><div className="mobile-nav-extras"><button onClick={() => navigate('profile')}><Heart size={16} /> Yêu thích</button><button onClick={() => navigate('profile')}><UserRound size={16} /> Tài khoản</button><button onClick={() => navigate('manage')}><ShoppingBag size={16} /> Kênh người bán</button></div></div></header>
    {page === 'home' && <HomeScreen favorites={favorites} onFavorite={toggleFavorite} onSelectProduct={openProduct} onNavigate={navigate} onCategoryClick={chooseCategory} />}
    {page === 'browse' && <BrowseScreen items={browseItems} searchTerm={searchTerm} selectedCategory={selectedCategory} favorites={favorites} onFavorite={toggleFavorite} onSelectProduct={openProduct} onCategoryClick={chooseCategory} />}
    {page === 'detail' && <DetailScreen product={selectedProduct} favorites={favorites} onFavorite={toggleFavorite} onSelectProduct={openProduct} onBack={() => navigate('browse')} onNavigate={navigate} />}
    {page === 'create' && <CreateListingScreen onNavigate={navigate} />}
    {page === 'profile' && <ProfileScreen favorites={favorites} onFavorite={toggleFavorite} onSelectProduct={openProduct} onNavigate={navigate} />}
    {page === 'manage' && <ManageScreen onNavigate={navigate} />}
    <footer className="site-footer"><div className="footer-inner page-wrap"><div className="footer-brand"><button className="brand-lockup footer-lockup" onClick={() => navigate('home')}><span className="brand-symbol"><span>L</span><i /></span><span className="brand-name">LẠI<small>CHỢ ĐỒ CŨ TỬ TẾ</small></span></button><p>Đồ tốt tìm đúng người.<br />Mua bán tử tế, sống xanh mỗi ngày.</p></div><div className="footer-links"><div><strong>Khám phá</strong><button onClick={() => navigate('browse')}>Mua sắm</button><button onClick={() => navigate('create')}>Đăng bán</button><button onClick={() => chooseCategory('Thời trang')}>Thời trang</button></div><div><strong>Hỗ trợ</strong><button onClick={() => setToast('Trung tâm hỗ trợ sẽ sớm ra mắt.')}>Trung tâm hỗ trợ</button><button onClick={() => setToast('Chính sách an toàn đang được cập nhật.')}>An toàn giao dịch</button><button onClick={() => setToast('LẠI — đồ tốt tìm đúng người.')}>Về LẠI</button></div></div><div className="footer-newsletter"><strong>Ở lại cùng LẠI</strong><p>Nhận tin về những món đồ hay ho mỗi tuần.</p><form onSubmit={(event) => { event.preventDefault(); setToast('Cảm ơn bạn đã đăng ký nhận tin!') }}><input type="email" required placeholder="Email của bạn" aria-label="Email đăng ký nhận tin" /><button aria-label="Đăng ký nhận tin"><ArrowRight size={16} /></button></form></div></div><div className="footer-bottom page-wrap"><span>© 2025 LẠI Marketplace. Một vòng đời mới.</span><span><span className="footer-dot" /> Được làm với sự tử tế</span></div></footer>
    <nav className="mobile-bottom-nav" aria-label="Điều hướng nhanh"><button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}><span>⌂</span>Trang chủ</button><button className={page === 'browse' ? 'active' : ''} onClick={() => chooseCategory('Tất cả')}><Search size={19} />Khám phá</button><button className="mobile-post-button" onClick={() => navigate('create')}><span><Plus size={18} /></span>Đăng bán</button><button className={page === 'profile' ? 'active' : ''} onClick={() => navigate('profile')}><UserRound size={19} />Cá nhân</button></nav>
    {toast && <div className="toast-message" role="status"><span><Heart size={15} fill="currentColor" /></span>{toast}<button onClick={() => setToast('')} aria-label="Đóng"><X size={14} /></button></div>}
  </div>
}
