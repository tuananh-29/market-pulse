'use client'

import { ArrowRight, ArrowUpRight, BookOpen, Camera, Check, ChevronRight, CircleCheck, Heart, Leaf, Recycle, ShieldCheck, Shirt, Smartphone, Sofa, Sparkles, Star, Watch } from 'lucide-react'
import { ProductCard } from './product-card'
import { categories, type MarketplaceProduct, products } from './marketplace-data'

type HomeScreenProps = {
  favorites: number[]
  onFavorite: (productId: number) => void
  onSelectProduct: (product: MarketplaceProduct) => void
  onNavigate: (page: 'browse' | 'create' | 'profile' | 'manage') => void
  onCategoryClick: (category: string) => void
}

const categoryIcons = [Shirt, Smartphone, Sofa, BookOpen, Camera, Watch]
const categoryColors = ['#f2e9dc', '#e5ede5', '#f2e9dc', '#ece9e1', '#e5ede5', '#f3e8df']

export function HomeScreen({ favorites, onFavorite, onSelectProduct, onNavigate, onCategoryClick }: HomeScreenProps) {
  return (
    <main className="home-page page-wrap">
      <section className="hero-card" aria-labelledby="hero-title">
        <img className="hero-image" src="/images/marketplace-hero.png" alt="Những món đồ tuyển chọn đang chờ một vòng đời mới" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" />Chợ đồ cũ tử tế</div>
          <h1 id="hero-title">Món đồ cũ.<br /><em>Niềm vui mới.</em></h1>
          <p>Mua bán những món đồ có câu chuyện —<br className="desktop-break" /> dễ dàng, an tâm và có trách nhiệm hơn.</p>
          <div className="hero-actions">
            <button className="button button-coral" onClick={() => onNavigate('browse')}>Khám phá ngay <ArrowRight size={17} /></button>
            <button className="hero-link" onClick={() => onNavigate('create')}>Bắt đầu bán <ArrowUpRight size={16} /></button>
          </div>
          <div className="hero-proof"><div className="proof-avatars"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="" /><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80" alt="" /><img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=64&h=64&q=80" alt="" /></div><span><strong>12.000+</strong> người đang sống xanh hơn</span><span className="proof-star"><Star size={14} fill="currentColor" /> 4.9/5</span></div>
        </div>
        <div className="hero-stamp"><Recycle size={18} /><span>Yêu đồ cũ<br /><strong>thêm một chút</strong></span></div>
      </section>

      <section className="trust-row" aria-label="Cam kết của LẠI">
        <div className="trust-item"><span className="trust-icon"><ShieldCheck size={20} /></span><span><strong>Giao dịch an tâm</strong><small>Người bán được xác minh</small></span></div>
        <div className="trust-divider" />
        <div className="trust-item"><span className="trust-icon"><CircleCheck size={20} /></span><span><strong>Món đồ đúng mô tả</strong><small>Thông tin minh bạch, rõ ràng</small></span></div>
        <div className="trust-divider" />
        <div className="trust-item"><span className="trust-icon"><Leaf size={20} /></span><span><strong>Mua sắm có ý thức</strong><small>Mỗi món đồ thêm một vòng đời</small></span></div>
      </section>

      <section className="section-block category-section">
        <div className="section-heading">
          <div><div className="eyebrow section-eyebrow">Tìm món đồ tiếp theo</div><h2>Khám phá danh mục</h2></div>
          <button className="text-link" onClick={() => onNavigate('browse')}>Tất cả danh mục <ArrowRight size={16} /></button>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const Icon = categoryIcons[index]
            return <button className="category-tile" key={category} onClick={() => onCategoryClick(category)}>
              <span className="category-icon" style={{ backgroundColor: categoryColors[index] }}><Icon size={23} strokeWidth={1.7} /></span>
              <span className="category-name">{category}</span>
              <span className="category-count">{[1240, 860, 620, 410, 295, 188][index].toLocaleString('vi-VN')} món</span>
              <ChevronRight className="category-arrow" size={15} />
            </button>
          })}
        </div>
      </section>

      <section className="section-block arrivals-section">
        <div className="section-heading">
          <div><div className="eyebrow section-eyebrow"><span className="live-dot" /> Vừa lên kệ</div><h2>Món mới, giá thật xinh</h2><p className="section-subtitle">Những phát hiện hay ho từ cộng đồng LẠI.</p></div>
          <button className="text-link" onClick={() => onNavigate('browse')}>Xem tất cả <ArrowRight size={16} /></button>
        </div>
        <div className="product-grid home-product-grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavorite={onFavorite} onSelect={onSelectProduct} />)}
        </div>
      </section>

      <section className="sell-banner">
        <div className="sell-banner-content"><span className="sell-kicker"><Sparkles size={14} /> Một vòng đời mới bắt đầu từ bạn</span><h2>Tủ đồ gọn hơn.<br /><em>Ví tiền vui hơn.</em></h2><p>Đăng món đồ bạn không còn dùng. Biết đâu, đó lại là món đồ ai đó đang tìm.</p><button className="button button-light" onClick={() => onNavigate('create')}>Đăng bán miễn phí <ArrowRight size={16} /></button></div>
        <div className="sell-banner-art" aria-hidden="true"><div className="sell-art-circle"><Shirt size={46} strokeWidth={1.2} /><span className="sell-art-spark"><Check size={18} /></span></div><div className="sell-art-note">đồ tốt<br />đi tiếp nhé</div></div>
      </section>

      <section className="section-block popular-section">
        <div className="section-heading">
          <div><div className="eyebrow section-eyebrow">Được cộng đồng yêu thích</div><h2>Đồ tốt đang chờ chủ mới</h2></div>
          <button className="text-link" onClick={() => onNavigate('browse')}>Khám phá thêm <ArrowRight size={16} /></button>
        </div>
        <div className="product-grid home-product-grid">
          {products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavorite={onFavorite} onSelect={onSelectProduct} />)}
        </div>
      </section>

      <section className="community-strip"><div className="community-mark"><Heart size={18} fill="currentColor" /></div><div><strong>Không chỉ là mua bán.</strong><span>LẠI là nơi những món đồ tốt tìm được một câu chuyện mới.</span></div><button onClick={() => onNavigate('profile')}>Gặp cộng đồng <ArrowRight size={16} /></button></section>
    </main>
  )
}
