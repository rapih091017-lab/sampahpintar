const test = require('node:test');
const assert = require('node:assert');
const S = require('../lib/sampahpintar.js');

test('formatRp memisahkan ribuan gaya Indonesia', () => {
  assert.strictEqual(S.formatRp(12500), 'Rp 12.500');
  assert.strictEqual(S.formatRp(0), 'Rp 0');
});

test('estimatePrice kalikan harga acuan dengan berat', () => {
  assert.deepStrictEqual(S.estimatePrice('pet-bening', 2), { low: 5000, high: 8000, mid: 6500 });
});

test('pointsFrom ubah rupiah jadi poin', () => {
  assert.strictEqual(S.pointsFrom(6500), 65);
  assert.strictEqual(S.pointsFrom(0), 0);
});

test('impactKg hitung TPA dan CO2e per jenis', () => {
  assert.deepStrictEqual(S.impactKg('pet-bening', 2), { tpa: 2, co2: 3.5 });
});

test('classify cocokkan warna patokan ke jenis sampah', () => {
  assert.strictEqual(S.classify([180, 130, 80]).id, 'kardus');
  assert.strictEqual(S.classify([90, 140, 60]).id, 'organik');
  assert.strictEqual(S.classify([0, 0, 0]).id, 'lainnya');
});

test('classify keyakinan antara 0 dan 1', () => {
  const r = S.classify([180, 130, 80]);
  assert.ok(r.keyakinan > 0 && r.keyakinan <= 1);
  assert.strictEqual(typeof r.nama, 'string');
});

test('validateSchedule tolak tanggal lampau dan slot sembarangan', () => {
  assert.strictEqual(S.validateSchedule('2020-01-01', 'pagi', '2026-10-18').ok, false);
  assert.strictEqual(S.validateSchedule('2026-10-20', 'selasa', '2026-10-18').ok, false);
  assert.strictEqual(S.validateSchedule('2026-10-20', 'siang', '2026-10-18').ok, true);
  assert.strictEqual(S.validateSchedule('2026-10-18', 'pagi', '2026-10-18').ok, true);
});

test('sortLeaderboard urut poin menurun', () => {
  const out = S.sortLeaderboard([{ nama: 'A', poin: 5 }, { nama: 'B', poin: 9 }, { nama: 'C', poin: 7 }]);
  assert.deepStrictEqual(out.map(e => e.nama), ['B', 'C', 'A']);
});

test('registry punya 13 jenis lengkap fieldnya', () => {
  assert.strictEqual(S.WASTE_TYPES.length, 13);
  for (const t of S.WASTE_TYPES) {
    assert.ok(t.id && t.nama && t.kategori && Array.isArray(t.warna));
    assert.ok(typeof t.hargaLow === 'number' && typeof t.hargaHigh === 'number');
    assert.ok(typeof t.jual === 'boolean');
  }
  assert.strictEqual(S.byId('kardus').nama, 'Kardus');
});
