export const systems = [
  {
    id: '01',
    code: 'MEC',
    title: 'Mekanik Sistemler',
    desc: 'Aerodinamik kabuk, topoloji optimizasyonlu şasi ve emniyet odaklı fren mimarisi.',
    specs: ['Aerodinamik gövde', 'Şasi optimizasyonu', 'Mekanik frenleme'],
  },
  {
    id: '02',
    code: 'PWR',
    title: 'Güç & Manyetik Sistemler',
    desc: 'Bataryadan raya uzanan güvenli güç dağıtımı ve manyetik kaldırma altyapısı.',
    specs: ['Yüksek gerilim batarya', 'BMS & PDU', 'MagLev'],
  },
  {
    id: '03',
    code: 'CTL',
    title: 'Kontrol & Haberleşme',
    desc: 'Gerçek zamanlı algılama, durum kestirimi ve pist üstü telemetri akışı.',
    specs: ['STM32', 'Sensör füzyonu', 'CAN Bus telemetri'],
  },
]

export const milestones = [
  { date: 'AĞU 2024', title: 'Kuruluş', text: 'Team PARS’ın temelleri atıldı.', state: 'done' },
  { date: 'OCA 2025', title: 'Tasarım & Analiz', text: 'ANSYS ve CATIA simülasyonları tamamlandı.', state: 'done' },
  { date: 'ŞUB — AĞU 2026', title: 'Üretim & Test', text: 'Prototip üretimi, entegrasyon ve saha doğrulama süreci.', state: 'done' },
  { date: 'EYL 2026', title: 'Türkiye 6’ncılığı', text: 'TEKNOFEST Performans kategorisi; 242 takım arasında 6’ncılık.', state: 'active' },
  { date: '2027 PROGRAMI', title: 'Yeni Geliştirme Döngüsü', text: 'Saha verileriyle sistem iyileştirme ve yeni hedefler.', state: 'next' },
]

export const team = [
  { name: 'Mekanik Tasarım', role: 'Şasi, kabuk & yapısal analiz', dept: 'Mekanik', code: 'MEC' },
  { name: 'Üretim & Entegrasyon', role: 'İmalat, montaj & test', dept: 'Mekanik', code: 'MFG' },
  { name: 'Güç Sistemleri', role: 'Batarya, BMS & güç dağıtımı', dept: 'Elektromekanik', code: 'PWR' },
  { name: 'Tahrik & Fren', role: 'Motor, MagLev & güvenli duruş', dept: 'Elektromekanik', code: 'DRV' },
  { name: 'Gömülü Sistemler', role: 'STM32, sensörler & kontrol kartları', dept: 'Elektronik Haberleşme', code: 'EMB' },
  { name: 'Telemetri', role: 'CAN Bus, yer istasyonu & veri', dept: 'Elektronik Haberleşme', code: 'TEL' },
  { name: 'Kurumsal İlişkiler', role: 'Sponsorluk & iş birlikleri', dept: 'Sponsorluk', code: 'PRT' },
  { name: 'Medya & Operasyon', role: 'İletişim, etkinlik & takım planı', dept: 'Sponsorluk', code: 'COM' },
]

export const tools = ['CATIA V5', 'ANSYS', 'SOLIDWORKS', 'PYTHON', 'C++', 'STM32', 'CAN BUS']
