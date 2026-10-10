import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Download, Gauge, Instagram, Leaf, Linkedin, Magnet, Mail, Menu, Send, ShieldCheck, X, Zap } from 'lucide-react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { milestones, systems, team, tools } from './data'

gsap.registerPlugin(ScrollTrigger)

const PodVisual = lazy(() => import('./components/PodVisual'))
const publicUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

const nav = [
  { tr: 'Hakkımızda', en: 'About', id: 'about' },
  { tr: 'Hyperloop', en: 'Hyperloop', id: 'hyperloop' },
  { tr: 'Pod ve Teknoloji', en: 'Pod & Technology', id: 'technology' },
  { tr: 'Ekip', en: 'Team', id: 'team' },
  { tr: 'Yol Haritası', en: 'Roadmap', id: 'roadmap' },
  { tr: 'Sponsorluk', en: 'Partnerships', id: 'sponsorship' },
]

const filters = ['Tüm Ekip', 'Mekanik', 'Elektromekanik', 'Elektronik Haberleşme', 'Sponsorluk']

const filterLabels: Record<string, string> = {
  'Tüm Ekip': 'All Teams',
  Mekanik: 'Mechanical',
  Elektromekanik: 'Electromechanical',
  'Elektronik Haberleşme': 'Electronics & Communications',
  Sponsorluk: 'Partnerships',
}

const systemEN: Record<string, { title: string; desc: string; specs: string[] }> = {
  MEC: { title: 'Mechanical Systems', desc: 'Aerodynamic shell, optimised chassis and safety-led braking architecture.', specs: ['Aerodynamic body', 'Chassis optimisation', 'Mechanical braking'] },
  PWR: { title: 'Power & Magnetic Systems', desc: 'Safe power distribution from battery to rail, supported by magnetic levitation.', specs: ['High-voltage battery', 'BMS & PDU', 'MagLev'] },
  CTL: { title: 'Control & Communications', desc: 'Real-time sensing, state estimation and trackside telemetry.', specs: ['STM32', 'Sensor fusion', 'CAN Bus telemetry'] },
}

const teamEN: Record<string, [string, string, string]> = {
  MEC: ['Mechanical Design', 'Chassis, shell & structural analysis', 'Mechanical'],
  MFG: ['Manufacturing & Integration', 'Fabrication, assembly & testing', 'Mechanical'],
  PWR: ['Power Systems', 'Battery, BMS & power distribution', 'Electromechanical'],
  DRV: ['Propulsion & Braking', 'Motor, MagLev & safe stop', 'Electromechanical'],
  EMB: ['Embedded Systems', 'STM32, sensors & control boards', 'Electronics & Communications'],
  TEL: ['Telemetry', 'CAN Bus, ground station & data', 'Electronics & Communications'],
  PRT: ['Corporate Relations', 'Partnerships & collaborations', 'Partnerships'],
  COM: ['Media & Operations', 'Communications, events & team planning', 'Partnerships'],
}

const milestoneEN: Record<string, [string, string]> = {
  'AĞU 2024': ['Foundation', 'Team PARS was established at İzmir Kâtip Çelebi University.'],
  'OCA 2025': ['Design & Analysis', 'ANSYS and CATIA simulations were completed.'],
  'ŞUB — AĞU 2026': ['Manufacturing & Testing', 'Prototype manufacturing, integration and field validation.'],
  'EYL 2026': ['6th in Türkiye', '6th place among 242 teams in the Performance category.'],
  '2027 PROGRAMI': ['Next Development Cycle', 'System improvements guided by track data and new targets.'],
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Team PARS ana sayfa">
      <img src={publicUrl('assets/team-pars-logo-white.png')} alt="" />
      <span>TEAM PARS</span>
    </a>
  )
}

