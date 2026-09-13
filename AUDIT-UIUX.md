# Laporan Audit UI/UX — Landing Page Bumi Group

> Audit dilakukan terhadap source code (`src/`) dan verifikasi visual langsung di browser (dev server) pada lebar 1440px, 768px, dan 375px, termasuk uji interaksi: modal spesifikasi, lightbox galeri, menu mobile, kalkulator KPR, validasi formulir, dan halaman `/report`.
> **Audit hanya mendokumentasikan — belum ada yang diperbaiki.**

---

## 1. Ringkasan Eksekutif

| Kategori | Nilai | Catatan |
|---|---|---|
| Aksesibilitas | **C+** | Dasar semantik baik, tetapi dialog/menu tanpa manajemen fokus, galeri tak bisa diakses keyboard |
| Performa | **D** | 7 foto PNG ±900 KB (total ±6,5 MB), font via CSS `@import` render-blocking |
| Theming | **C** | Token brand `--color-bumi-*` didefinisikan tapi hampir tak dipakai; UI memakai palet Tailwind generik |
| Responsif | **B−** | Bagus di 1440 & 375, rusak di rentang 768–1023px; konflik z-index |
| Keaslian desain | **B−** | Bukan "AI slop" ekstrem, tapi terasa template; halaman `/report` adalah komposisi terbaik |

**Total temuan: ±26** — 3 Kritis, 7 Tinggi, 10 Sedang, 6 Rendah.

### Top 5 masalah paling merugikan
1. **Tombol WhatsApp melayang (`z-9999`) menimpa semua modal & menu mobile** — termasuk menutupi tombol CTA utama Kalkulator KPR di layar 375px (terverifikasi visual). Ini memblokir konversi.
2. **Konten halaman bergantung 100% pada JS untuk terlihat** — semua seksi `.reveal` `opacity: 0`; tanpa JS (atau JS gagal), halaman kosong di bawah hero (terverifikasi: tangkapan full-page menampilkan seksi kosong).
3. **Navbar rusak di lebar 768–1023px** — logo terdorong keluar, link wrap 2 baris, item "Kontak" tertutup tombol CTA (terverifikasi: `scrollWidth` 770px > viewport 753px).
4. **Nomor WhatsApp hardcoded di skrip Kalkulator KPR** (`wa.me/62812345678`) — mengabaikan `config.whatsappNumber` dari env; jika env diisi nomor asli, leads dari kalkulator tetap masuk ke nomor placeholder.
5. **Gambar PNG mentah ±900 KB per foto tanpa optimasi** — LCP hero ±925 KB PNG; total transfer ±6,5 MB untuk foto yang setara WebP ±80–150 KB.

---

## 2. Verdict Anti-Pattern ("AI Slop Test")

**Lolos sebagian.** Situs ini tidak jatuh ke jebakan slop yang paling parah, tapi punya beberapa "sidik jari template":

**Yang sudah benar ✅**
- Tidak ada gradient text, glassmorphism, atau neon-purple-cyan.
- Font **Outfit + Plus Jakarta Sans** — bukan Inter/Roboto; pairing display+body yang layak.
- Grid bento ValueProp **bervariasi (7/5/5/7 kolom)** — bukan kartu seragam.
- Easing `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) — bukan bounce; `prefers-reduced-motion` dihormati untuk reveal & ticket.
- Copywriting tidak redundan berlebihan; CTA berkonteks (pesan WA menyebut tipe unit yang dilihat).

**Sidik jari template yang perlu diwaspadai ⚠️**
1. **Grid kartu identik 3 kolom** di Facilities (6 kartu icon+judul+deskripsi+footer seragam) dan Testimonials (3 kartu) — pola "same-sized cards" yang paling sering menandai output AI.
2. **Kotak metrik besar** ("500+", "99%", "10+ Tahun") di About — pola hero-metrics.
3. `hover:scale-105` menempel di **hampir semua** elemen interaktif (tombol, kartu, filter, tab) — memberi rasa seragam-template.
4. `rounded-3xl` + `shadow-card` dipakai identik di setiap komponen tanpa variasi — hierarki visual datar.
5. Palet murni default Tailwind (emerald-600/700 + slate-900/950) — **padahal token brand hijau (`#8BC34A`, `#6BA84F`) sudah didefinisikan dan cocok dengan logo, tapi tidak dipakai**. Akibatnya warna UI tidak mengenali brand.

