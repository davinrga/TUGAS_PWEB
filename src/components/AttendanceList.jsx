import React from 'react';

export default function AttendanceList({ visibleStudents, todaysAttendance, toggleAttendance, startEdit, deleteStudent, classes }) {
  return (
    <div className="grid gap-4">
      {visibleStudents.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center text-gray-500 shadow">Belum ada data mahasiswa pada filter ini.</div>
      ) : (
        visibleStudents.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">{(s.name||"?").split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
              <div>
                <div className="font-medium text-slate-800">{s.name}</div>
                <div className="text-sm text-gray-500">{s.npm || s.nim || "-"} {s.classId ? `• ${(classes.find(c=>c.id===s.classId)||{}).name || ''}` : ''}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => toggleAttendance(s.id)} className={`px-4 py-2 rounded-full font-medium transition ${todaysAttendance[s.id] ? 'bg-green-500 text-white shadow' : 'bg-gray-100 text-gray-700'}`}>
                {todaysAttendance[s.id] ? 'Hadir' : 'Absen'}
              </button>
              <button onClick={() => startEdit(s)} className="px-3 py-2 rounded bg-yellow-100">Edit</button>
              <button onClick={() => deleteStudent(s.id)} className="px-3 py-2 rounded bg-red-100">Hapus</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
