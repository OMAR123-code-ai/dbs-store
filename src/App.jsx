import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import {
  Search, UserRound, MessageCircle, ShoppingCart, Menu, ChevronDown, ChevronRight,
  ShieldCheck, Truck, Headset, BadgeCheck, Smartphone, Shirt, Headphones, House,
  Sparkles, Dumbbell, Laptop, Grid2X2, Star, Minus, Plus, Trash2, X, Heart,
  Facebook, Instagram, Youtube, Clock3, LockKeyhole, CheckCircle2, ArrowLeft,
} from 'lucide-react'
import { getCatalog, createOrder } from './services/api.js'

const iconMap = { Smartphone, Shirt, Headphones, House, Sparkles, Dumbbell, Laptop, Grid2X2 }
const money = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'

function Brand() {
  return <Link to="/" className="brand" aria-label="Digital Business Store">
    <span className="brand-mark"><span>DBS</span></span>
    <span className="brand-copy"><b>DIGITAL<br/>BUSINESS STORE</b><small>L’innovation au service<br/>de votre quotidien</small></span>
  </Link>
}

function Header({ cartCount, onCart }) {
  return <>
    <div className="top-strip"><div className="container strip-inner">
      <span>🎁 Livraison rapide dans toute l’Afrique</span><i/> <span>Paiement sécurisé</span><i/> <span>Service client disponible 7j/7 - 24h/24</span>
      <b>Offre exclusive : jusqu’à -50% sur une sélection d’articles !</b>
    </div></div>
    <header className="main-header"><div className="container header-inner">
      <Brand />
      <div className="searchbox"><input placeholder="Rechercher un produit, une marque, une catégorie..."/><button><Search size={20}/></button></div>
      <div className="header-actions">
        <button><UserRound/><span>Compte</span></button>
        <button><MessageCircle/><span>Contact</span></button>
        <button className="cart-action" onClick={onCart}><ShoppingCart/><span>Panier</span>{cartCount > 0 && <em>{cartCount}</em>}</button>
      </div>
    </div></header>
    <nav className="nav"><div className="container nav-inner">
      <button className="all-cats"><Menu size={19}/> Toutes les catégories <ChevronDown size={16}/></button>
      <Link className="active" to="/">Accueil</Link><a href="#featured">Électronique</a><a href="#collections">Mode & Accessoires</a><a href="#collections">Maison & Lifestyle</a><a href="#featured">Promotions</a><a href="#footer">À propos</a>
    </div></nav>
  </>
}

function Hero() {
  return <section className="container hero-wrap">
    <div className="hero">
      <div className="hero-content"><h1>Des produits de qualité<br/>pour un quotidien <strong>meilleur</strong></h1><p>Électronique • Mode & Accessoires • Maison • Lifestyle</p><a href="#featured" className="primary-btn">Découvrir maintenant <ChevronRight size={18}/></a></div>
      <div className="hero-products"><img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85" alt="Produits high-tech"/></div>
      <button className="hero-arrow left">‹</button><button className="hero-arrow right">›</button>
      <div className="hero-dots"><b></b><i></i><i></i><i></i></div>
    </div>
    <div className="trustbar">
      <div><BadgeCheck/><span><b>Meilleure qualité</b><small>Garantie</small></span></div>
      <div><Truck/><span><b>Livraison rapide</b><small>Partout en Afrique</small></span></div>
      <div><ShieldCheck/><span><b>Paiement sécurisé</b><small>DBS Payment</small></span></div>
      <div><Headset/><span><b>Assistance 7j/7</b><small>WhatsApp & Contact</small></span></div>
    </div>
  </section>
}

function Categories({ categories }) {
  return <section className="container category-grid">{categories.map(c => {
    const Icon = iconMap[c.icon] || Grid2X2
    return <a key={c.id} href="#featured" className="category-card"><Icon/><span>{c.label}</span></a>
  })}</section>
}

function Stars({ rating }) {
  return <span className="stars">★★★★★ <em>{rating}</em></span>
}

