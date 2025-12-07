import React from 'react';

export default function ClassManager({ classes, className, setClassName, editingClassId, startEditClass, addClass, saveEditClass, deleteClass }) {
  return (
    <div className="my-6 border-t pt-4">
      <h3 className="font-semibold mb-3">Kelola Kelas</h3>
      <form onSubmit={editingClassId ? saveEditClass : addClass} className="flex gap-2">
        <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Nama kelas" className="flex-1 border border-slate-200 rounded px-3 py-2 focus:outline-none" />
        <button type="submit" className="px-3 py-2 rounded bg-emerald-500 text-white">{editingClassId ? 'Simpan' : 'Tambah'}</button>
      </form>
      <div className="mt-3 space-y-2">
        {classes.length === 0 ? <div className="text-sm text-gray-500">Belum ada kelas.</div> : classes.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
            <div className="text-sm font-medium">{c.name}</div>
            <div className="flex gap-2">
              <button onClick={() => startEditClass(c)} className="px-2 py-1 text-sm bg-yellow-100 rounded">Edit</button>
              <button onClick={() => deleteClass(c.id)} className="px-2 py-1 text-sm bg-red-100 rounded">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
