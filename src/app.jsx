import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import StudentForm from "./components/StudentForm";
import ClassManager from "./components/ClassManager";
import AttendanceControls from "./components/AttendanceControls";
import AttendanceList from "./components/AttendanceList";
import Report from "./components/Report";

const LS_STUDENTS = "absen_students";
const LS_ATTENDANCE = "absen_attendance"; // { date: { studentId: true/false } }
const LS_CLASSES = "absen_classes"; // [{ id, name }]

function loadStudents() {
  try {
    const raw = localStorage.getItem(LS_STUDENTS);
    const arr = raw ? JSON.parse(raw) : [];
    // migrate older objects using `nim` to new `npm` property
    return arr.map((s) => {
      if (s && s.npm === undefined && s.nim !== undefined) {
        return { ...s, npm: s.nim };
      }
      return s;
    });
  } catch (e) {
    return [];
  }
}

function saveStudents(students) {
  localStorage.setItem(LS_STUDENTS, JSON.stringify(students));
}

function loadAttendance() {
  try {
    const raw = localStorage.getItem(LS_ATTENDANCE);
    const data = raw ? JSON.parse(raw) : {};
    // migrate old date-based attendance (YYYY-MM-DD) to month->week (M1..M4)
    const migrated = {};
    const isDateKey = (k) => /^\d{4}-\d{2}-\d{2}$/.test(k);
    Object.keys(data).forEach((k) => {
      if (isDateKey(k)) {
        const month = k.slice(0,7);
        const day = parseInt(k.slice(8,10), 10);
        const weekIdx = Math.min(4, Math.ceil(day / 7));
        const week = `M${weekIdx}`;
        if (!migrated[month]) migrated[month] = {};
        if (!migrated[month][week]) migrated[month][week] = {};
        Object.keys(data[k] || {}).forEach((sid) => {
          if (data[k][sid]) migrated[month][week][sid] = true;
        });
      } else {
        // assume already in new shape: month -> Mx -> {id: true}
        migrated[k] = data[k];
      }
    });
    return migrated;
  } catch (e) {
    return {};
  }
}

function saveAttendance(attendance) {
  localStorage.setItem(LS_ATTENDANCE, JSON.stringify(attendance));
}

