'use client'

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Check,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  Clock3,
  Eye,
  Flag,
  LayoutDashboard,
  MoreHorizontal,
  PackageCheck,
  Search,
  ShieldCheck,
  Tags,
  TriangleAlert,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'
import { categories, formatPrice, products, type MarketplaceProduct } from './marketplace-data'

type AdminSection = 'overview' | 'listings' | 'members' | 'reports' | 'categories'
type ReviewStatus = 'pending' | 'approved' | 'rejected'

const navigation: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'listings', label: 'Duyệt tin đăng', icon: PackageCheck },
  { id: 'members', label: 'Người dùng', icon: UsersRound },
  { id: 'reports', label: 'Báo cáo vi phạm', icon: Flag },
  { id: 'categories', label: 'Danh mục', icon: Tags },
]

const members = [
  { id: 'u1', name: 'Mai Anh', initials: 'MA', handle: '@maianh.vintage', listings: 18, joined: 'Hôm nay, 09:42', verified: true },
  { id: 'u2', name: 'Minh Khoa', initials: 'MK', handle: '@minhkhoa.film', listings: 7, joined: 'Hôm nay, 08:17', verified: true },
  { id: 'u3', name: 'Huyền Trân', initials: 'HT', handle: '@tran.home', listings: 12, joined: 'Hôm qua, 21:06', verified: false },
  { id: 'u4', name: 'Quốc Bảo', initials: 'QB', handle: '@baosneaker', listings: 4, joined: 'Hôm qua, 18:25', verified: true },
]

const reports = [
  { id: 'RP-1042', reason: 'Nghi ngờ hàng không chính hãng', item: 'Sneaker New Balance 530', reporter: 'Linh Phạm', time: '14 phút trước', priority: 'Cần xem xét' },
  { id: 'RP-1041', reason: 'Thông tin sản phẩm không chính xác', item: 'Máy ảnh film Canon AE-1', reporter: 'Đức Anh', time: '38 phút trước', priority: 'Bình thường' },
  { id: 'RP-1038', reason: 'Nội dung giao dịch ngoài nền tảng', item: 'Túi da vintage màu cognac', reporter: 'Thảo Vy', time: '2 giờ trước', priority: 'Bình thường' },
]

const sections: Record<AdminSection, { title: string; description: string }> = {
  overview: { title: 'Tổng quan', description: 'Theo dõi sức khỏe cộng đồng và hoạt động trên LẠI.' },
  listings: { title: 'Duyệt tin đăng', description: 'Kiểm tra thông tin để giữ chất lượng cho marketplace.' },
  members: { title: 'Người dùng', description: 'Quản lý thành viên và trạng thái xác minh tài khoản.' },
  reports: { title: 'Báo cáo vi phạm', description: 'Tiếp nhận và xử lý nội dung được cộng đồng báo cáo.' },
  categories: { title: 'Danh mục', description: 'Theo dõi các nhóm sản phẩm đang hoạt động trên sàn.' },
}

const statusLabels: Record<ReviewStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
}

function ListingTable({
  items,
  reviewStatus,
  onReview,
}: {
  items: MarketplaceProduct[]
  reviewStatus: Record<number, ReviewStatus>
  onReview: (product: MarketplaceProduct, status: ReviewStatus) => void
}) {
  return <div className="admin-table-scroll"><table className="admin-table">
    <thead><tr><th scope="col">Tin đăng</th><th scope="col">Người bán</th><th scope="col">Giá bán</th><th scope="col">Trạng thái</th><th scope="col">Thao tác</th></tr></thead>
    <tbody>{items.map((product) => {
      const status = reviewStatus[product.id] ?? 'pending'
      return <tr key={product.id}>
        <td><div className="admin-listing-cell"><img src={product.image} alt="" /><span><strong>{product.title}</strong><small>{product.category} · {product.condition}</small></span></div></td>
        <td><span className="admin-seller-cell">{product.seller}<small>{product.city}</small></span></td>
        <td><strong className="admin-price">{formatPrice(product.price)}</strong></td>
        <td><span className={`admin-status admin-status-${status}`}><i />{statusLabels[status]}</span></td>
        <td><div className="admin-row-actions">{status === 'pending' ? <><button className="admin-approve" onClick={() => onReview(product, 'approved')} aria-label={`Duyệt ${product.title}`}><Check size={14} /> Duyệt</button><button className="admin-reject" onClick={() => onReview(product, 'rejected')} aria-label={`Từ chối ${product.title}`}><X size={14} /></button></> : <button className="admin-text-action" onClick={() => onReview(product, status === 'approved' ? 'pending' : 'pending')}>Hoàn tác</button>}</div></td>
      </tr>
    })}</tbody>
  </table>{items.length === 0 && <div className="admin-empty"><CircleCheck size={19} /><strong>Không có tin đăng trong mục này</strong><span>Các thay đổi trong bản demo chỉ lưu tạm thời.</span></div>}</div>
}

