(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SampahPintar = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const WASTE_TYPES = [
    { id: 'pet-bening', nama: 'Botol PET Bening', kategori: 'plastik', hargaLow: 2500, hargaHigh: 4000, contoh: 'Botol air mineral, botol minuman', tips: 'Bilas bersih, lepaskan label, injek pipih', warna: [225, 235, 240], jual: true },
    { id: 'pet-warna', nama: 'Botol PET Berwarna', kategori: 'plastik', hargaLow: 1500, hargaHigh: 2500, contoh: 'Botol teh, botol sirup', tips: 'Pisahkan dari PET bening', warna: [210, 140, 60], jual: true },
    { id: 'hdpe', nama: 'Plastik HDPE', kategori: 'plastik', hargaLow: 1500, hargaHigh: 2500, contoh: 'Botol deterjen, galon, botol sampo', tips: 'Kosongkan dan bilas', warna: [245, 245, 245], jual: true },
    { id: 'pp', nama: 'Plastik PP', kategori: 'plastik', hargaLow: 1000, hargaHigh: 2000, contoh: 'Wadah makanan, tutup botol, sedotan', tips: 'Cuci sebelum dikumpulkan', warna: [90, 120, 230], jual: true },
    { id: 'ldpe', nama: 'Kantong Plastik (LDPE)', kategori: 'plastik', hargaLow: 500, hargaHigh: 1500, contoh: 'Kresek, plastik wrap', tips: 'Kumpulkan volume besar dulu, nilai per kg kecil', warna: [200, 200, 210], jual: true },
    { id: 'kardus', nama: 'Kardus', kategori: 'kertas', hargaLow: 1200, hargaHigh: 2000, contoh: 'Paket e-commerce, kotak mie', tips: 'Jangan sampai basah, lipat rapi', warna: [180, 130, 80], jual: true },
    { id: 'kertas-hvs', nama: 'Kertas HVS', kategori: 'kertas', hargaLow: 1500, hargaHigh: 2500, contoh: 'Kertas print, fotokopi bekas', tips: 'Lepas klip dan plastik jilid', warna: [250, 250, 250], jual: true },
    { id: 'koran', nama: 'Koran dan Majalah', kategori: 'kertas', hargaLow: 800, hargaHigh: 1500, contoh: 'Koran, majalah, katalog', tips: 'Ikat rapi agar mudah ditimbang', warna: [170, 170, 165], jual: true },
    { id: 'kaleng', nama: 'Kaleng Aluminium', kategori: 'logam', hargaLow: 12000, hargaHigh: 18000, contoh: 'Kaleng minuman', tips: 'Kempeskan, jangan berkarat', warna: [190, 195, 200], jual: true },
    { id: 'besi', nama: 'Besi dan Logam', kategori: 'logam', hargaLow: 1500, hargaHigh: 2500, contoh: 'Paku, seng, besi tua', tips: 'Pisahkan dari sampah lain', warna: [110, 110, 115], jual: true },
    { id: 'kaca', nama: 'Botol Kaca', kategori: 'kaca', hargaLow: 300, hargaHigh: 700, contoh: 'Botol kecap, botol sirup', tips: 'Bungkus koran agar aman', warna: [210, 225, 230], jual: true },
    { id: 'organik', nama: 'Sisa Makanan dan Organik', kategori: 'organik', hargaLow: 0, hargaHigh: 0, contoh: 'Sisa nasi, sayur, kulit buah', tips: 'Kompos mandiri di rumah, bukan untuk dijual', warna: [90, 140, 60], jual: false },
    { id: 'lainnya', nama: 'Lainnya', kategori: 'lainnya', hargaLow: 0, hargaHigh: 0, contoh: 'Sampah campuran', tips: 'Pilah dulu per jenis supaya nilainya naik', warna: [128, 128, 128], jual: false }
  ];

  const BATAS_JARAK = 140;
  const FAKTOR_CO2 = { plastik: 1.75, kertas: 0.9, logam: 2, kaca: 0.5, organik: 0.5, lainnya: 1 };

  function byId(id) {
    return WASTE_TYPES.find(function (t) { return t.id === id; });
  }

  function jarakRgb(a, b) {
    return Math.sqrt(
      Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)
    );
  }

  function classify(rgb) {
    let terbaik = null;
    let jarakTerbaik = Infinity;
    for (const t of WASTE_TYPES) {
      const d = jarakRgb(rgb, t.warna);
      if (d < jarakTerbaik) {
        jarakTerbaik = d;
        terbaik = t;
      }
    }
    if (jarakTerbaik > BATAS_JARAK) {
      const t = byId('lainnya');
      return { id: t.id, nama: t.nama, keyakinan: 0 };
    }
    const keyakinan = Math.max(0, Math.min(1, Math.round((1 - jarakTerbaik / BATAS_JARAK) * 100) / 100));
    return { id: terbaik.id, nama: terbaik.nama, keyakinan: keyakinan };
  }

  function estimatePrice(typeId, kg) {
    const t = byId(typeId);
    if (!t) return { low: 0, high: 0, mid: 0 };
    const berat = Number(kg) || 0;
    const low = Math.round(t.hargaLow * berat);
    const high = Math.round(t.hargaHigh * berat);
    return { low: low, high: high, mid: Math.round((low + high) / 2) };
  }

  function pointsFrom(rupiah) {
    return Math.round((Number(rupiah) || 0) / 100);
  }

  function impactKg(typeId, kg) {
    const t = byId(typeId);
    const berat = Number(kg) || 0;
    const faktor = FAKTOR_CO2[t && t.kategori ? t.kategori : 'lainnya'];
    return { tpa: berat, co2: Math.round(berat * faktor * 100) / 100 };
  }

  function formatRp(n) {
    const bulat = Math.round(Number(n) || 0);
    return 'Rp ' + String(bulat).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function validateSchedule(dateISO, slot, nowISO) {
    if (slot !== 'pagi' && slot !== 'siang') {
      return { ok: false, alasan: 'Slot jemput harus pagi atau siang' };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateISO))) {
      return { ok: false, alasan: 'Format tanggal tidak valid' };
    }
    const hariIni = String(nowISO).slice(0, 10);
    if (String(dateISO) < hariIni) {
      return { ok: false, alasan: 'Tanggal jemput sudah lewat' };
    }
    return { ok: true, alasan: '' };
  }

  function sortLeaderboard(entries) {
    return entries.slice().sort(function (a, b) { return b.poin - a.poin; });
  }

  return {
    WASTE_TYPES: WASTE_TYPES,
    byId: byId,
    classify: classify,
    estimatePrice: estimatePrice,
    pointsFrom: pointsFrom,
    impactKg: impactKg,
    formatRp: formatRp,
    validateSchedule: validateSchedule,
    sortLeaderboard: sortLeaderboard
  };
});