function loadClasses() {
  try {
    const raw = localStorage.getItem(LS_CLASSES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveClasses(classes) {
  localStorage.setItem(LS_CLASSES, JSON.stringify(classes));
}

export default function App() {
  const [students, setStudents] = useState(loadStudents());
  const [attendance, setAttendance] = useState(loadAttendance());
  const [classes, setClasses] = useState(loadClasses());
  const [name, setName] = useState("");
  const [npmValue, setNpmValue] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [editingId, setEditingId] = useState(null);
  const today = new Date();
  const defaultMonth = today.toISOString().slice(0,7);
  const defaultWeek = `M${Math.min(4, Math.ceil(today.getDate()/7))}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);
  const [filterClassId, setFilterClassId] = useState("");
  const [className, setClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);
  const [view, setView] = useState("home");
  const [reportFilterClassId, setReportFilterClassId] = useState("");

  useEffect(() => { saveStudents(students); }, [students]);
  useEffect(() => { saveAttendance(attendance); }, [attendance]);
  useEffect(() => { saveClasses(classes); }, [classes]);

  function addStudent(e) {
    e.preventDefault();
    if (!name.trim() || !npmValue.trim()) return;
    const id = Date.now().toString();
    const next = [...students, { id, name: name.trim(), npm: npmValue.trim(), classId: studentClass || null }];
    setStudents(next);
    setName(""); setNpmValue(""); setStudentClass("");
  }

  function startEdit(s) {
    setEditingId(s.id);
    setName(s.name);
    setNpmValue(s.npm || "");
    setStudentClass(s.classId || "");
  }

  function saveEdit(e) {
    e.preventDefault();
    if (!editingId) return;
    setStudents((prev) => prev.map((p) => (p.id === editingId ? { ...p, name: name.trim(), npm: npmValue.trim(), classId: studentClass || null } : p)));
    setEditingId(null); setName(""); setNpmValue(""); setStudentClass("");
  }

  function cancelEdit() {
    setEditingId(null);
    setName(""); setNpmValue("");
  }

  function deleteStudent(id) {
    if (!confirm("Hapus mahasiswa ini?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setAttendance((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      Object.keys(copy).forEach((month) => {
        if (copy[month]) {
          Object.keys(copy[month]).forEach((wk) => {
            if (copy[month][wk] && copy[month][wk][id] !== undefined) delete copy[month][wk][id];
          });
        }
      });
      return copy;
    });
  }

  function toggleAttendance(studentId) {
    setAttendance((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || {}));
      if (!copy[selectedMonth]) copy[selectedMonth] = {};
      if (!copy[selectedMonth][selectedWeek]) copy[selectedMonth][selectedWeek] = {};
      copy[selectedMonth][selectedWeek][studentId] = !copy[selectedMonth][selectedWeek][studentId];
      return copy;
    });
  }

  // Classes CRUD
  function addClass(e) {
    e.preventDefault();
    if (!className.trim()) return;
    const id = Date.now().toString();
    setClasses((prev) => [...prev, { id, name: className.trim() }]);
    setClassName("");
  }

  function startEditClass(c) {
    setEditingClassId(c.id);
    setClassName(c.name);
  }

  function saveEditClass(e) {
    e.preventDefault();
    if (!editingClassId) return;
    setClasses((prev) => prev.map((p) => (p.id === editingClassId ? { ...p, name: className.trim() } : p)));
    setEditingClassId(null); setClassName("");
  }

  function deleteClass(id) {
    if (!confirm("Hapus kelas ini? Semua mahasiswa akan menjadi tanpa kelas.")) return;
    setClasses((prev) => prev.filter((c) => c.id !== id));
    setStudents((prev) => prev.map((s) => (s.classId === id ? { ...s, classId: null } : s)));
  }

  const todaysAttendance = (attendance[selectedMonth] && attendance[selectedMonth][selectedWeek]) ? attendance[selectedMonth][selectedWeek] : {};
  const visibleStudents = students.filter((s) => (filterClassId ? s.classId === filterClassId : true));
  const presentCountAll = Object.values(todaysAttendance).filter(Boolean).length;
  const presentCountFiltered = visibleStudents.filter((s) => todaysAttendance[s.id]).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <Header onReportClick={() => setView('report')} />

        {view === 'report' ? (
          <Report attendance={attendance} students={students} classes={classes} reportFilterClassId={reportFilterClassId} setReportFilterClassId={setReportFilterClassId} onBack={() => setView('home')} />
        ) : (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StudentForm
              name={name}
              setName={setName}
              npmValue={npmValue}
              setNpmValue={setNpmValue}
              studentClass={studentClass}
              setStudentClass={setStudentClass}
              classes={classes}
              editingId={editingId}
              onSubmit={editingId ? saveEdit : addStudent}
              onCancel={cancelEdit}
            />

            <section className="lg:col-span-2">
              <AttendanceControls
                filterClassId={filterClassId}
                setFilterClassId={setFilterClassId}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
                classes={classes}
                presentCountAll={presentCountAll}
                presentCountFiltered={presentCountFiltered}
                visibleStudents={visibleStudents}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                    <ClassManager
                      classes={classes}
                      className={className}
                      setClassName={setClassName}
                      editingClassId={editingClassId}
                      startEditClass={startEditClass}
                      addClass={addClass}
                      saveEditClass={saveEditClass}
                      deleteClass={deleteClass}
                    />
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <AttendanceList
                      visibleStudents={visibleStudents}
                      todaysAttendance={todaysAttendance}
                      toggleAttendance={toggleAttendance}
                      startEdit={startEdit}
                      deleteStudent={deleteStudent}
                      classes={classes}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}

        <footer className="mt-6 text-sm text-gray-500 text-center">Catatan: data disimpan secara lokal di browser (localStorage).</footer>
      </div>
    </div>
  );
}
