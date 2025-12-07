import React from 'react';

export default function Header({ onReportClick = () => {}, onClassesClick = () => {}, onHomeClick = () => {} }) {
  return (
    <header className="mb-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <button onClick={onHomeClick} className="flex items-center gap-3 focus:outline-none">
            <img src="/src/gunadarma-logo.png" alt="Logo" className="w-12 h-12 rounded-md object-cover shadow-sm" />
            <div className="text-left">
              <div className="text-lg font-semibold text-slate-800">Absensi Gunadarma</div>
            </div>
          </button>
        </div>

        {/* Right: Nav + Mobile */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full shadow-sm">
            <button onClick={onHomeClick} className="px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-indigo-600 rounded-full transition">Home</button>
            <button onClick={onClassesClick} className="px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-indigo-600 rounded-full transition">Kelas</button>
            <button onClick={onReportClick} className="px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-indigo-600 rounded-full transition">Rekap</button>
          </nav>

          <div className="md:hidden">
            <button className="p-2 rounded-md bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
