import React from 'react';

export default function Header({ onReportClick, onClassesClick }) {
  return (
    <header className="mb-6 flex items-center justify-between bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 text-white rounded-xl p-4 shadow-lg">
      <div>
        <h1 className="text-2xl font-extrabold drop-shadow">Absensi Mahasiswa Gunadarma</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={onReportClick} className="px-3 py-2 rounded bg-white/20 hover:bg-white/30">Laporan Kehadiran</button>
          <button onClick={onClassesClick} className="px-3 py-2 rounded bg-white/20 hover:bg-white/30">Kelola Kelas</button>
          <img src="/src/gunadarma-logo.png" alt="Universitas Gunadarma" className="w-24 h-24 object-cover rounded-md shadow" />
        </div>
      </div>
    </header>
  );
}