function ProductCard({ p, onAdd }) {
  return <article className="product-card">
    <Link to={`/product/${p.slug}`} className="product-image"><img src={p.image} alt={p.name}/><span className={p.badge === 'Nouveau' ? 'badge new' : 'badge'}>{p.badge}</span><button className="wish" onClick={(e)=>e.preventDefault()} aria-label="Ajouter aux favoris"><Heart size={17}/></button></Link>
    <div className="product-body"><Link to={`/product/${p.slug}`} className="product-name">{p.name}</Link><Stars rating={p.rating}/><div className="prices"><strong>{money(p.price)}</strong><del>{money(p.compareAt)}</del></div><button className="add-btn" onClick={()=>onAdd(p)}><ShoppingCart size={17}/> Ajouter au panier</button></div>
  </article>
}

function SectionTitle({ title, link='Voir tout' }) {
  return <div className="section-title"><h2>{title}</h2><a href="#featured">{link} <ChevronRight size={15}/></a></div>
}

function Collections() {
  return <section className="container" id="collections"><div className="collection-grid">
    <div className="collection"><span><b>Collection Électronique</b><small>Technologie et innovation</small><a href="#featured">Découvrir →</a></span><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85" alt="Électronique"/></div>
    <div className="collection"><span><b>Collection Mode</b><small>Style & élégance</small><a href="#featured">Découvrir →</a></span><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85" alt="Mode"/></div>
    <div className="collection"><span><b>Maison & Lifestyle</b><small>Confort au quotidien</small><a href="#featured">Découvrir →</a></span><img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=85" alt="Lifestyle"/></div>
  </div></section>
}

function Reviews() {
  const reviews = [
    ['Mamadou S.','Produits de très bonne qualité et livraison rapide. Je recommande vivement DBS !'],
    ['Aïcha K.','Service client au top, j’ai reçu mon colis en moins de 5 jours. Merci DBS !'],
    ['Issa T.','Je suis très satisfait de mon achat. Le paiement via mobile money est simple et rapide.'],
  ]
  return <section className="container reviews"><SectionTitle title="Ce que disent nos clients" link="Voir tous les avis"/><div className="review-grid">{reviews.map(([name,text])=><article key={name}><div className="avatar">{name[0]}</div><div><b>{name}</b><div className="review-stars">★★★★★</div><p>{text}</p><small>Il y a 3 jours</small></div></article>)}</div></section>
}

function FAQNewsletter() {
  return <section className="container bottom-panels"><div className="faq"><h3>Questions fréquentes</h3>{['Quels sont vos délais de livraison ?','Quels moyens de paiement acceptez-vous ?','Puis-je retourner un produit ?','Comment suivre ma commande ?'].map(q=><details key={q}><summary>{q}<Plus size={16}/></summary><p>Notre équipe vous accompagne rapidement. Contactez-nous via WhatsApp pour une réponse personnalisée.</p></details>)}</div><div className="newsletter"><div><h3>Restez informé de nos offres exclusives</h3><p>Inscrivez-vous à notre newsletter et recevez nos meilleures offres.</p><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Votre adresse e-mail"/><button>S’abonner</button></form></div><div className="newsletter-person">✨</div></div></section>
}

function Footer() {
  return <footer id="footer"><div className="container footer-grid"><Brand/><div><b>Liens utiles</b><a href="#">Accueil</a><a href="#featured">Boutique</a><a href="#">À propos</a><a href="#">FAQ</a><a href="#">Contact</a></div><div><b>Catégories</b><a href="#featured">Électronique</a><a href="#featured">Mode & Accessoires</a><a href="#featured">Maison & Lifestyle</a><a href="#featured">Promotions</a><a href="#featured">Nouveautés</a></div><div><b>Service client</b><a href="#">Livraison</a><a href="#">Retours & échanges</a><a href="#">Suivi de commande</a><a href="#">Questions fréquentes</a><a href="#">Politique de confidentialité</a></div><div><b>Suivez-nous</b><div className="socials"><Facebook/><Instagram/><Youtube/></div></div></div><div className="container footer-bottom"><span>© 2026 Digital Business Store. Tous droits réservés.</span><span>Burkina Faso • Afrique • Monde</span></div></footer>
}