**Skor keaslian: 6/10.** Rapi dan profesional, tapi belum ada satu elemen yang membuat orang bertanya "ini dibuat bagaimana?". Pengecualian: halaman `/report` (band gelap + kartu overlap + rail alur timeline) adalah komposisi paling "authored" di situs ini — jadikan acuan.

---

## 3. Temuan Kritis

### K1. Konflik z-index: tombol WhatsApp melayang menimpa semua dialog
- **Lokasi**: `StickyWhatsApp.astro` (`z-[9999]`) vs `Navbar.astro` mobile menu (`z-999`), `PropertyTypes.astro` modal (`z-[2000]`), `GalleryShowcase.astro` lightbox (`z-[3000]`).
- **Kategori**: Responsif / UI bug — **terverifikasi visual 3×** (menu mobile, modal spesifikasi, lightbox).
- **Dampak**: Tombol hijau terang selalu tampak di atas overlay mana pun. Terparah di 375px: tombol ini **menutupi tombol "Konsultasi Pengajuan KPR via WhatsApp"** — CTA konversi utama kalkulator tidak bisa diklik pengguna tanpa menggeser.
- **Rekomendasi**: Tetapkan skala z-index token (mis. dropdown 40, overlay 50, modal 60, toast/floating 70) dan turunkan sticky WA di bawah modal, atau sembunyikan saat dialog terbuka.
- **Perintah**: `/harden` lalu `/polish`

### K2. Keterlihatan konten bergantung penuh pada JavaScript
- **Lokasi**: `global.css` (`.reveal { opacity: 0 }`) + `Layout.astro` (IntersectionObserver). Hanya Hero yang di-hardcode `active`.
- **Kategori**: Aksesibilitas / ketahanan — **terverifikasi**: tangkapan full-page menampilkan semua seksi di bawah hero kosong.
- **Dampak**: Jika JS gagal/diblokir (jaringan lambat, ekstensi, bot preview tanpa JS), seluruh halaman di bawah hero tampak kosong. Juga memengaruhi preview link (WhatsApp/iMessage) yang tidak menjalankan scroll.
- **Rekomendasi**: Pola progressive enhancement — sembunyikan hanya jika JS aktif: tambahkan class `js` ke `<html>` via skrip inline, dan gantikan `.reveal` dengan `.js .reveal { opacity: 0 }`.
- **Perintah**: `/harden`

### K3. Menu mobile & modal tanpa manajemen fokus (WCAG 2.4.3, 4.1.2)
- **Lokasi**: `Navbar.astro` (menu `aria-hidden="true"` tetap berisi 8 link yang bisa di-Tab), `PropertyTypes.astro` (modal spesifikasi), `GalleryShowcase.astro` (lightbox).
- **Kategori**: Aksesibilitas.
- **Dampak**: Saat menu tertentu tertutup, pengguna keyboard tetap bisa memfokuskan link di dalamnya (elemen tetap di DOM, hanya digeser dengan transform) — fokus "hilang" ke elemen tak terlihat. Saat terbuka, Tab bisa keluar ke halaman di belakang dialog. Tidak ada dukungan tombol **Escape**, tidak ada focus trap, tidak ada pengembalian fokus ke pemicu, body tidak terkunci scroll.
- **Rekomendasi**: Tambah `inert`/`visibility: hidden` saat tertutup; saat terbuka: focus trap + Escape + kembalikan fokus + `overflow: hidden` pada body.
- **Perintah**: `/harden`

---

## 4. Temuan Tinggi (High)

### H1. Navbar rusak di rentang tablet 768–1023px
- **Lokasi**: `Navbar.astro:5-28` — link ditampilkan sejak `md:` (768px), hamburger `md:hidden`.
- **Bukti**: `scrollWidth` baris nav = 770px vs viewport 753px. Logo terdorong keluar layar, 4 label wrap dua baris, "Kontak" tertutup tombol CTA.
- **Dampak**: Tampilan rusak pada persentase perangkat tablet/layar kecil landscape yang tidak kecil.
- **Rekomendasi**: Naikkan breakpoint menu hamburger ke `lg:` (1024px), atau kecilkan gap/ukuran font pada `md–lg`, atau sembunyikan sebagian item ke dropdown.
- **Perintah**: `/adapt`

