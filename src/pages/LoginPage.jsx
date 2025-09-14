import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = login({ username, password });
    if (res.ok) nav("/");
    else setError(res.message || "Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <label className="block mb-3">
          <div className="text-sm mb-1">Username</div>
          <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full border rounded px-3 py-2" />
        </label>
        <label className="block mb-4">
          <div className="text-sm mb-1">Password</div>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2" />
          <div className="text-xs text-gray-500 mt-1">Use password <strong>test123</strong> to login</div>
        </label>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