function Home({ catalog, onAdd }) {
  const featured = catalog.products.filter(p=>p.featured).slice(0,5)
  const best = catalog.products.filter(p=>p.bestseller).slice(0,4)
  const fresh = catalog.products.filter(p=>p.new).slice(0,4)
  return <><Hero/><Categories categories={catalog.categories}/><main id="featured" className="container"><SectionTitle title="Produits en vedette"/><div className="product-grid">{featured.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd}/>)}</div></main><Collections/><section className="container split-products"><div><SectionTitle title="Meilleures ventes"/><div className="mini-grid">{best.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd}/>)}</div></div><div><SectionTitle title="Nouveautés"/><div className="mini-grid">{fresh.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd}/>)}</div></div></section><Reviews/><FAQNewsletter/></>
}

function ProductPage({ catalog, onAdd }) {
  const { slug } = useParams(); const navigate = useNavigate()
  const product = catalog.products.find(p=>p.slug===slug) || catalog.products[0]
  const [qty,setQty] = useState(1); const [variant,setVariant] = useState(product?.variants?.[0])
  if (!product) return <main className="container loading">Chargement…</main>
  const related = catalog.products.filter(p=>p.category===product.category && p.id!==product.id).slice(0,4)
  return <main className="container product-page"><button className="back" onClick={()=>navigate(-1)}><ArrowLeft size={17}/> Retour</button><div className="breadcrumbs">Accueil <ChevronRight size={13}/> {product.category} <ChevronRight size={13}/> {product.name}</div><section className="product-detail"><div className="main-photo"><img src={product.image} alt={product.name}/></div><div className="detail-info"><h1>{product.name}</h1><div className="rating-row"><Stars rating={product.rating}/><span>({product.reviews} avis)</span></div><div className="detail-price"><strong>{money(product.price)}</strong><del>{money(product.compareAt)}</del><span>-{product.discount}%</span></div><ul className="quick-specs">{Object.entries(product.specs).map(([k,v])=><li key={k}><CheckCircle2 size={15}/><b>{k} :</b> {v}</li>)}</ul><div className="variant"><b>Option :</b><div>{product.variants?.map(v=><button className={v===variant?'selected':''} key={v} onClick={()=>setVariant(v)}>{v}</button>)}</div></div><div className="quantity"><b>Quantité :</b><div><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus/></button></div></div><div className="detail-actions"><button className="buy" onClick={()=>onAdd(product,qty)}><ShoppingCart/> Ajouter au panier</button><button className="buy-now" onClick={()=>onAdd(product,qty,true)}>⚡ Acheter maintenant</button></div><div className="detail-trust"><span><Truck/> Livraison rapide</span><span><LockKeyhole/> Paiement sécurisé</span><span><Headset/> Assistance 7j/7</span></div></div></section><section className="description-box"><div className="tabs"><b>Description</b><span>Avis ({product.reviews})</span><span>Livraison</span><span>Retours</span></div><p>{product.description}</p></section>{related.length>0 && <section><SectionTitle title="Produits similaires"/><div className="product-grid related">{related.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd}/>)}</div></section>}</main>
}

