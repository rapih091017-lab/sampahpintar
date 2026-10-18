# SampahPintar MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** MVP web app demo: foto/pilih sampah → estimasi harga transparan → jadwal jemput → simulasi QRIS + poin → leaderboard & dashboard dampak — semua localStorage, tanpa server.

**Architecture:** Static web app 2 halaman (mirip Sejiwa). Logika murni (registry harga, klasifikasi warna, kalkulasi poin/dampak, validasi jadwal, leaderboard) dipisah ke `lib/sampahpintar.js` agar bisa dites Node. UI di `app.html` memakai design token yang sama dengan landing `index.html`. Persistensi localStorage.

**Tech Stack:** HTML + Tailwind CDN + vanilla JS, font Inter, ikon Lucide (SVG), test: `node --test` (assert, tanpa framework).

**Design System:** Organic Biophilic (ui-ux-pro-max) — Primary `#0891B2`, Secondary `#22D3EE`, CTA `#22C55E`, Background `#ECFEFF`, Text `#164E63`, radius 16–24px, Inter. Anti AI-slop: ikon SVG bukan emoji, angka riil SIPSN, tanpa gradien ungu-biru, `cursor-pointer`, kontras 4.5:1, `prefers-reduced-motion`, responsive 375/768/1024/1440.

## Global Constraints

- TANPA komentar HTML/`--` di file yang di-verify (0 komentar)
- Bahasa Indonesia, sapaan "kamu"
- Harga = "harga acuan" (disclaimer), QRIS = "simulasi"
- Tanpa dependency baru — CDN saja (Tailwind, Lucide, Google Fonts)
- Test: `node --test test/` harus hijau sebelum commit akhir

---

### Task 0: Repo baseline

**Files:** Create: `.gitignore`, `docs/plans/2026-10-18-sampahpintar-survey-report.md`

- [x] `git init D:\sampahpintar`, `.gitignore`: `node_modules/`
- [x] Survey report riset pasar + kompetitor + harga + design system
- [x] Commit — `docs: survey report riset pasar SampahPintar`

### Task 1: Rencana

**Files:** Create: `docs/plans/2026-10-18-sampahpintar-mvp.md`

- [ ] Simpan plan ini
- [ ] Commit — `docs: rencana implementasi MVP`

### Task 2: Logika murni + test (TDD)

**Files:**
- Create: `lib/sampahpintar.js`
- Create: `test/sampahpintar.test.js`

**Interfaces (Produces):**
- `WASTE_TYPES` — array `{id, nama, kategori, hargaLow, hargaHigh, contoh, tips, warna:[r,g,b], jual:boolean}`
- `classify(rgb)` → `{id, nama, keyakinan}` keyakinan 0–1 (threshold jarak → id `lainnya`)
- `estimatePrice(typeId, kg)` → `{low, high, mid}` rupiah bulat
- `pointsFrom(rupiah)` → poin integer = `round(rupiah/100)`
- `impactKg(typeId, kg)` → `{tpa, co2}` kg (faktor per kategori)
- `formatRp(n)` → `"Rp 12.500"` (id-ID grouping)
- `validateSchedule(dateISO, slot, nowISO)` → `{ok, alasan}` — slot ∈ `pagi|siang`, tanggal ≥ hari ini
- `sortLeaderboard(entries)` → array urut `poin` desc

**Steps:**
- [ ] Tulis test dulu:
  - `estimatePrice("pet-bening", 2)` → `{low:5000, high:8000, mid:6500}`
  - `classify([180,130,80]).id` → `"kardus"`; `classify([90,140,60]).id` → `"organik"`; `classify([0,0,0]).id` → `"lainnya"`
  - `pointsFrom(6500)` → `65`
  - `impactKg("pet-bening", 2)` → `{tpa:2, co2:3.5}`
  - `formatRp(12500)` → `"Rp 12.500"`
  - `validateSchedule("2020-01-01","pagi","2026-10-18").ok` → `false`; `validateSchedule("2026-10-20","selasa",...)` → `!ok`; `validateSchedule("2026-10-20","siang","2026-10-18").ok` → `true`
  - `sortLeaderboard([{nama:"A",poin:5},{nama:"B",poin:9}])` → B di depan
