# Aplikasi Absensi Mahasiswa — Tugas PWEB

## Ringkasan
Aplikasi ini adalah single-page app (SPA) berbasis React untuk mencatat absensi mahasiswa. Fitur utamanya meliputi CRUD mahasiswa dan kelas, pencatatan kehadiran per-minggu di setiap bulan (M1..M4), serta halaman laporan rekap yang dapat difilter per-kelas.

Diimplementasikan sebagai proyek frontend sederhana yang dijalankan dengan Vite dan styling menggunakan Tailwind CSS. Data disimpan di browser menggunakan `localStorage` sehingga bersifat lokal pada mesin pengguna.

## Frameworks & Tooling (yang digunakan)
- React: library utama untuk UI (komponen dan hook) — digunakan di `src/app.jsx` dan `src/main.jsx`.
- Vite: dev server dan bundler cepat (skrip `npm run dev`, `npm run build`) — konfigurasi via `package.json`.
- Tailwind CSS: utility-first framework untuk styling — direktif berada di `src/index.css`, konfigurasi di `tailwind.config.cjs`.
- PostCSS + Autoprefixer: pipeline CSS untuk Tailwind, dikonfigurasi di `postcss.config.cjs`.
- npm / Node.js: package manager dan runtime untuk menjalankan dev server dan build.

## Struktur proyek (penjelasan tiap file/folder penting)
- `index.html` — entry HTML yang memuat bundel dari `/src/main.jsx`.
- `package.json` — daftar dependensi dan skrip (`dev`, `build`, `preview`).
- `postcss.config.cjs` — konfigurasi PostCSS (mengaktifkan Tailwind + Autoprefixer).
- `tailwind.config.cjs` — konfigurasi Tailwind (pola `content` dan kustomisasi tema bila ada).
- `src/` — sumber aplikasi
  - `src/main.jsx` — bootstrap aplikasi: mengimpor `src/index.css` dan merender `App` ke DOM.
  - `src/app.jsx` — komponen utama berisi semua logika: state, CRUD mahasiswa/kelas, logika absensi, dan UI (home + laporan).
  - `src/index.css` — file CSS global yang memuat direktif Tailwind (`@tailwind base; @tailwind components; @tailwind utilities;`).
  - `src/gunadarma-logo.png` — aset logo (ditampilkan di header).
- `legacy/` — arsip file lama atau duplikat yang dipindahkan (bukan bagian runtime aplikasi).

## Model data & Penyimpanan
Data disimpan di `localStorage` pada tiga key utama:
- `absen_students`: array mahasiswa, setiap item: `{ id, name, npm, classId? }`.
- `absen_classes`: array kelas, setiap item: `{ id, name }`.
- `absen_attendance`: object struktur bulan->minggu->mahasiswa, contoh:

```json
{
  "2025-12": {
    "M1": { "studentId1": true },
    "M2": { "studentId1": true, "studentId2": true },
    "M3": {},
    "M4": {}
  }
}
```

Keterangan: aplikasi juga menyediakan mekanisme migrasi otomatis bila ada data lama berformat tanggal (`YYYY-MM-DD`) — data lama akan dikonversi ke bulan + minggu (M1..M4) saat dimuat.

## Cara menjalankan (Windows PowerShell)
1. Install dependensi (cukup sekali):

```powershell
cd "C:\Users\M Arga Davin\Documents\TUGAS_PWEB"
npm install
```

2. Jalankan dev server:

```powershell
npm run dev
```

3. Buka browser pada URL yang ditampilkan (default `http://localhost:5173` — Vite dapat memilih port lain jika 5173 sedang dipakai).

4. Untuk build produksi:

```powershell
npm run build
npm run preview
```

## Fitur utama
- Tambah / edit / hapus mahasiswa (NPM digunakan sebagai identifier mahasiswa di UI).
- Tambah / edit / hapus kelas, dan menautkan mahasiswa ke kelas.
- Pilih bulan (`<input type="month">`) dan minggu (`M1..M4`) untuk mencatat kehadiran.
- Laporan rekap: menampilkan kolom per-bulan dengan subkolom `M1..M4` dan filter per-kelas.
- Data persistent di `localStorage` dan migrasi otomatis dari format tanggal lama.

## Tips & Troubleshooting singkat
- Jika styling Tailwind tidak muncul: pastikan `npm install` berhasil dan restart server.
- Jika Vite memilih port lain, perhatikan URL yang dicetak di terminal.
- Untuk membersihkan data uji: buka DevTools → Application → Local Storage → hapus key `absen_students`, `absen_classes`, `absen_attendance`.

## Saran pengembangan / refaktor (opsional)
- Pisahkan `src/app.jsx` menjadi beberapa komponen di `src/components/` (mis. `StudentForm.jsx`, `ClassList.jsx`, `ReportTable.jsx`) untuk maintainability.
- Pindahkan aset ke `src/assets/` dan tambah pengaturan bundling jika diperlukan.
- Tambahkan ekspor CSV/impor untuk backup data atau pertimbangkan backend (Node + DB) jika butuh persistence multi-user.

