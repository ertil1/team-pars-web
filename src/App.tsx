import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronDown, Download, Instagram, Linkedin, Mail, Menu, Send, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PodVisual from './components/PodVisual'
import { milestones, systems, team, tools } from './data'

gsap.registerPlugin(ScrollTrigger)

const TunnelScene = lazy(() => import('./components/TunnelScene'))

const nav = [
  ['01', 'Hakkımızda', 'about'], ['02', 'Pod & Teknoloji', 'technology'], ['03', 'Ekip', 'team'], ['04', 'Yol Haritası', 'roadmap'], ['05', 'Sponsorluk', 'sponsorship'],
]

const filters = ['Tüm Ekip', 'Mekanik', 'Elektromekanik', 'Elektronik Haberleşme', 'Sponsorluk']

function Logo() {
  return <a className="logo" href="#top" aria-label="Team PARS ana sayfa"><img src="/assets/team-pars-logo-white.png" alt="Team PARS Hyperloop" /></a>
}

function SectionHead({ index, eyebrow, title, lead }: { index: string; eyebrow: string; title: string; lead?: string }) {
  return <div className="section-head reveal"><div className="eyebrow"><span>{index}</span>{eyebrow}</div><h2>{title}</h2>{lead && <p>{lead}</p>}</div>
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const move = (e: MouseEvent) => gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: .16, ease: 'power2.out' })
    const over = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a,button,.system-card,.team-card')) dot.current?.classList.add('is-active') }
    const out = () => dot.current?.classList.remove('is-active')
    window.addEventListener('mousemove', move); document.addEventListener('mouseover', over); document.addEventListener('mouseout', out)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out) }
  }, [])
  return <div className="cursor" ref={dot} />
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [lang, setLang] = useState<'TR'|'EN'>('TR')
  const [filter, setFilter] = useState('Tüm Ekip')
  const [sent, setSent] = useState(false)
  const [clock, setClock] = useState('')
  const visibleTeam = useMemo(() => filter === 'Tüm Ekip' ? team : team.filter(x => x.dept === filter), [filter])

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    updateClock()
    const timer = window.setInterval(updateClock, 1000)
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => gsap.from(el, { y: 45, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } }))
      gsap.from('.timeline-fill', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 72%', end: 'bottom 65%', scrub: true } })
    })
    return () => { window.clearInterval(timer); lenis.destroy(); ctx.revert() }
  }, [])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`[Team PARS Web] ${fd.get('topic')} — ${fd.get('name')}`)
    const body = encodeURIComponent(`Ad Soyad: ${fd.get('name')}\nE-posta: ${fd.get('email')}\nKurum: ${fd.get('company')}\n\n${fd.get('message')}`)
    setSent(true)
    window.location.href = `mailto:ikcpars.info@gmail.com?subject=${subject}&body=${body}`
  }

  return <div id="top">
    <Cursor />
    <header className="nav-shell">
      <Logo />
      <nav className={menu ? 'nav-links open' : 'nav-links'} aria-label="Ana menü">
        {nav.map(([n, label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}><span>{n}.</span>{label}</a>)}
      </nav>
      <div className="nav-actions">
        <a className="deck-link" href="#sponsorship">Sponsorluk Dosyası <Download size={14}/></a>
        <button className="lang" onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} aria-label="Dil değiştir">{lang}<ChevronDown size={13}/></button>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Menüyü aç">{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="about">
        <div className="hero-canvas"><Suspense fallback={<div className="tunnel-fallback"/>}><TunnelScene /></Suspense></div>
        <div className="hero-shade" />
        <div className="hero-rail"><span>PARS / P-01</span><i/><span>38°25′N · 27°08′E</span></div>
        <div className="hero-content">
          <div className="hero-kicker"><span className="live-dot"/> İZMİR, TÜRKİYE <i/> HYPERLOOP DEVELOPMENT PROGRAM</div>
          <h1><span>EGE’NİN</span> TEKNOLOJİ GÜCÜ:<br/><em>GELECEĞİN ULAŞIM</em><br/>EKOSİSTEMİ</h1>
          <div className="hero-bottom">
            <p>455 başvuru arasından finale yükselen 24 ekipten biri. Performans kategorisinde <strong>242 takım arasında Türkiye 6’ncısı</strong>; İzmir ve Ege’nin tek finalisti.</p>
            <div className="hero-ctas"><a className="button primary" href="#technology">Anadolu Parsı’nı Keşfet <ArrowDown size={17}/></a><a className="button ghost" href="#contact">Sponsor Ol / İletişim <ArrowRight size={17}/></a></div>
          </div>
        </div>
        <div className="telemetry">
          {[['120+','km/h','HEDEF HIZ'],['06.','','TÜRKİYE DERECESİ'],['30','','TAKIM ÜYESİ'],['04','','ALT DİSİPLİN']].map(([v,u,l],i) => <div className="metric" key={l}><span>0{i+1}</span><strong>{v}<sup>{u}</sup></strong><small>{l}</small></div>)}
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="manifesto-mark">P</div>
        <div className="manifesto-copy reveal"><span className="mono">// MİSYON BRİFİNGİ</span><p>Bir aracı değil, disiplinlerin birlikte çalıştığı <em>yüksek hızlı bir mühendislik sistemi</em> geliştiriyoruz.</p></div>
        <div className="manifesto-note reveal"><span>ANADOLU PARSI DNA</span><p>Çevik. Hassas. Dayanıklı.</p></div>
      </section>

      <section className="technology section-pad" id="technology">
        <SectionHead index="02" eyebrow="PROJEMİZ & TEKNOLOJİ" title="TEK BİR POD.\nBİNLERCE KARAR." lead="Anadolu Parsı’nın her alt sistemi; hız, güvenlik ve test edilebilirlik dengesinde birlikte tasarlanıyor." />
        <div className="pod-stage reveal"><PodVisual /></div>
        <div className="systems-grid">
          {systems.map((item) => <article className="system-card reveal" key={item.id}><div className="system-top"><span>{item.id}</span><b>{item.code}</b></div><Zap className="system-icon"/><h3>{item.title}</h3><p>{item.desc}</p><ul>{item.specs.map(s => <li key={s}><i/>{s}</li>)}</ul><div className="card-line"/></article>)}
        </div>
        <div className="toolchain reveal"><span>ENGINEERING TOOLCHAIN</span><div>{tools.map(t => <b key={t}>{t}</b>)}</div></div>
      </section>

      <section className="team-section section-pad" id="team">
        <SectionHead index="03" eyebrow="30 KİŞİLİK ANADOLU PARSI KADROSU" title="DÖRT DİSİPLİN.\nTEK HEDEF." lead="Mekanik, elektromekanik, elektronik haberleşme ve sponsorluk ekipleri aynı yarış programında birlikte çalışıyor." />
        <div className="filters" role="tablist">{filters.map(f => <button role="tab" aria-selected={filter===f} className={filter===f?'active':''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
        <motion.div className="team-grid" layout>
          <AnimatePresence mode="popLayout">{visibleTeam.map((person, i) => <motion.article className="team-card" layout initial={{opacity:0, y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.97}} key={person.name}>
            <div className="team-image"><span className="team-index">P/{String(i+1).padStart(2,'0')}</span><div className="silhouette"><div/><i/></div><span className="cross c1">+</span><span className="cross c2">+</span><div className="scanline"/></div>
            <div className="team-info"><div><span>{person.code} / {person.dept}</span><h3>{person.name}</h3><p>{person.role}</p></div><button aria-label="LinkedIn profili yakında" title="Profil bağlantısı yakında"><Linkedin size={17}/></button></div>
          </motion.article>)}</AnimatePresence>
        </motion.div>
        <p className="team-note"><span>*</span> 30 kişilik güncel kadronun isimleri ve profil bağlantıları ekip verileriyle eklenecek.</p>
      </section>

      <section className="field-report section-pad" id="field-report">
        <SectionHead index="R/26" eyebrow="SAHADAN / TEKNOFEST 2026" title="TASARIMDAN\nGERÇEK TÜNELE." lead="Anadolu Parsı, 208 metrelik TÜBİTAK test tünelinde itki, haberleşme, hız, konumlandırma ve güvenli duruş kriterlerinde sınandı." />
        <div className="report-grid reveal">
          <figure className="report-main"><img src="/assets/pars-team-2026-2.webp" alt="Team PARS ekibi Anadolu Parsı podu ile TEKNOFEST 2026 alanında"/><figcaption><span>01 / FİNAL KADROSU</span><b>TÜBİTAK GEBZE · EYLÜL 2026</b></figcaption></figure>
          <div className="report-side"><figure><img src="/assets/pars-team-track.jpg" alt="Team PARS ekibi yarışma alanında pod üzerinde çalışırken"/><figcaption>02 / PİT OPERASYONU</figcaption></figure><figure><img src="/assets/pars-team-2026-1.webp" alt="Team PARS pod bakım ve kontrol çalışmaları"/><figcaption>03 / SİSTEM KONTROLÜ</figcaption></figure></div>
          <article className="press-card"><span>BASINDA TEAM PARS</span><strong>İzmirli genç mühendislerden TEKNOFEST’te büyük başarı</strong><p>Performans kategorisinde 242 takım arasından 6’ncı olan Team PARS, İzmir ve Ege Bölgesi’nden finale kalan tek ekip oldu.</p><a href="https://www.izmirdesondakika.com.tr/izmirli-genc-muhendislerden-teknofestte-buyuk-basari-455-takim-arasindan-siyrildilar" target="_blank" rel="noreferrer">Haberi Oku <ArrowRight size={16}/></a><small>Kaynak: İzmir’de Son Dakika · 10.09.2026</small></article>
        </div>
      </section>

      <section className="roadmap section-pad" id="roadmap">
        <SectionHead index="04" eyebrow="PROGRAM YOL HARİTASI" title="FİKİRDEN PİSTE." lead="Her kilometre taşı, Anadolu Parsı’nı yarış koşullarına bir adım daha yaklaştırıyor." />
        <div className="timeline">
          <div className="timeline-track"><div className="timeline-fill"/></div>
          {milestones.map((m,i) => <article className={`milestone ${m.state}`} key={m.date}><div className="time-node"><span>{String(i+1).padStart(2,'0')}</span></div><div className="milestone-body"><time>{m.date}</time><h3>{m.title}</h3><p>{m.text}</p>{m.state==='active' && <b><span/> YARIŞ SONUCU</b>}</div></article>)}
        </div>
      </section>

      <section className="sponsorship section-pad" id="sponsorship">
        <div className="sponsor-panel reveal">
          <div className="sponsor-main"><div className="eyebrow"><span>05</span>PARTNER EKOSİSTEMİ</div><h2>GELECEĞE<br/><em>ORTAK OLUN.</em></h2><p>Markanızı Türkiye’nin yeni nesil ulaşım teknolojileriyle aynı hatta buluşturun. Mühendislik, üretim ve yarış yolculuğumuzun parçası olun.</p><a className="button primary" href="#contact">Sponsorluk Görüşmesi <ArrowRight size={17}/></a></div>
          <div className="sponsor-files">
            <div className="files-head"><span>DOKÜMAN MERKEZİ</span><b>REV / 2026</b></div>
            <a className="file-placeholder ready" href="/sponsorship/team-pars-takim-tanitim-2026.pdf" download><div className="file-icon"><Download size={24}/></div><div><strong>Team PARS Takım Tanıtım Sunumu</strong><p>Takım, teknik ekipler, hedefler ve sponsorluk paketleri · 14 sayfa</p></div><span>PDF · 8.2 MB</span></a>
            <div className="sponsor-tiers">{['ELMAS / ANA SPONSOR','ALTIN','GÜMÜŞ','BRONZ'].map((t,i)=><div key={t}><span>0{i+1}</span><b>{t}</b><i/></div>)}</div>
            <p className="file-note">Yeni sponsorluk dosyaları aynı doküman merkezine sürüm bilgisiyle eklenebilir.</p>
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-copy reveal"><div className="eyebrow"><span>06</span>İLETİŞİM HATTI</div><h2>BİR SONRAKİ<br/>HAMLEYİ <em>BİRLİKTE</em><br/>YAPALIM.</h2><p>Sponsorluk, medya, kariyer veya teknik iş birliği için doğrudan ekibimize ulaşın.</p><div className="direct-links"><a href="mailto:ikcpars.info@gmail.com"><Mail/>ikcpars.info@gmail.com</a><a href="https://instagram.com/ikcpars" target="_blank" rel="noreferrer"><Instagram/>@ikcpars</a></div></div>
        <form className="contact-form reveal" onSubmit={submit}><div className="form-row"><label><span>AD SOYAD *</span><input name="name" required placeholder="Adınız ve soyadınız"/></label><label><span>E-POSTA *</span><input type="email" name="email" required placeholder="mail@kurum.com"/></label></div><div className="form-row"><label><span>KURUM / ŞİRKET</span><input name="company" placeholder="Kurum adı"/></label><label><span>KONU *</span><select name="topic" required defaultValue=""><option value="" disabled>Konu seçin</option><option>Sponsorluk</option><option>İletişim</option><option>Medya</option><option>Kariyer</option></select></label></div><label><span>MESAJ *</span><textarea name="message" required rows={5} placeholder="Projenizden veya iş birliği fikrinizden bahsedin."/></label><button className="button primary submit" type="submit">{sent ? <><Check size={17}/> E-posta hazırlandı</> : <>Mesaj Gönder <Send size={17}/></>}</button></form>
      </section>
    </main>

    <footer><Logo/><p>© 2026 TEAM PARS HYPERLOOP. TÜM HAKLARI SAKLIDIR.</p><div className="footer-status"><span className="live-dot"/> STATUS: POD DEVELOPMENT ACTIVE <i/> UTC+3 <b id="clock">{clock || 'İZMİR'}</b></div></footer>
  </div>
}
