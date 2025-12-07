import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Web Sederhana dengan React.js</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm text-center">
        <p className="text-lg mb-4">Counter: {count}</p>
        <button
            className="px-4 py-2 rounded-2xl shadow bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setCount(count + 1)}
        >
            Tambah
        </button>
        </div>
    </div>
);
}