function OverviewSection({
  items,
  reviewStatus,
  onReview,
  onNavigate,
}: {
  items: MarketplaceProduct[]
  reviewStatus: Record<number, ReviewStatus>
  onReview: (product: MarketplaceProduct, status: ReviewStatus) => void
  onNavigate: (section: AdminSection) => void
}) {
  return <>
    <section className="admin-kpis" aria-label="Chỉ số tổng quan">
      <article className="admin-kpi"><span className="admin-kpi-icon kpi-green"><CircleDollarSign size={18} /></span><span className="admin-kpi-label">Tổng giá trị giao dịch</span><strong>284,6 <small>tr</small></strong><span className="admin-kpi-trend"><ArrowUpRight size={13} /> 8,4% <i>so với tháng trước</i></span><span className="admin-kpi-period">THÁNG NÀY</span></article>
      <article className="admin-kpi"><span className="admin-kpi-icon kpi-sand"><PackageCheck size={18} /></span><span className="admin-kpi-label">Tin đăng hoạt động</span><strong>1.842</strong><span className="admin-kpi-trend"><ArrowUpRight size={13} /> 12,6% <i>so với tháng trước</i></span><span className="admin-kpi-period">TRÊN TOÀN SÀN</span></article>
      <article className="admin-kpi"><span className="admin-kpi-icon kpi-coral"><UsersRound size={18} /></span><span className="admin-kpi-label">Thành viên hoạt động</span><strong>5.218</strong><span className="admin-kpi-trend"><ArrowUpRight size={13} /> 6,2% <i>so với tháng trước</i></span><span className="admin-kpi-period">30 NGÀY GẦN NHẤT</span></article>
      <article className="admin-kpi admin-kpi-attention"><span className="admin-kpi-icon kpi-amber"><Clock3 size={18} /></span><span className="admin-kpi-label">Chờ đội ngũ xem xét</span><strong>24</strong><span className="admin-kpi-note">Tin đăng và báo cáo</span><span className="admin-kpi-period">CẦN XỬ LÝ</span></article>
    </section>
    <div className="admin-overview-grid">
      <section className="admin-panel admin-queue-panel">
        <div className="admin-panel-heading"><div><span className="admin-panel-kicker">KIỂM DUYỆT</span><h2>Tin đăng cần chú ý</h2><p>Ưu tiên xử lý các tin mới gửi lên.</p></div><button className="admin-link-button" onClick={() => onNavigate('listings')}>Xem hàng đợi <ChevronRight size={15} /></button></div>
        <ListingTable items={items.filter((item) => (reviewStatus[item.id] ?? 'pending') === 'pending').slice(0, 4)} reviewStatus={reviewStatus} onReview={onReview} />
      </section>
      <aside className="admin-overview-aside">
        <section className="admin-panel quality-panel"><div className="admin-panel-heading compact"><div><span className="admin-panel-kicker">CHẤT LƯỢNG SÀN</span><h2>Tuần này</h2></div><span className="quality-icon"><ShieldCheck size={17} /></span></div><div className="quality-score"><strong>96,8%</strong><span><ArrowUpRight size={13} /> 2,4%</span></div><p>Tin đăng đáp ứng tiêu chuẩn cộng đồng</p><div className="quality-progress"><span /></div><div className="quality-foot"><span>Mục tiêu 95%</span><strong>Đạt mục tiêu</strong></div><div className="quality-divider" /><div className="quality-metric"><span>Tin được duyệt trong 24h</span><strong>92%</strong></div><div className="quality-metric"><span>Báo cáo được xử lý</span><strong>87%</strong></div></section>
        <section className="admin-panel activity-panel"><div className="admin-panel-heading compact"><div><span className="admin-panel-kicker">NHẬT KÝ</span><h2>Hoạt động gần đây</h2></div><button onClick={() => onNavigate('reports')} aria-label="Xem nhật ký hoạt động"><MoreHorizontal size={18} /></button></div><div className="admin-activity-list"><div><span className="activity-icon activity-verified"><BadgeCheck size={14} /></span><p><strong>12 thành viên</strong> vừa xác minh tài khoản<small>Khoảng 20 phút trước</small></p></div><div><span className="activity-icon activity-alert"><TriangleAlert size={14} /></span><p><strong>3 báo cáo mới</strong> cần được xem xét<small>Khoảng 1 giờ trước</small></p></div><div><span className="activity-icon activity-listing"><PackageCheck size={14} /></span><p><strong>18 tin đăng</strong> được duyệt hôm nay<small>Khoảng 2 giờ trước</small></p></div></div><button className="activity-all" onClick={() => onNavigate('reports')}>Mở nhật ký kiểm duyệt <ArrowUpRight size={13} /></button></section>
      </aside>
    </div>
  </>
}