- [ ] Jalankan `node --test test/` — Expected: FAIL (module belum ada)
- [ ] Implement `lib/sampahpintar.js`: registry 10 jenis (pet-bening, pet-warna, hdpe, pp, ldpe, kardus, kertas-hvs, koran, kaleng, besi, kaca, organik, lainnya — harga dari survey report §4), `classify` jarak Euclidean ke warna patokan + threshold, UMD export (`window.SampahPintar`, `module.exports`)
- [ ] Jalankan ulang — Expected: PASS semua
- [ ] Commit — `feat: logika klasifikasi, harga, poin, dampak + test`

### Task 3: Aplikasi UI

**Files:** Create: `app.html`

**Steps:**
- [ ] Design token sama survey report §5 (Inter, `#0891B2`/`#22D3EE`/`#22C55E`/`#ECFEFF`/`#164E63`, radius 16–24px), Lucide SVG, TANPA komentar HTML
- [ ] Onboarding: input nama (untuk leaderboard) → tersimpan localStorage
- [ ] Alur jual 4 langkah (wizard/tab):
  1. **Foto & klasifikasi**: upload gambar → canvas rata-rata RGB → `classify()` → saran jenis + chip pilihan manual (fallback) + tips pilah
  2. **Estimasi harga**: input berat kg → `estimatePrice()` → rentang Rp + catatan "harga acuan"
  3. **Jadwal jemput**: pilih tanggal (min hari ini) + slot pagi/siang + pilih bank sampah statis (4 lokasi, jarak) → `validateSchedule()`
  4. **Konfirmasi & bayar**: ringkasan → tombol Bayar → **simulasi QRIS** (kartu QR statis) → poin masuk (`pointsFrom`)
- [ ] Dashboard: total poin, total kg setoran, dampak (kg TPA dihindari + kg CO₂e via `impactKg`), riwayat transaksi, leaderboard (data dummy 6 warga + skor user, `sortLeaderboard`)
- [ ] Panduan pemilahan: kartu kategori (plastik/kertas/logam/kaca/organik) + contoh barang
- [ ] Disclaimer footer: harga acuan bisa berubah; QRIS simulasi; data tersimpan lokal di browser
- [ ] Verify: `python -c "from html.parser import HTMLParser; HTMLParser().feed(open(r'D:\sampahpintar\app.html',encoding='utf-8').read()); print('OK')"`
- [ ] Commit — `feat: aplikasi MVP estimasi harga + jadwal + poin + dampak`

### Task 4: Landing page

**Files:** Create: `index.html`

**Steps:**
- [ ] Hero (CTA-focused marketplace): headline + angka riil "11,3 juta ton sampah tidak terkelola (SIPSN 2024)" + CTA `Coba demo → app.html`
- [ ] Section: cara kerja 3 langkah (Foto → Estimasi → Jemput), fitur (AI pilah, harga transparan, poin, dampak), komposisi sampah nasional (bar dari data SIPSN), trust (sumber data), footer CTA
- [ ] Verify parse + `rg -c "\-\-" index.html app.html lib/sampahpintar.js` → Expected: 0
- [ ] Commit — `feat: landing page SampahPintar`

### Task 5: Verifikasi akhir

- [ ] `node --test test/` → PASS
- [ ] Parse semua HTML → OK
- [ ] Buka `index.html`/`app.html` di browser, smoke test: nama → foto/pilih → berat → jadwal → bayar → poin & dampak muncul
- [ ] Commit sisa bila ada

**Definisi selesai:** test Node hijau, 0 komentar `--`, alur jual berfungsi di browser, landing tertaut, checklist anti AI-slop (SVG ikon, kontras, cursor-pointer, responsive) terpenuhi.
