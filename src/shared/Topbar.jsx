import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Topbar({ onUpload }){
  const { logout } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div>
        <button className="text-sm px-3 py-1 rounded bg-gray-100" onClick={onUpload}>Upload</button>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">Devika (you)</div>
        <button onClick={logout} className="text-sm px-3 py-1 rounded bg-red-50 text-red-600">Logout</button>
      </div>
    </header>
  );
}
