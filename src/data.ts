export const systems = [
  {
    id: '01',
    code: 'MEC',
    title: 'Mekanik Sistemler',
    desc: 'Aerodinamik kabuk, optimize edilmiş şasi ve emniyet odaklı fren mimarisi.',
    specs: ['Aerodinamik gövde', 'Şasi optimizasyonu', 'Mekanik frenleme'],
  },
  {
    id: '02',
    code: 'PWR',
    title: 'Güç ve Manyetik Sistemler',
    desc: 'Bataryadan raya uzanan güvenli güç dağıtımı ve manyetik kaldırma altyapısı.',
    specs: ['Yüksek gerilim batarya', 'BMS ve PDU', 'MagLev'],
  },
  {
    id: '03',
    code: 'CTL',
    title: 'Kontrol ve Haberleşme',
    desc: 'Gerçek zamanlı algılama, durum kestirimi ve pist üstü telemetri akışı.',
    specs: ['STM32', 'Sensör füzyonu', 'CAN Bus telemetri'],
  },
]

export const milestones = [
  { date: 'AĞU 2024', title: 'Kuruluş', text: 'Team PARS, İzmir Kâtip Çelebi Üniversitesi öğrencileri tarafından kuruldu.', state: 'done' },
  { date: 'OCA 2025', title: 'Tasarım ve Analiz', text: 'ANSYS ve CATIA simülasyonları tamamlandı.', state: 'done' },
  { date: 'ŞUB — AĞU 2026', title: 'Üretim ve Test', text: 'Prototip üretimi, entegrasyon ve saha doğrulama süreci tamamlandı.', state: 'done' },
  { date: 'EYL 2026', title: 'Türkiye 6’ncılığı', text: 'TEKNOFEST Performans kategorisinde 242 takım arasından 6’ncılık elde edildi.', state: 'active' },
  { date: '2027 PROGRAMI', title: 'Yeni Geliştirme Dönemi', text: 'Saha verileriyle sistem iyileştirme ve yeni hedefler.', state: 'next' },
]

export const team = [
  { name: 'Mekanik Tasarım', role: 'Şasi, kabuk ve yapısal analiz', dept: 'Mekanik', code: 'MEC' },
  { name: 'Üretim ve Entegrasyon', role: 'İmalat, montaj ve test', dept: 'Mekanik', code: 'MFG' },
  { name: 'Güç Sistemleri', role: 'Batarya, BMS ve güç dağıtımı', dept: 'Elektromekanik', code: 'PWR' },
  { name: 'Tahrik ve Fren', role: 'Motor, MagLev ve güvenli duruş', dept: 'Elektromekanik', code: 'DRV' },
  { name: 'Gömülü Sistemler', role: 'STM32, sensörler ve kontrol kartları', dept: 'Elektronik Haberleşme', code: 'EMB' },
  { name: 'Telemetri', role: 'CAN Bus, yer istasyonu ve veri', dept: 'Elektronik Haberleşme', code: 'TEL' },
  { name: 'Kurumsal İlişkiler', role: 'Sponsorluk ve iş birlikleri', dept: 'Sponsorluk', code: 'PRT' },
  { name: 'Medya ve Operasyon', role: 'İletişim, etkinlik ve takım planlaması', dept: 'Sponsorluk', code: 'COM' },
]

export const tools = ['CATIA V5', 'ANSYS', 'SOLIDWORKS', 'PYTHON', 'C++', 'STM32', 'CAN BUS']
