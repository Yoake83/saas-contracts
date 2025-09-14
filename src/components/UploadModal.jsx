import React, { useState } from "react";

function FileRow({ file, onCancel }) {
  return (
    <div className="flex items-center justify-between border rounded px-3 py-2">
      <div>
        <div className="font-medium">{file.name}</div>
        <div className="text-xs text-gray-500">{file.status} • {Math.round((file.progress||0))}%</div>
      </div>
      <div>
        {file.status === 'Uploading' && <button onClick={()=>onCancel(file.id)} className="text-sm text-red-600">Cancel</button>}
        {file.status === 'Error' && <span className="text-sm text-red-600">Retry</span>}
      </div>
    </div>
  )
}

export default function UploadModal({ onClose }){
  const [files, setFiles] = useState([]);

  function startUpload(fileObj) {
    // simulate upload progress
    let progress = 0;
    fileObj.status = "Uploading";
    fileObj.progress = 0;
    setFiles(f => [...f.filter(x=>x.id!==fileObj.id), fileObj]);

    const interval = setInterval(() => {
      progress += Math.random()*30;
      if (progress >= 100) {
        clearInterval(interval);
        // random success / error
        const success = Math.random() > 0.1;
        setFiles(f => f.map(x => x.id === fileObj.id ? { ...x, progress: 100, status: success ? 'Success' : 'Error' } : x));
      } else {
        setFiles(f => f.map(x => x.id === fileObj.id ? { ...x, progress: progress } : x));
      }
    }, 500);

    // allow cancelling by storing interval id
    fileObj._interval = interval;
  }

  function handleFiles(selected) {
    const prepared = Array.from(selected).map(f => ({ id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`, name: f.name, status: 'Queued', progress: 0 }));
    prepared.forEach(p => startUpload(p));
  }

  function cancelUpload(id) {
    setFiles(prev => prev.map(f => {
      if (f.id === id) {
        if (f._interval) clearInterval(f._interval);
        return {...f, status: 'Error'};
      }
      return f;
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-2xl p-6 rounded">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload documents</h3>
          <button onClick={onClose} className="text-sm text-gray-600">Close</button>
        </div>

        <div className="border-dashed border-2 border-gray-300 p-6 rounded text-center mb-4">
          <p className="mb-2">Drag & drop files here or</p>
          <label className="inline-block px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer">
            Browse
            <input type="file" multiple className="hidden" onChange={e=>handleFiles(e.target.files)} />
          </label>
        </div>

        <div className="space-y-2">
          {files.map(f => <FileRow key={f.id} file={f} onCancel={cancelUpload} />)}
        </div>
      </div>
    </div>
  );
}