function MembersSection({ suspendedUsers, onToggleSuspended, query }: { suspendedUsers: string[]; onToggleSuspended: (id: string, name: string) => void; query: string }) {
  const filteredMembers = members.filter((member) => `${member.name} ${member.handle}`.toLowerCase().includes(query.toLowerCase()))
  return <section className="admin-panel admin-data-panel"><div className="admin-panel-heading"><div><span className="admin-panel-kicker">CỘNG ĐỒNG LẠI</span><h2>Thành viên mới</h2><p>Kiểm tra hoạt động và tình trạng xác minh của tài khoản.</p></div><span className="admin-count-chip">{filteredMembers.length} thành viên</span></div><div className="admin-table-scroll"><table className="admin-table member-table"><thead><tr><th scope="col">Thành viên</th><th scope="col">Tin đăng</th><th scope="col">Ngày tham gia</th><th scope="col">Trạng thái</th><th scope="col">Thao tác</th></tr></thead><tbody>{filteredMembers.map((member) => { const suspended = suspendedUsers.includes(member.id); return <tr key={member.id}><td><div className="admin-member-cell"><span className="admin-initial-avatar">{member.initials}</span><span><strong>{member.name}</strong><small>{member.handle}</small></span></div></td><td>{member.listings}</td><td>{member.joined}</td><td><span className={`admin-status ${suspended ? 'admin-status-rejected' : member.verified ? 'admin-status-approved' : 'admin-status-pending'}`}><i />{suspended ? 'Tạm khóa' : member.verified ? 'Đã xác minh' : 'Chưa xác minh'}</span></td><td><button className="admin-text-action" onClick={() => onToggleSuspended(member.id, member.name)}>{suspended ? 'Mở lại' : 'Tạm khóa'}</button></td></tr> })}</tbody></table>{filteredMembers.length === 0 && <div className="admin-empty"><UsersRound size={19} /><strong>Không tìm thấy thành viên</strong></div>}</div></section>
}

function ReportsSection({ reportsToShow, reviewedReports, onResolve, onInspect }: { reportsToShow: typeof reports; reviewedReports: string[]; onResolve: (id: string) => void; onInspect: (id: string) => void }) {
  return <section className="admin-reports-list">{reportsToShow.length > 0 ? reportsToShow.map((report) => { const reviewed = reviewedReports.includes(report.id); return <article className="admin-report-card" key={report.id}><span className={`report-priority ${report.priority === 'Cần xem xét' ? 'priority-high' : ''}`}><TriangleAlert size={14} />{reviewed ? 'Đã xử lý' : report.priority}</span><div className="admin-report-main"><span className="admin-report-id">{report.id} · {report.time}</span><h2>{report.reason}</h2><p><strong>{report.item}</strong> được báo cáo bởi {report.reporter}</p><div className="admin-report-actions"><button className="admin-link-button" onClick={() => onInspect(report.id)}>Xem tin đăng <Eye size={14} /></button><button className="admin-approve" onClick={() => onResolve(report.id)}>{reviewed ? <Check size={14} /> : <CircleCheck size={14} />}{reviewed ? 'Đã ghi nhận' : 'Đánh dấu đã xử lý'}</button></div></div></article> }) : <div className="admin-empty"><Flag size={19} /><strong>Không tìm thấy báo cáo</strong></div>}</section>
}

