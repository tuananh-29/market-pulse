'use client'

import { Heart, MapPin, ShieldCheck } from 'lucide-react'
import type { MarketplaceProduct } from './marketplace-data'
import { formatPrice } from './marketplace-data'

type ProductCardProps = {
  product: MarketplaceProduct
  isFavorite: boolean
  onFavorite: (productId: number) => void
  onSelect: (product: MarketplaceProduct) => void
  compact?: boolean
}

export function ProductCard({ product, isFavorite, onFavorite, onSelect, compact = false }: ProductCardProps) {
  return (
    <article className={`product-card${compact ? ' product-card-compact' : ''}`}>
      <button className="product-card-image" onClick={() => onSelect(product)} aria-label={`Xem ${product.title}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="product-condition">{product.condition}</span>
        {product.shipping && <span className="product-shipping">Có vận chuyển</span>}
      </button>
      <button
        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
        onClick={() => onFavorite(product.id)}
        aria-label={isFavorite ? 'Bỏ khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
        aria-pressed={isFavorite}
      >
        <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      <div className="product-card-content">
        <button className="product-title" onClick={() => onSelect(product)}>{product.title}</button>
        <div className="product-price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.originalPrice && <span className="product-old-price">{formatPrice(product.originalPrice)}</span>}
        </div>
        <div className="product-card-meta">
          <span><MapPin size={13} />{product.city.split(',')[0]}</span>
          <span>{product.listed}</span>
        </div>
        {!compact && <div className="seller-mini"><img src={product.sellerAvatar} alt="" /><span>{product.seller}</span><ShieldCheck size={14} aria-label="Người bán đã xác minh" /></div>}
      </div>
    </article>
  )
}
