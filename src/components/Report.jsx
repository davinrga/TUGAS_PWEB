import React from 'react';

export default function Report({ attendance, students, classes, reportFilterClassId, setReportFilterClassId, onBack }) {
  const months = Object.keys(attendance).sort();
  const visibleStudents = students.filter((s) => (reportFilterClassId ? s.classId === reportFilterClassId : true));

  return (
    <main>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Rekap Kehadiran Mahasiswa</h2>
          <div className="flex items-center gap-2">
            <select value={reportFilterClassId} onChange={(e) => setReportFilterClassId(e.target.value)} className="border rounded px-3 py-2 bg-white">
              <option value="">Semua Kelas</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button onClick={() => { onBack(); setReportFilterClassId(''); }} className="px-3 py-2 rounded bg-indigo-600 text-white">Kembali</button>
          </div>
        </div>

        {months.length === 0 ? (
          <div className="text-sm text-gray-500">Belum ada data kehadiran.</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th rowSpan={2} className="px-3 py-2">Nama</th>
                  <th rowSpan={2} className="px-3 py-2">NPM</th>
                  <th rowSpan={2} className="px-3 py-2">Kelas</th>
                  <th rowSpan={2} className="px-3 py-2">Total Hadir</th>
                  {months.map((month) => (
                    <th key={month} colSpan={4} className="px-3 py-2 text-center">{month}</th>
                  ))}
                </tr>
                <tr className="text-left text-xs text-gray-500">
                  {months.map((month) => (
                    ['M1','M2','M3','M4'].map((wk) => (
                      <th key={`${month}-${wk}`} className="px-2 py-2 text-center">{wk}</th>
                    ))
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleStudents.map((s) => {
                  const total = months.reduce((acc, month) => {
                    const weeks = attendance[month] || {};
                    const monthTotal = ['M1','M2','M3','M4'].reduce((a, w) => a + (weeks[w] && weeks[w][s.id] ? 1 : 0), 0);
                    return acc + monthTotal;
                  }, 0);
                  return (
                    <tr key={s.id} className="border-t">
                      <td className="px-3 py-2">{s.name}</td>
                      <td className="px-3 py-2">{s.npm || '-'}</td>
                      <td className="px-3 py-2">{(classes.find(c=>c.id===s.classId)||{}).name || '-'}</td>
                      <td className="px-3 py-2 font-medium">{total}</td>
                      {months.map((month) => {
                        const weeks = attendance[month] || {};
                        return ['M1','M2','M3','M4'].map((wk) => (
                          <td key={`${s.id}-${month}-${wk}`} className="px-3 py-2 text-center">{weeks[wk] && weeks[wk][s.id] ? '✓' : '—'}</td>
                        ));
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
