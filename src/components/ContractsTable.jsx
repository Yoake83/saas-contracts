import React from "react";
import { Link } from "react-router-dom";
import { useContracts } from "../contexts/ContractsContext";

function Badge({ children, tone='gray' }) {
  const bg = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  }[tone];
  return <span className={`px-2 py-1 rounded text-xs ${bg}`}>{children}</span>
}

export default function ContractsTable(){
  const {
    loading, error, pageItems,
    search, setSearch,
    statusFilter, setStatusFilter,
    riskFilter, setRiskFilter,
    page, setPage, totalPages
  } = useContracts();

  if (loading) return <div className="p-6 bg-white rounded shadow">Loading contracts…</div>;
  if (error) return <div className="p-6 bg-white rounded shadow text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or parties" className="border rounded px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border rounded px-2 py-2">
            <option value="">All status</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Renewal Due</option>
          </select>
          <select value={riskFilter} onChange={e=>setRiskFilter(e.target.value)} className="border rounded px-2 py-2">
            <option value="">All risk</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <table className="w-full table-auto">
        <thead className="text-left text-sm text-gray-600">
          <tr>
            <th className="p-2">Contract Name</th>
            <th className="p-2">Parties</th>
            <th className="p-2">Expiry</th>
            <th className="p-2">Status</th>
            <th className="p-2">Risk</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.length === 0 && (
            <tr><td colSpan="6" className="p-6 text-center text-gray-500">No contracts yet</td></tr>
          )}
          {pageItems.map(c => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.parties}</td>
              <td className="p-2">{c.expiry}</td>
              <td className="p-2"><Badge tone={c.status === 'Active' ? 'green' : c.status === 'Renewal Due' ? 'yellow' : 'gray'}>{c.status}</Badge></td>
              <td className="p-2"><Badge tone={c.risk === 'High' ? 'red' : c.risk === 'Medium' ? 'yellow' : 'green'}>{c.risk}</Badge></td>
              <td className="p-2">
                <Link to={`/contracts/${c.id}`} className="text-sm text-indigo-600">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
        <div className="flex gap-2">
          <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
