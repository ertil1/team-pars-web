# Team PARS Web

İzmir Kâtip Çelebi Üniversitesi Team PARS Hyperloop ekibinin statik web sitesi.

## Yerel geliştirme

Node.js 20 veya daha yeni bir sürüm gereklidir.

```bash
npm ci
npm run dev
```

## Üretim çıktısı

```bash
npm run build
npm run preview
```

`npm run build` komutu, herhangi bir Node.js sunucusuna veya özel backend'e ihtiyaç duymayan statik siteyi `dist/` klasöründe üretir. Bu klasör GitHub Pages, Netlify, Vercel, Cloudflare Pages veya standart bir web sunucusunda doğrudan yayınlanabilir.

Görseller, 3D STL modeli ve sponsorluk PDF'i statik dosyalardır. İletişim formu kullanıcının e-posta uygulamasını `mailto:` bağlantısıyla açar; sunucu tarafında veri saklanmaz.

## GitHub Pages

`.github/workflows/deploy-pages.yml`, `main` dalına gönderilen her güncellemede siteyi derleyip GitHub Pages'a hazırlar. Depo ayarlarında **Settings → Pages → Source: GitHub Actions** seçilmelidir.
