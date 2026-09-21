# Portfolyo — Ece Eren

Kişisel portfolyo sitem. Düz HTML, CSS ve JavaScript; framework, build aracı yok.

## Yapı

```
index.html        → tüm bölümler (hero, hakkımda, skiller, projeler, deneyim, eğitim, sertifikalar, iletişim)
css/style.css     → tüm stiller, numaralı bölümler halinde (renkler :root içinde)
js/script.js      → mobil menü, CV açılır menüsü, video modalı, TR/EN çeviri sözlüğü, hero animasyon durdurma
images/           → proje kapakları, og.jpg (sosyal paylaşım kartı), favicon.svg
images/icons/     → teknoloji logoları (Simple Icons'tan indirilmiş SVG'ler)
videos/           → proje demo videoları (sadece tıklanınca yüklenir)
cv/               → indirilebilir CV (TR / EN)
```

## Yerelde açmak

`index.html`'e çift tıkla ya da VS Code'da **Live Server** ile aç.

## İçerik güncelleme

- **Metin değiştirmek:** HTML'de `data-i18n="anahtar"` olan yazılar `js/script.js` içindeki sözlükten gelir; hem `tr` hem `en` bloğunu güncelle. `data-i18n` olmayan yazılar (proje adları, teknoloji isimleri) doğrudan HTML'de.
- **Yeni skill:** ilgili `.stack__row` içine bir `<li class="stack__item">` kopyala; logoyu `https://cdn.simpleicons.org/SLUG/RENK` adresinden indirip `images/icons/` altına koy. Öğrenme aşamasındaysa `stack__item--learning` sınıfı ekle.
- **Yeni proje:** `.works` içine bir `<article class="work">` kopyala. Videosu varsa görseli `<button data-video="videos/x.mp4">` yap; kapak görselini `images/` altına koy.
- **Yeni sertifika / deneyim:** ilgili `<ul class="plain">` / `<ul class="timeline">` içine bir `<li>` kopyala.
- **CV güncelleme:** `cv/` altındaki PDF'lerin üstüne aynı isimle kaydet.

## Yayınlamak (GitHub Pages)

1. GitHub'da `portfolyo` adında repo aç, dosyaları push et.
2. Repo → Settings → Pages → Branch: `main` / root → Save.
3. Birkaç dakika sonra `https://erenece.github.io/portfolyo` adresinde yayında.
4. Yayın adresi farklıysa `index.html` içindeki `og:url` ve `og:image` adreslerini düzelt.

## Yapılacaklar

- [ ] ExpoTrack için ekran görüntüsü → `images/expotrack.jpg` (kart şu an boş kutu)
- [ ] Projelere GitHub / canlı linkleri ekle
- [ ] `videos/gastromic.webm`'i mp4'e çevir (eski Safari uyumu için; HandBrake ile)