### H2. Galeri tidak bisa dioperasikan dengan keyboard (WCAG 2.1.1)
- **Lokasi**: `GalleryShowcase.astro:92-116` — item galeri adalah `<div>` yang bisa diklik, tanpa `tabindex`, `role="button"`, atau handler keyboard (**diverifikasi**: `galleryItemFocusable: false`).
- **Dampak**: Pengguna keyboard/screen reader sama sekali tidak bisa membuka lightbox. Filter tab juga tanpa `aria-pressed`/`role="tablist"`.
- **Rekomendasi**: Jadikan `<button>` atau tambahkan `role="button" tabindex="0"` + handler Enter/Space; state filter via `aria-pressed`.
- **Perintah**: `/harden`

### H3. Foto PNG mentah ±900 KB ×7, tanpa atribut dimensi
- **Lokasi**: `public/images/*.png` (semua ±890–990 KB); dipakai di Hero, About, PropertyTypes, Gallery, report.
- **Dampak**: LCP lambat di jaringan 4G (hero ±925 KB); total ±6,5 MB hanya untuk foto. Tidak ada `width`/`height` → potensi CLS kecil; hero tanpa `fetchpriority="high"`; About `living_room.png` below-fold tanpa `loading="lazy"`.
- **Rekomendasi**: Gunakan `astro:assets` (`<Image />`) → WebP/AVIF responsif (estimasi hemat 80–90%), tambah dimensi eksplisit, `fetchpriority="high"` untuk hero, `loading="lazy"` untuk sisanya.
- **Perintah**: `/optimize`

### H4. Kalkulator KPR: hardcode nomor WA + aksesibilitas kontrol
- **Lokasi**: `KPRCalculator.astro:207` — `waBtn.href = 'https://wa.me/62812345678?...'` mengabaikan `config.whatsappNumber`.
- **Dampak**: Bisnis — leads dari kalkulator selalu ke nomor placeholder meski env sudah diubah.
- **Juga**: `<label for="">` kosong (line 63, HTML invalid); slider DP tidak terasosiasi label (tidak diumumkan screen reader, tanpa `aria-valuetext`); output cicilan tanpa `aria-live="polite"`; tombol tipe/tenor tanpa `aria-pressed` (status terpilih hanya visual).
- **Perintah**: `/harden`

### H5. Formulir: tanpa `autocomplete`, error path mati, risiko popup blocker
- **Lokasi**: `ContactForm.astro`.
- **Dampak**:
  - Input nama/email/telepon tanpa `autocomplete="name|email|tel"` (WCAG 1.3.5 AA) — isi-otomatis password manager gagal.
  - Banner error (`#error-message`) **tidak akan pernah muncul** — simulasi `new Promise(resolve => ...)` tidak pernah reject (dead code yang menyesatkan maintainer).
  - `window.open()` di dalam `setTimeout` 1,5 detik setelah await — di Safari/strict popup blocker bisa diblok; pengguna terdiam di "Anda sedang dialihkan..." tanpa redirected.
  - Tidak ada `aria-invalid` / `aria-describedby` pada input bermasalah; fokus tidak dipindah ke field pertama yang salah.
- **Perintah**: `/harden`

### H6. Janji produk tanpa backend: tiket keluhan palsu
- **Lokasi**: `ReportForm.astro` — nomor tiket dibangkitkan acak di sisi klien (`RPT-YYYYMMDD-XXXX`), tidak dikirim ke mana pun (TODO di kode mengakui ini).
- **Dampak**: Halaman berjanji "setiap laporan tercatat dengan nomor tiket… ditindaklanjuti maksimal 1×24 jam" — pengguna menyangka laporannya tercatat, padahal tidak. Risiko reputasi nyata jika halaman ini tayang sebelum API siap.
- **Rekomendasi**: Sebelum publik, hubungkan ke REST API atau sembunyikan klaim tiket; minimal tampilkan peringatan bahwa kanal pengiriman sebenarnya adalah WhatsApp/telepon.
- **Perintah**: `/harden` (backend), `/clarify` (copywriting harapan vs kenyataan)