function SectionHead({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <div className="section-head reveal">
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  )
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [lang, setLang] = useState<'TR' | 'EN'>('TR')
  const [filter, setFilter] = useState('Tüm Ekip')
  const [conceptIndex, setConceptIndex] = useState(0)
  const [conceptDirection, setConceptDirection] = useState(1)
  const [sent, setSent] = useState(false)
  const [clock, setClock] = useState('')
  const en = lang === 'EN'
  const visibleTeam = useMemo(() => filter === 'Tüm Ekip' ? team : team.filter((item) => item.dept === filter), [filter])

  const changeConcept = (next: number) => {
    setConceptDirection(next > conceptIndex || (conceptIndex === 2 && next === 0) ? 1 : -1)
    setConceptIndex((next + 3) % 3)
  }

  useEffect(() => {
    document.documentElement.lang = en ? 'en' : 'tr'
    document.title = en ? 'Team PARS Hyperloop | Aegean Engineering' : 'Team PARS Hyperloop | Ege Bölgesinin Teknoloji Gücü'
  }, [en])

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    updateClock()
    const timer = window.setInterval(updateClock, 1000)
    const lenis = new Lenis({ duration: 0.85, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.from(element, { y: 24, opacity: 0, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
      })
    })
    return () => { window.clearInterval(timer); cancelAnimationFrame(frame); lenis.destroy(); context.revert() }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setConceptDirection(1)
      setConceptIndex((current) => (current + 1) % 3)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`[Team PARS Web] ${data.get('topic')} — ${data.get('name')}`)
    const body = encodeURIComponent(`Ad Soyad: ${data.get('name')}\nE-posta: ${data.get('email')}\nKurum: ${data.get('company')}\n\n${data.get('message')}`)
    setSent(true)
    window.location.href = `mailto:ikcpars.info@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div id="top">
      <header className="site-header">
        <div className="nav-inner">
          <Logo />
          <nav className={menu ? 'nav-links open' : 'nav-links'} aria-label={en ? 'Main menu' : 'Ana menü'}>
            {nav.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenu(false)}>{en ? item.en : item.tr}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="nav-download" href={publicUrl('sponsorship/team-pars-takim-tanitim-2026.pdf')} download>{en ? 'Partnership deck' : 'Sponsorluk dosyası'} <Download size={15} /></a>
            <button className="lang" onClick={() => setLang(en ? 'TR' : 'EN')}>{lang}</button>
            <button className="menu-button" onClick={() => setMenu(!menu)} aria-label={en ? 'Open menu' : 'Menüyü aç'}>{menu ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="about">
          <img className="hero-image" src={publicUrl('assets/presentation-team.jpg')} alt="İzmir Kâtip Çelebi Üniversitesi Team PARS ekibi ve geliştirdikleri araç" />
          <div className="hero-overlay" />
          <div className="hero-inner">
            <p className="hero-kicker">{en ? 'İZMİR KÂTİP ÇELEBİ UNIVERSITY' : 'İZMİR KÂTİP ÇELEBİ ÜNİVERSİTESİ'}</p>
            <h1>{en ? <>THE AEGEAN REGION’S<br /><span>ENGINEERING POWER</span></> : <>EGE BÖLGESİNİN<br /><span>TEKNOLOJİ GÜCÜ</span></>}</h1>
            <p className="hero-lead">{en ? 'A 30-person student engineering team developing next-generation transportation systems through multidisciplinary design, manufacturing and testing.' : 'İzmir Kâtip Çelebi Üniversitesi öğrencilerinden oluşan 30 kişilik mühendislik ekibi; yeni nesil ulaşım sistemlerini tasarım, üretim ve test süreçleriyle geliştiriyor.'}</p>
            <div className="hero-actions">
              <a className="button primary" href="#technology">{en ? 'Explore the vehicle' : 'Aracı incele'} <ArrowDown size={17} /></a>
              <a className="text-link" href="#contact">{en ? 'Partnership contact' : 'Sponsorluk iletişimi'} <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="overview section-wrap">
          <div className="overview-copy reveal">
            <span className="section-label">TEAM PARS HYPERLOOP</span>
            <h2>{en ? 'Engineering built around one shared objective.' : 'Ortak bir hedef etrafında çalışan mühendislik takımı.'}</h2>
            <p>{en ? 'Mechanical, electromechanical, electronics-communications and partnerships teams develop the project together from the first analysis to track validation.' : 'Mekanik, elektromekanik, elektronik haberleşme ve sponsorluk ekipleri; ilk analizden pist doğrulamasına kadar projeyi birlikte geliştiriyor.'}</p>
          </div>
          <div className="stats-grid reveal">
            {(en ? [['120+', 'km/h target speed'], ['6th', 'Türkiye ranking'], ['30', 'team members'], ['4', 'disciplines']] : [['120+', 'km/h hedef hız'], ['6.', 'Türkiye derecesi'], ['30', 'takım üyesi'], ['4', 'alt disiplin']]).map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section className="concept section-wrap" id="hyperloop">
          <div className="concept-heading reveal"><span className="section-label">01 · HYPERLOOP</span><h2>{en ? 'The principles behind the system.' : 'Sistemin çalışma prensipleri.'}</h2><p>{en ? 'Move through the presentation by dragging or using the controls.' : 'Sunumu sürükleyerek veya kontrolleri kullanarak ilerleyin.'}</p></div>
          <div className="concept-shell reveal">
            <AnimatePresence mode="wait" custom={conceptDirection}>
              <motion.article
                className="concept-slide"
                key={conceptIndex}
                custom={conceptDirection}
                variants={{ enter: (direction: number) => ({ x: direction * 140, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (direction: number) => ({ x: direction * -140, opacity: 0 }) }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={.12}
                onDragEnd={(_, info) => { if (info.offset.x < -70) changeConcept(conceptIndex + 1); if (info.offset.x > 70) changeConcept(conceptIndex - 1) }}
              >
                {conceptIndex === 0 && <>
                  <div className="concept-title"><span>01 / 03</span><h3>{en ? <>A capsule that <em>glides</em> inside a tube</> : <>Tüp içinde <em>süzülen</em> bir kapsül</>}</h3><p>{en ? <>Hyperloop moves vehicles at high speed inside a <b>low-pressure tube</b>, without direct contact with the rail.</> : <>Hyperloop; kapsüllerin <b>düşük basınçlı bir tüp</b> içinde, <b>raya temas etmeden</b> yüksek hızlarla ilerlediği yeni nesil bir ulaşım sistemidir.</>}</p></div>
                  <div className="concept-tube"><img src={publicUrl('assets/pod-side-profile.png')} alt="Team PARS kapsülünün tüp içindeki yan görünümü" /></div>
                  <div className="concept-pillars">
                    <div><i><Clock3 /></i><span><strong>{en ? 'Low pressure' : 'Düşük basınç'}</strong><small>{en ? 'Reduced air resistance inside the tube.' : 'Tüp içindeki hava direnci büyük ölçüde azalır.'}</small></span></div>
                    <div><i><Magnet /></i><span><strong>{en ? 'Magnetic levitation' : 'Manyetik süzülme'}</strong><small>{en ? 'The vehicle advances without rail contact.' : 'Kapsül raya temas etmeden ilerler.'}</small></span></div>
                    <div><i><Zap /></i><span><strong>{en ? 'Electric propulsion' : 'Elektrikli itiş'}</strong><small>{en ? 'Electric motors provide controlled acceleration.' : 'Elektrik motorları kontrollü ivmelenme sağlar.'}</small></span></div>
                  </div>
                </>}
                {conceptIndex === 1 && <>
                  <div className="concept-title compact"><span>02 / 03</span><h3>{en ? <>Why does it <em>matter?</em></> : <>Neden <em>önemli?</em></>}</h3><p>{en ? 'Its architecture brings speed, energy efficiency and controlled operating conditions into one transport system.' : 'Mimarisi; hız, enerji verimliliği ve kontrollü çalışma koşullarını tek bir ulaşım sisteminde birleştirir.'}</p></div>
                  <div className="benefit-grid">
                    <div><i><Gauge /></i><strong>{en ? 'Speed' : 'Hız'}</strong><p>{en ? 'High-speed ground transportation potential.' : 'Yüksek hızlı kara ulaşımı potansiyeli.'}</p></div>
                    <div><i><Zap /></i><strong>{en ? 'Efficiency' : 'Verimlilik'}</strong><p>{en ? 'Lower resistance means lower energy loss.' : 'Düşük direnç, daha az enerji kaybı anlamına gelir.'}</p></div>
                    <div><i><Leaf /></i><strong>{en ? 'Electric system' : 'Elektrikli sistem'}</strong><p>{en ? 'Compatible with renewable electricity.' : 'Yenilenebilir elektrik kaynaklarıyla uyumludur.'}</p></div>
                    <div><i><ShieldCheck /></i><strong>{en ? 'Controlled line' : 'Kontrollü hat'}</strong><p>{en ? 'The enclosed tube limits environmental effects.' : 'Kapalı tüp dış ortam etkilerini sınırlar.'}</p></div>
                  </div>
                </>}
                {conceptIndex === 2 && <>
                  <div className="concept-title compact"><span>03 / 03</span><h3>{en ? <>From an idea to an <em>engineering field</em></> : <>Bir fikirden <em>mühendislik alanına</em></>}</h3><p>{en ? 'The concept developed through successive research, prototype and student competition programmes.' : 'Kavram; araştırma, prototip ve öğrenci yarışma programlarıyla gelişti.'}</p></div>
                  <div className="history-track">
                    {(en ? [['1799','Pneumatic tube transport idea'],['1904','Vacuum train concept'],['2013','Hyperloop Alpha report'],['2015','Student engineering competitions'],['2020','First passenger test'],['TODAY','National research programmes']] : [['1799','Pnömatik tüp içi taşıma fikri'],['1904','Vakumlu tren tasarımı'],['2013','Hyperloop Alpha raporu'],['2015','Öğrenci mühendislik yarışmaları'],['2020','İlk yolculu test'],['BUGÜN','Ulusal araştırma programları']]).map(([year, text]) => <div key={year}><strong>{year}</strong><i /><p>{text}</p></div>)}
                  </div>
                </>}
              </motion.article>
            </AnimatePresence>
          </div>
          <div className="concept-controls reveal">
            <button onClick={() => changeConcept(conceptIndex - 1)} aria-label={en ? 'Previous slide' : 'Önceki slayt'}><ChevronLeft /></button>
            <div>{[0, 1, 2].map((index) => <button key={index} className={conceptIndex === index ? 'active' : ''} onClick={() => changeConcept(index)} aria-label={`${index + 1}. slayt`} />)}</div>
            <span><b>{String(conceptIndex + 1).padStart(2, '0')}</b> / 03</span>
            <button onClick={() => changeConcept(conceptIndex + 1)} aria-label={en ? 'Next slide' : 'Sonraki slayt'}><ChevronRight /></button>
          </div>
        </section>

        <section className="technology section-wrap" id="technology">
          <SectionHead
            label={en ? 'VEHICLE & TECHNOLOGY' : 'ARAÇ & TEKNOLOJİ'}
            title={en ? 'Anadolu Parsı, developed as one integrated system.' : 'Tek bir sistem olarak geliştirilen Anadolu Parsı.'}
            lead={en ? 'Explore the original Team PARS 3D model. Rotate, zoom and inspect the vehicle directly in the browser.' : 'Team PARS’ın özgün 3D modelini tarayıcı üzerinde döndürün, yakınlaştırın ve doğrudan inceleyin.'}
          />
          <div className="pod-stage reveal"><Suspense fallback={<div className="model-loading"><span />{en ? 'LOADING 3D MODEL' : '3D MODEL YÜKLENİYOR'}</div>}><PodVisual /></Suspense></div>
          <figure className="vehicle-profile reveal">
            <div><span className="section-label">{en ? 'VEHICLE PROFILE' : 'ARAÇ PROFİLİ'}</span><h3>{en ? 'The vehicle developed for the competition track.' : 'Yarış pisti için geliştirilen gerçek araç.'}</h3><p>{en ? 'The side profile from the Team PARS presentation shows the final shell, university identity and competition livery.' : 'Team PARS sunumundaki yan görünüş; son kabuk formunu, üniversite kimliğini ve yarış kaplamasını birlikte gösteriyor.'}</p></div>
            <img src={publicUrl('assets/pod-side-profile.png')} alt="Team PARS yarış aracının yandan görünümü" />
          </figure>
          <div className="systems-grid">
            {systems.map((item) => {
              const content = en ? systemEN[item.code] : item
              return <article className="system-card reveal" key={item.id}><span className="system-code">{item.code}</span><h3>{content.title}</h3><p>{content.desc}</p><ul>{content.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul></article>
            })}
          </div>
          <div className="toolchain reveal"><span>{en ? 'Engineering tools' : 'Mühendislik araçları'}</span><div>{tools.map((tool) => <b key={tool}>{tool}</b>)}</div></div>
        </section>

        <section className="field-report section-wrap">
          <SectionHead
            label={en ? 'FIELD REPORT / TEKNOFEST 2026' : 'SAHADAN / TEKNOFEST 2026'}
            title={en ? 'From engineering work to the test tunnel.' : 'Mühendislik masasından test tüneline.'}
            lead={en ? 'The project was validated for propulsion, communications, speed, positioning and safe stopping in TÜBİTAK’s 208-metre test tunnel.' : 'Proje; TÜBİTAK’ın 208 metrelik test tünelinde itki, haberleşme, hız, konumlandırma ve güvenli duruş kriterlerinde sınandı.'}
          />
          <div className="report-grid reveal">
            <figure className="report-main"><img src={publicUrl('assets/presentation-work.jpg')} alt="Team PARS ekibi açık şasi üzerinde teknik sunum yaparken" /><figcaption>{en ? 'Engineering presentation' : 'Mühendislik sunumu'} · TÜBİTAK GEBZE</figcaption></figure>
            <figure><img src={publicUrl('assets/presentation-team.jpg')} alt="Team PARS yarış ekibi ve araç" /><figcaption>{en ? 'Competition team' : 'Yarış ekibi'}</figcaption></figure>
            <article className="press-card">
              <span>{en ? 'IN THE PRESS' : 'BASINDA TEAM PARS'}</span>
              <h3>{en ? '6th place among 242 teams in the Performance category.' : 'Performans kategorisinde 242 takım arasından Türkiye 6’ncılığı.'}</h3>
              <p>{en ? 'Team PARS became the only finalist from İzmir and the Aegean Region.' : 'Team PARS, İzmir ve Ege Bölgesi’nden finale kalan tek ekip oldu.'}</p>
              <a href="https://www.izmirdesondakika.com.tr/izmirli-genc-muhendislerden-teknofestte-buyuk-basari-455-takim-arasindan-siyrildilar" target="_blank" rel="noreferrer">{en ? 'Read the article' : 'Haberi incele'} <ArrowRight size={16} /></a>
            </article>
          </div>
        </section>

        <section className="team-section section-wrap" id="team">
          <SectionHead
            label={en ? '30-PERSON STUDENT TEAM' : '30 KİŞİLİK ÖĞRENCİ EKİBİ'}
            title={en ? 'Four disciplines. One engineering programme.' : 'Dört disiplin. Tek mühendislik programı.'}
            lead={en ? 'The team brings together İzmir Kâtip Çelebi University students from technical and corporate disciplines.' : 'Team PARS, İzmir Kâtip Çelebi Üniversitesi öğrencilerini teknik ve kurumsal disiplinlerde bir araya getiriyor.'}
          />
          <div className="filters" role="tablist">{filters.map((item) => <button role="tab" aria-selected={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{en ? filterLabels[item] : item}</button>)}</div>
          <motion.div className="team-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleTeam.map((person) => <motion.article className="team-card" layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key={person.name}>
                <div className="team-code">{person.code}</div>
                <div className="team-info"><span>{en ? teamEN[person.code][2] : person.dept}</span><h3>{en ? teamEN[person.code][0] : person.name}</h3><p>{en ? teamEN[person.code][1] : person.role}</p></div>
                <button aria-label={en ? 'LinkedIn profile coming soon' : 'LinkedIn profili yakında'} title={en ? 'Profile link coming soon' : 'Profil bağlantısı yakında'}><Linkedin size={17} /></button>
              </motion.article>)}
            </AnimatePresence>
          </motion.div>
          <p className="team-note">{en ? 'Member names and profile links will be published with the approved team roster.' : 'Üye isimleri ve profil bağlantıları, onaylı takım kadrosuyla birlikte yayımlanacaktır.'}</p>
        </section>

        <section className="roadmap section-wrap" id="roadmap">
          <SectionHead
            label={en ? 'PROGRAM ROADMAP' : 'PROGRAM YOL HARİTASI'}
            title={en ? 'A programme measured by completed work.' : 'Tamamlanan çalışmalarla ölçülen gelişim programı.'}
          />
          <div className="timeline reveal">
            {milestones.map((milestone) => <article className={`milestone ${milestone.state}`} key={milestone.date}><time>{milestone.date}</time><span className="timeline-dot" /><h3>{en ? milestoneEN[milestone.date][0] : milestone.title}</h3><p>{en ? milestoneEN[milestone.date][1] : milestone.text}</p></article>)}
          </div>
          <div className="achievement reveal"><img src={publicUrl('assets/teknofest-patch-2026.png')} alt="TEKNOFEST Hyperloop 2026 Team PARS arması" /><div><span className="section-label">TEKNOFEST HYPERLOOP 2026</span><h3>{en ? 'A result earned through design, production and field testing.' : 'Tasarım, üretim ve saha testleriyle kazanılan Türkiye 6’ncılığı.'}</h3></div></div>
        </section>

        <section className="sponsorship section-wrap" id="sponsorship">
          <div className="sponsor-panel reveal">
            <div className="sponsor-copy">
              <span className="section-label">{en ? 'PARTNERSHIP' : 'SPONSORLUK'}</span>
              <h2>{en ? 'Support the next development cycle.' : 'Yeni geliştirme dönemine ortak olun.'}</h2>
              <p>{en ? 'Partner with an engineering programme built by İzmir Kâtip Çelebi University students across design, manufacturing and competition.' : 'İzmir Kâtip Çelebi Üniversitesi öğrencilerinin tasarım, üretim ve yarış süreçlerinde geliştirdiği mühendislik programına destek verin.'}</p>
              <a className="button light" href="#contact">{en ? 'Contact the team' : 'Ekiple iletişime geçin'} <ArrowRight size={17} /></a>
            </div>
            <div className="sponsor-docs">
              <p>{en ? 'CURRENT DOCUMENT' : 'GÜNCEL DOKÜMAN'}</p>
              <a className="document-card" href={publicUrl('sponsorship/team-pars-takim-tanitim-2026.pdf')} download><div><strong>{en ? 'Team PARS Introduction & Partnership Deck' : 'Team PARS Tanıtım ve Sponsorluk Dosyası'}</strong><span>PDF · 8.2 MB · 2026</span></div><Download size={22} /></a>
              <div className="tiers">{(en ? ['Main Partner', 'Gold', 'Silver', 'Supporter'] : ['Ana Sponsor', 'Altın', 'Gümüş', 'Destekçi']).map((tier) => <span key={tier}>{tier}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-copy reveal">
            <span className="section-label">{en ? 'CONTACT' : 'İLETİŞİM'}</span>
            <h2>{en ? 'Let’s discuss the next step.' : 'Bir sonraki adımı birlikte konuşalım.'}</h2>
            <p>{en ? 'Contact Team PARS about partnerships, media, careers or technical collaboration.' : 'Sponsorluk, medya, kariyer veya teknik iş birliği konularında Team PARS’a ulaşın.'}</p>
            <div className="direct-links"><a href="mailto:ikcpars.info@gmail.com"><Mail />ikcpars.info@gmail.com</a><a href="https://instagram.com/ikcpars" target="_blank" rel="noreferrer"><Instagram />@ikcpars</a></div>
          </div>
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="form-row"><label><span>{en ? 'Full name' : 'Ad soyad'}</span><input name="name" required /></label><label><span>{en ? 'Email' : 'E-posta'}</span><input type="email" name="email" required /></label></div>
            <div className="form-row"><label><span>{en ? 'Company / institution' : 'Kurum / şirket'}</span><input name="company" /></label><label><span>{en ? 'Subject' : 'Konu'}</span><select name="topic" required defaultValue=""><option value="" disabled>{en ? 'Select' : 'Seçin'}</option><option>{en ? 'Partnership' : 'Sponsorluk'}</option><option>{en ? 'General contact' : 'İletişim'}</option><option>{en ? 'Media' : 'Medya'}</option><option>{en ? 'Careers' : 'Kariyer'}</option></select></label></div>
            <label><span>{en ? 'Message' : 'Mesaj'}</span><textarea name="message" required rows={5} /></label>
            <button className="button primary submit" type="submit">{sent ? <><Check size={17} /> {en ? 'Email prepared' : 'E-posta hazırlandı'}</> : <>{en ? 'Send message' : 'Mesaj gönder'} <Send size={17} /></>}</button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-inner"><Logo /><p>© 2026 TEAM PARS HYPERLOOP · İZMİR KÂTİP ÇELEBİ ÜNİVERSİTESİ</p><div className="footer-status"><span />{en ? 'Development active' : 'Geliştirme devam ediyor'} · UTC+3 {clock}</div></div>
      </footer>
    </div>
  )
}