export function AdminScreen({ onExit }: { onExit: () => void }) {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview')
  const [reviewStatus, setReviewStatus] = useState<Record<number, ReviewStatus>>({})
  const [suspendedUsers, setSuspendedUsers] = useState<string[]>([])
  const [reviewedReports, setReviewedReports] = useState<string[]>([])
  const [listingFilter, setListingFilter] = useState<'Tất cả' | 'Chờ duyệt' | 'Đã duyệt' | 'Từ chối'>('Chờ duyệt')
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const activeMeta = sections[activeSection]
  const reviewItems = useMemo(() => products.slice(0, 6).filter((item) => `${item.title} ${item.seller} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [query])
  const filteredReports = reports.filter((report) => `${report.id} ${report.reason} ${report.item} ${report.reporter}`.toLowerCase().includes(query.toLowerCase()))
  const filteredCategories = categories.filter((category) => category.toLowerCase().includes(query.toLowerCase()))
  const filteredListings = reviewItems.filter((item) => listingFilter === 'Tất cả' || statusLabels[reviewStatus[item.id] ?? 'pending'] === listingFilter)
  const pendingCount = products.slice(0, 6).filter((item) => (reviewStatus[item.id] ?? 'pending') === 'pending').length

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3200)
  }

  const handleReview = (product: MarketplaceProduct, status: ReviewStatus) => {
    setReviewStatus((current) => ({ ...current, [product.id]: status }))
    showNotice(`“${product.title}” — ${statusLabels[status].toLowerCase()} trong bản demo.`)
  }

  const toggleSuspended = (id: string, name: string) => {
    const isSuspended = suspendedUsers.includes(id)
    setSuspendedUsers((current) => isSuspended ? current.filter((userId) => userId !== id) : [...current, id])
    showNotice(`${name}: ${isSuspended ? 'đã mở lại tài khoản' : 'đã tạm khóa tài khoản'} trong bản demo.`)
  }

  const resolveReport = (id: string) => {
    setReviewedReports((current) => current.includes(id) ? current : [...current, id])
    showNotice(`${id} đã được đánh dấu xử lý trong bản demo.`)
  }

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-brand-row"><button className="admin-brand" onClick={onExit} aria-label="Quay lại LẠI marketplace"><span className="admin-brand-symbol">L</span><span><strong>LẠI</strong><small>MARKETPLACE OPS</small></span></button><span className="admin-mode-tag">ADMIN</span></div>
      <p className="admin-sidebar-caption">KHÔNG GIAN ĐIỀU HÀNH</p>
      <nav className="admin-side-nav" aria-label="Điều hướng quản trị">{navigation.map((item) => { const Icon = item.icon; return <button key={item.id} className={activeSection === item.id ? 'active' : ''} onClick={() => setActiveSection(item.id)} aria-current={activeSection === item.id ? 'page' : undefined}><Icon size={17} /><span>{item.label}</span>{item.id === 'listings' && <i>{pendingCount}</i>}{item.id === 'reports' && <i>{reports.length - reviewedReports.length}</i>}</button> })}</nav>
      <div className="admin-sidebar-bottom"><div className="admin-operator-avatar">AN</div><div className="admin-operator-copy"><strong>An Nguyễn</strong><span>Quản trị viên</span></div><button onClick={onExit} aria-label="Về marketplace" title="Về marketplace"><ArrowLeft size={16} /></button></div>
    </aside>
    <section className="admin-workspace">
      <header className="admin-topbar"><div className="admin-topbar-crumb"><span>LẠI</span><ChevronRight size={14} /><strong>Quản trị</strong></div><div className="admin-topbar-actions"><label className="admin-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Tìm trong quản trị" placeholder={activeSection === 'reports' ? 'Tìm báo cáo...' : activeSection === 'categories' ? 'Tìm danh mục...' : activeSection === 'members' ? 'Tìm thành viên...' : 'Tìm tin đăng, người bán...'} /></label><button className="admin-bell" onClick={() => showNotice('Bạn đang xem thông báo mẫu trong bản demo.')} aria-label="Thông báo quản trị"><Bell size={18} /><i /></button><span className="admin-top-avatar">AN</span></div></header>
      <div className="admin-main-content">
        <div className="admin-demo-banner"><ShieldCheck size={16} /><span><strong>Bản demo giao diện.</strong> Các thao tác chỉ cập nhật trạng thái tạm thời trên trình duyệt, chưa kết nối quyền quản trị hay dữ liệu thật.</span></div>
        <div className="admin-page-heading"><div><span className="admin-page-kicker">ĐIỀU HÀNH NỀN TẢNG</span><h1>{activeMeta.title}</h1><p>{activeMeta.description}</p></div><div className="admin-heading-actions"><span className="admin-live-label"><i /> Cập nhật gần đây</span><button className="admin-exit-button" onClick={onExit}>Về marketplace <ArrowUpRight size={14} /></button></div></div>
        {notice && <div className="admin-notice" role="status"><CircleCheck size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Đóng thông báo"><X size={14} /></button></div>}
        {activeSection === 'overview' && <OverviewSection items={reviewItems} reviewStatus={reviewStatus} onReview={handleReview} onNavigate={setActiveSection} />}
        {activeSection === 'listings' && <section className="admin-panel admin-data-panel"><div className="admin-panel-heading"><div><span className="admin-panel-kicker">KIỂM DUYỆT NỘI DUNG</span><h2>Hàng đợi tin đăng</h2><p>Xem trước tin đăng mẫu và đánh dấu trạng thái kiểm duyệt.</p></div><span className="admin-count-chip">{pendingCount} đang chờ</span></div><div className="admin-filter-tabs" role="group" aria-label="Lọc trạng thái tin đăng">{(['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối'] as const).map((filter) => <button key={filter} className={listingFilter === filter ? 'active' : ''} onClick={() => setListingFilter(filter)}>{filter}{filter === 'Chờ duyệt' && <span>{pendingCount}</span>}</button>)}</div><ListingTable items={filteredListings} reviewStatus={reviewStatus} onReview={handleReview} /></section>}
        {activeSection === 'members' && <MembersSection suspendedUsers={suspendedUsers} onToggleSuspended={toggleSuspended} query={query} />}
        {activeSection === 'reports' && <ReportsSection reportsToShow={filteredReports} reviewedReports={reviewedReports} onResolve={resolveReport} onInspect={(id) => showNotice(`Mở tin liên quan ${id} trong bản demo.`)} />}
        {activeSection === 'categories' && <section className="admin-category-grid">{filteredCategories.map((category) => { const index = categories.indexOf(category); return <article className="admin-category-card" key={category}><span className={`category-ordinal category-tone-${index % 3}`}>0{index + 1}</span><span className="admin-category-icon"><Tags size={18} /></span><h2>{category}</h2><p>{[428, 316, 284, 192, 146, 82][index]} tin đang hoạt động</p><div className="admin-category-footer"><span><i /> Đang hiển thị</span><button onClick={() => showNotice(`${category}: thao tác quản lý danh mục trong bản demo.`)}>Quản lý <ChevronRight size={14} /></button></div></article>})}{filteredCategories.length === 0 && <div className="admin-empty"><Tags size={19} /><strong>Không tìm thấy danh mục</strong></div>}</section>}
        <footer className="admin-content-footer"><span>© 2026 LẠI Marketplace · Không gian quản trị bản demo</span><span><ShieldCheck size={13} /> Mọi thay đổi cần được kiểm tra bởi đội ngũ</span></footer>
      </div>
    </section>
  </main>
}