function CartDrawer({ items, open, onClose, onQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((s,i)=>s+i.price*i.qty,0); const delivery = items.length?5000:0
  return <><div className={`overlay ${open?'show':''}`} onClick={onClose}/><aside className={`cart-drawer ${open?'open':''}`}><div className="drawer-head"><h3>Votre panier ({items.reduce((s,i)=>s+i.qty,0)})</h3><button onClick={onClose}><X/></button></div><div className="cart-items">{items.length===0?<div className="empty"><ShoppingCart size={48}/><p>Votre panier est vide</p></div>:items.map(i=><div className="cart-line" key={i.id}><img src={i.image} alt={i.name}/><div><b>{i.name}</b><span>{money(i.price)}</span><div className="line-qty"><button onClick={()=>onQty(i.id,-1)}><Minus/></button><em>{i.qty}</em><button onClick={()=>onQty(i.id,1)}><Plus/></button></div></div><button className="trash" onClick={()=>onRemove(i.id)}><Trash2/></button></div>)}</div>{items.length>0&&<div className="cart-summary"><div><span>Sous-total</span><b>{money(subtotal)}</b></div><div><span>Livraison</span><b>{money(delivery)}</b></div><div className="total"><span>Total</span><strong>{money(subtotal+delivery)}</strong></div><button onClick={onCheckout}>Passer au paiement</button></div>}</aside></>
}

function Checkout({ items, onClose, onDone }) {
  const [method,setMethod]=useState('orange'); const [busy,setBusy]=useState(false)
  const total=items.reduce((s,i)=>s+i.price*i.qty,0)+5000
  async function pay(){setBusy(true); const r=await createOrder({items,total,method});setBusy(false);onDone(r)}
  return <div className="checkout"><div className="checkout-card"><button className="close-checkout" onClick={onClose}><X/></button><Brand/><h2><LockKeyhole/> DBS PAYMENT</h2><div className="order-ref"><span>Commande DBS</span><b>Montant total : {money(total)}</b></div><h3>Choisissez votre moyen de paiement</h3>{[['orange','Orange Money'],['moov','Moov Money'],['wave','Wave']].map(([id,label])=><button key={id} className={`pay-method ${method===id?'chosen':''}`} onClick={()=>setMethod(id)}><span className={`pay-logo ${id}`}>{id==='orange'?'OM':id==='moov'?'MM':'W'}</span><b>{label}</b><i>{method===id?'●':'○'}</i></button>)}<button className="pay-now" onClick={pay} disabled={busy}>{busy?'Traitement...':'Payer maintenant'}</button><div className="checkout-steps"><span><ShieldCheck/>Paiement sécurisé</span><span><Clock3/>Transactions rapides</span><span><Headset/>Assistance 7j/7</span></div></div></div>
}

export default function App() {
  const [catalog,setCatalog]=useState({categories:[],products:[]})
  const [cart,setCart]=useState([]); const [cartOpen,setCartOpen]=useState(false)
  const [checkout,setCheckout]=useState(false); const [notice,setNotice]=useState('')
  useEffect(()=>{getCatalog().then(setCatalog)},[])
  const count=useMemo(()=>cart.reduce((s,i)=>s+i.qty,0),[cart])
  function add(p,qty=1,buyNow=false){setCart(c=>{const found=c.find(i=>i.id===p.id);return found?c.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i):[...c,{...p,qty}]}); if(buyNow)setCheckout(true); else setCartOpen(true)}
  function qty(id,d){setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i))}
  function remove(id){setCart(c=>c.filter(i=>i.id!==id))}
  function done(r){setCheckout(false);setCart([]);setNotice(`Commande ${r.orderId} enregistrée avec succès`);setTimeout(()=>setNotice(''),5000)}
  return <div className="app"><Header cartCount={count} onCart={()=>setCartOpen(true)}/><Routes><Route path="/" element={<Home catalog={catalog} onAdd={add}/>}/><Route path="/product/:slug" element={<ProductPage catalog={catalog} onAdd={add}/>}/></Routes><Footer/><a className="whatsapp" href="https://wa.me/22673192633" target="_blank" rel="noreferrer" aria-label="Contacter DBS sur WhatsApp"><MessageCircle/> WhatsApp</a><CartDrawer items={cart} open={cartOpen} onClose={()=>setCartOpen(false)} onQty={qty} onRemove={remove} onCheckout={()=>{setCartOpen(false);setCheckout(true)}}/>{checkout&&<Checkout items={cart} onClose={()=>setCheckout(false)} onDone={done}/>} {notice&&<div className="toast"><CheckCircle2/>{notice}</div>}</div>
}
