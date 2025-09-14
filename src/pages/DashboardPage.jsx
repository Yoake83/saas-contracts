import React, { useState } from "react";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import ContractsTable from "../components/ContractsTable";
import UploadModal from "../components/UploadModal";

export default function DashboardPage(){
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar onUpload={() => setShowUpload(true)} />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Contracts dashboard</h1>
          <ContractsTable />
        </main>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
