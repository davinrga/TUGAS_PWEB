import React from 'react';

export default function StudentForm({
  name, setName,
  npmValue, setNpmValue,
  studentClass, setStudentClass,
  classes,
  editingId,
  onSubmit,
  onCancel,
}) {
  return (
    <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
      <h2 className="font-semibold text-lg mb-4">{editingId ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nama</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">NPM</label>
          <input value={npmValue} onChange={(e) => setNpmValue(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Kelas</label>
          <select value={studentClass} onChange={(e) => setStudentClass(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-2 mt-1 focus:outline-none">
            <option value="">(Tidak Ada)</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">{editingId ? 'Simpan' : 'Tambah'}</button>
          {editingId ? (
            <button type="button" onClick={onCancel} className="px-3 py-2 rounded bg-gray-100">Batal</button>
          ) : null}
        </div>
      </form>
    </aside>
  );
}
