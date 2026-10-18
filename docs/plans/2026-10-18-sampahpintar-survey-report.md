# Survey Report: SampahPintar — Marketplace Daur Ulang Rumah Tangga

Tanggal: 2026-10-18
Metode: riset mandiri (DuckDuckGo + Jina Reader, dokumen primer SIPSN/BRIN, harga pasar 2024–2025, ui-ux-pro-max design system)

---

## 1. Ringkasan Eksekutif

- Masalah nyata, data terverifikasi: SIPSN KLHK 2024 — timbunan sampah nasional 31,9 juta ton (per 24 Jul 2024), **11,3 juta ton (35,67%) tidak terkelola dengan baik**. BRIN: dari 342 kab/kota hanya 32% dikelola baik.
- Komposisi: sisa makanan 40,24%, **plastik 20,21%**, kayu 12,96%, kertas/karton 10,74% — plastik + kertas = ±31% bernilai jual tapi banyak lolos dari rantai daur ulang karena rumah tangga tidak memilah.
- Celah nyata: kompetitor sudah ada (Kepul, BeliSampah, Wastepedia, Trashily, Reresik) tetapi belum ada yang gabung **foto → AI klasifikasi → estimasi harga transparan → jadwal jemput → poin/dampak** dalam satu alur mulus untuk volume rumah tangga kecil.
- Ekonomi rumah tangga realistis: Rp 12.500–33.000/bulan dari plastik+kertas (Gerakan Asri, estimasi 2024–2025) — kecil secara uang, besar sebagai kebiasaan + agregasi 100 anggota = Rp 1,25–3,3 juta/bulan untuk kas RT.
- Design system final: **Organic Biophilic** (ui-ux-pro-marketplace pattern), electric cyan `#0891B2` + eco green `#22C55E`, font Inter, sudut membulat 16–24px, ikon SVG Lucide.

---

## 2. Data Pasar (Terverifikasi)

| Data | Angka | Sumber |
|------|-------|--------|
| Timbunan sampah nasional 2024 | 31,9 juta ton (290 kab/kota, per 24 Jul 2024) | SIPSN KLHK via Kompas/GoodStats |
| Sampah tidak terkelola | 11,3 juta ton = 35,67% | SIPSN via Tempo/Kompas 2024 |
| Dikelola baik (342 kab/kota) | 32% ≈ 37,3 juta ton/tahun tercatat | BRIN 2024 (brin.go.id/news/125994) |
| Komposisi sisa makanan | 40,24% | SIPSN komposisi sampah |
| Komposisi plastik | 20,21% (2024: 19,64%) | SIPSN / GoodStats |
| Komposisi kertas/karton | 10,74% | SIPSN |
| Penghasilan rumah tangga dari jual sampah | Rp 12.500–33.000/bulan | Gerakan Asri 2024–2025 |

---

## 3. Kompetitor

| Pemain | Model | Kekuatan | Celah vs SampahPintar |
|--------|-------|----------|------------------------|
| **Kepul.id** | Waste management modern rumah tangga + bisnis | Brand kuat, jemput sampah | Tidak menonjolkan AI klasifikasi & gamifikasi warga |
| **BeliSampah.com** | Marketplace beli/jual sampah daur ulang | Transaksi dua arah | B2B-oriented, kurang alur rumah tangga |
| **Wastepedia** | Edukasi pilah + nilai uang adil | Fokus pilah dari sumber | Tidak ada estimasi harga via foto |
| **Trashily.id** | Bank sampah digital + rewards (Bogor) | Poin/reward, pemuda | Lokal Bogor, tanpa AI/dampak nasional |
| **Reresik.com** | Jual sampah online satuan | Bisa jual 1 pcs | Tanpa penjadwalan/leaderboard |
| **bank.peduli-sampah.id / banksampahdigital.id** | Bank digital, setoran+saldo | Transparansi saldo | Tool pengelola, bukan marketplace warga |
| **BankSampah.id** | SaaS manajemen bank sampah | Operasional bank sampah | Bukan sisi konsumen |

**Posisi unik SampahPintar:** satu-satunya yang gabung (a) foto → estimasi harga AI, (b) harga transparan per jenis, (c) jadwal jemput + peta bank sampah, (d) poin/leaderboard/dampak lingkungan — untuk volume rumah tangga kecil yang selama ini terabaikan.

---

