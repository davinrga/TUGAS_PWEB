import React from 'react';

export default function AttendanceControls({
  filterClassId, setFilterClassId,
  selectedMonth, setSelectedMonth,
  selectedWeek, setSelectedWeek,
  classes,
  presentCountAll,
  presentCountFiltered,
  visibleStudents,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg">Daftar & Absen</h2>
          <p className="text-sm text-gray-500">Filter kelas dan pilih bulan + minggu untuk merekam kehadiran.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={filterClassId} onChange={(e) => setFilterClassId(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Semua Kelas</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border rounded px-3 py-2" />
          <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)} className="border rounded px-3 py-2">
            <option value="M1">M1</option>
            <option value="M2">M2</option>
            <option value="M3">M3</option>
            <option value="M4">M4</option>
          </select>
          <div className="ml-2 text-sm text-slate-600">
            {filterClassId ? (
              <span>Hadir di kelas: <strong>{presentCountFiltered}</strong> / {visibleStudents.length}</span>
            ) : (
              <span>Hadir minggu ini: <strong>{presentCountAll}</strong></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