### H7. Target sentuh & aksesibilitas modal di bawah standar
- **Lokasi**: Tombol tutup modal spesifikasi 36×36px (`PropertyTypes.astro:202`), tombol "Lihat Spesifikasi" 40px, link nav desktop ±36px.
- **Standar**: WCAG 2.5.8 (min 24px) / praktik umum 44×44px (Apple HIG).
- **Juga**: Modal spesifikasi tidak bisa ditutup dengan klik backdrop atau Escape (lightbox bisa klik backdrop, tidak bisa Escape).
- **Perintah**: `/polish`

---

## 5. Temuan Sedang (Medium)

| # | Masalah | Lokasi | Dampak | Perintah |
|---|---|---|---|---|
| M1 | Token brand `--color-bumi-*` (7 variabel) tak terpakai; hanya dipakai untuk outline fokus. `.text-gradient` & `.shadow-glow` CSS mati | `global.css:4-12, 81-89` | UI tidak konsisten dengan warna logo brand (hijau lime); token menyesatkan | `/normalize` |
| M2 | `theme-color` `#1E2536` (navy lama) tidak cocok dengan `slate-950` (#020617) yang dipakai UI | `Layout.astro:20` | Warna chrome browser tidak menyatu | `/normalize` |
| M3 | Placeholder input `slate-400` di putih = kontras **2,57:1** (batas AA 4,5:1) | semua form | Placeholder sulit dibaca; WCAG 1.4.3 | `/colorize`/`/normalize` |
| M4 | Font dimuat via `@import` di CSS — render-blocking, tanpa preconnect | `global.css:2` | Menunda render teks (FOIT/blink) | `/optimize` |
| M5 | `scroll-behavior: smooth` global tanpa guard `prefers-reduced-motion` | `global.css:20` | Pengguna sensitif gerak tetap menerima scroll animasi | `/harden` |
| M6 | `animate-ping` abadi (dot "online" WA) tanpa reduced-motion | `StickyWhatsApp.astro:19` | Distraksi terus-menerus bagi pengguna sensitif gerak | `/quieter` |
| M7 | Teks mikro 10–11px uppercase bold berulang (badge/tag/harga) | Facilities, PropertyTypes, Gallery, StickyWA | Keterbacaan buruk di mobile; terasa "berteriak" | `/clarify` |
| M8 | Hierarki CTA datar: 8+ tombol emerald primer bersaing (nav, hero, 3 kartu properti, about, KPR, CTA final, form, sticky) | seluruh halaman | Tidak ada satu CTA dominan per layar; kelelahan keputusan | `/distill` |
| M9 | Skala z-index angka ajaib campur (`z-999`, `z-1000`, `z-[2000]`, `z-[3000]`, `z-[9999]`) | 5 komponen | Penyebab akar K1; rawan regresi | `/normalize` |
| M10 | Duplikasi SVG WhatsApp inline 7× (±2 KB per salinan) | Navbar, Hero, About, PropertyTypes, CTAFinal, Footer, StickyWA, report | HTML membengkak, maintainer harus edit 7 tempat | `/extract` |

---

## 6. Temuan Rendah (Low)

1. **Footer tidak memiliki link "Lapor Keluhan"** padahal ada di navbar — inkonsistensi IA (`Footer.astro`).
2. `og:image` memakai PNG ±925 KB — preview link WhatsApp/Slack lambat dimuat.
3. Struktur data hanya `Organization`; untuk developer properti, `LocalBusiness`/`RealEstateAgent` + `aggregateRating` lebih tepat.
4. `.reveal` memasang `will-change` permanen di puluhan elemen — boros memori komposit.
5. `img` tanpa `decoding="async"` di semua komponen.
6. Nilai tampilan awal kalkulator berbeda antara HTML statis (Rp 1.961.000) dan hasil rekalkulasi JS (Rp 1.959.992) — flash kecil saat load.

---

## 7. Pola Sistemik

1. **Brand didefinisikan tapi tidak dieksekusi.** Token hijau brand ada di CSS, logo berwarna hijau lime, tetapi seluruh UI memakai emerald/slate bawaan Tailwind. Ini satu keputusan (memetakan token ke `@theme` Tailwind v4) yang akan memperbaiki konsistensi visual sekaligus memberi identitas.
2. **Dialog dibangun tanpa pola dialog.** Tiga komponen (menu, modal, lightbox) masing-masing meng-gulung implementasi toggle sendiri tanpa focus trap, Escape, scroll lock, atau inert — semua masalah a11y dialog berasal dari sini. Satu util `useDialog` bersama akan menutup K3, H2, H7 sekaligus.
3. **State interaktif hanya visual.** Semua tombol pilihan (tipe KPR, tenor, filter galeri) mengubah class border/warna tanpa atribut ARIA — pola berulang di 3 komponen.
4. **Ukuran aset diabaikan.** PNG foto, SVG duplikat, font `@import` — tidak ada satu pun optimasi aset yang aktif.

---

## 8. Temuan Positif (pertahankan)

- **Semantik dasar solid**: `lang="id"`, landmark `nav/main/footer`, hierarki heading rapi, `aria-label` pada tombol ikon, `role="alert"` pada pesan error, label form terikat `for` dengan benar.
- **`prefers-reduced-motion` dihormati** untuk reveal, hover-lift, dan animasi tiket — jarang ditemukan di landing page.
- **`:focus-visible` global** dengan warna brand — fondasi keyboard yang benar.
- **Kalkulator KPR berfungsi nyata** (rumus anuitas benar) dan pesan WhatsApp yang dihasilkan membawa konteks simulasi pengguna — pola CTA cerdas yang bagus.
- **Konfigurasi terpusat** (`utils/config.ts` + env) dan **validasi terpisah** (`utils/validation.ts`) — arsitektur yang benar untuk data bisnis.
- **Touch target disengaja** di banyak tombol utama (`min-h-11`, `min-h-[48px]`, `min-h-[52px]`).
- **Halaman `/report`** adalah desain terbaik: komposisi band gelap + kartu overlap + rail informasi + timeline alur — hierarki jelas, copy jujur dan instruktif.
- Print styles (`.no-print`) sudah dipikirkan.

---

## 9. Rencana Prioritas

### Immediate (sebelum rilis) — blokir konversi & kepercayaan
1. Perbaiki skala z-index + posisi sticky WA (K1).
2. Hubungkan KPR WA button ke `config.whatsappNumber` (H4 bagian pertama).
3. Putuskan nasib halaman `/report`: hubungkan API atau revisi klaim tiket (H6).
4. Progressive enhancement `.reveal` (K2).

### Short-term (sprint ini)
5. Manajemen fokus + Escape + scroll lock untuk menu mobile, modal, lightbox (K3, H7).
6. Navbar breakpoint `lg` untuk menu mobile (H1).
7. Optimasi gambar via `astro:assets` → WebP (H3).
8. Galeri keyboard-accessible + `aria-pressed` filter (H2).
9. Form: `autocomplete`, `aria-invalid`/`aria-describedby`, hapus error path mati (H5).

### Medium-term
10. Normalisasi token brand → `@theme` Tailwind v4; hapus CSS mati; samakan `theme-color` (M1, M2, M9).
11. Font loading: `<link>` + preconnect, self-host bila memungkinkan (M4).
12. Kontras placeholder + perbaiki target sentuh kecil (M3, H7).
13. Reduksi hierarki CTA: satu primer per layar (M8).
14. Ekstrak komponen ikon WhatsApp (M10).

### Long-term
15. Variasi komposisi kartu Facilities/Testimonials agar tidak seragam (anti-pattern #1).
16. Struktur data `LocalBusiness` + og:image WebP.

### Pemetaan ke perintah
- `/harden` → K1, K2, K3, H2, H4, H5, M5 (13 isu ketahanan & a11y)
- `/optimize` → H3, M4 (performa aset & font)
- `/normalize` → M1, M2, M9 (token, z-index, konsistensi)
- `/adapt` → H1 (breakpoint navbar)
- `/distill` → M8 (hierarki CTA)
- `/polish` → H7, M6, M7 (detail sentuh)
- `/extract` → M10 (komponen ikon bersama)
- `/clarify` → M7, H6 (copy)