## 4. Harga Rujukan (basis registry aplikasi)

| Jenis | Harga/kg (pasar 2024–2025) |
|-------|-----------------------------|
| Botol PET bening | Rp 2.500 – 4.000 |
| PET berwarna | Rp 1.500 – 2.500 |
| HDPE (deterjen, galon) | Rp 1.500 – 2.500 |
| PP (wadah makanan, tutup) | Rp 1.000 – 2.000 |
| LDPE (kantong kresek) | Rp 500 – 1.500 |
| Styrofoam/PS | Rp 200 – 800 |
| Kardus | Rp 1.200 – 2.000 |
| Kertas HVS | Rp 1.500 – 2.500 |
| Koran/majalah | Rp 800 – 1.500 |
| Kaleng aluminium | Rp 12.000 – 18.000 |
| Besi tua | Rp 1.500 – 2.500 |
| Tembaga | Rp 60.000 – 80.000 |
| Kaca | Rp 300 – 700 (estimasi lokal) |

Catatan: harga berfluktuasi per lokasi/kondisi; aplikasi tampilkan sebagai **estimasi acuan**, bukan janji harga final.

---

## 5. Design System (ui-ux-pro-max, sesuai tema daur ulang)

Hasil `--design-system` query "recycling waste marketplace household sustainability eco":

### Warna

| Peran | Hex | Makna |
|-------|-----|-------|
| Primary | `#0891B2` | electric cyan — bersih, teknologi, air |
| Secondary | `#22D3EE` | cyan terang — aksen/hover |
| CTA | `#22C55E` | eco green — aksi positif (kirim, jual, jadwal) |
| Background | `#ECFEFF` | off-white cyan — segar, tidak berat |
| Text | `#164E63` | teal tua — kontras 4.5:1+ aman |

### Font

- Heading + Body: **Inter** — clear + informative (marketplace).
- Sudut membulat 16–24px, kurva organik, bayangan alami, bentuk SVG mengalir.

### Pattern (Marketplace/Directory)

- Hero search/CTA-focused → kategori → featured listing (bank sampah terdekat) → trust → CTA jual sampah.
- Peta + pin hover, card carousel, popular searches.

### Gaya visual anti AI-slop

- Ikon SVG Lucide, **bukan emoji**; data konkret (angka SIPSN, harga Rp) bukan klaim kosong.
- `cursor-pointer` semua elemen klik, transisi 150–300ms, hover feedback.
- Kontras teks 4.5:1, `prefers-reduced-motion`, responsive 375/768/1024/1440.
- Anti-pattern: greenwashing kosong, flat tanpa depth, halaman berat teks, CTA ganda membingungkan.

### Gaya penulisan

- Sapaan "kamu", bahasa Indonesia sehari-hari, angka nyata, hindari jargon lingkungan berat.
- Transparansi: "harga acuan, bisa berubah" — jangan janji harga final.

---

## 6. Rekomendasi

1. **MVP v1 (sekarang):** app demo statis — foto/pilih jenis sampah → estimasi harga (registry harga acuan) → jadwal jemput → simulasi QRIS + poin → leaderboard + dashboard dampak. Semua localStorage, tanpa server.
2. **v2:** integrasi QRIS asli, peta bank sampah nyata (geolocation), AI vision beneran (model klasifikasi), admin panel bank sampah.
3. **Tunda:** monetisasi take-rate, multi-kota, partnership CSR.
4. **Legal/kejujuran:** disclaimer harga acuan; demo QRIS disebut simulasi.

---

## 7. Sumber

- SIPSN KLHK: sampahnasional.kemenlh.go.id (komposisi sampah)
- BRIN 2024: brin.go.id/news/125994/sipsn-2024-32-sampah-terolah-resmi
- Kompas: lestari.kompas.com (11,3 juta ton tidak terkelola, 28 Jul 2024)
- Tempo: tempo.co/lingkungan (35,67% tidak terkelola)
- GoodStats: data.goodstats.id (31,9 juta ton; plastik 19,64%)
- Harga: gerakanasri.com/harga-sampah-plastik-per-kg (2024–2025)
- Kompetitor: kepul.id, belisampah.com, wastepedia.id, trashily.id, reresik.com, bank.peduli-sampah.id, banksampahdigital.id, banksampah.id
- Design system: ui-ux-pro-max `--design-system` (lokal)
