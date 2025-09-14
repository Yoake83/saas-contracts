import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import { useContracts } from "../contexts/ContractsContext";

function Chip({ text, tone='gray' }){
  const bg = tone === 'red' ? 'bg-red-100 text-red-800' : tone === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';
  return <span className={`px-2 py-1 rounded ${bg}`}>{text}</span>
}

export default function ContractDetailPage(){
  const { id } = useParams();
  const { getContractDetail } = useContracts();
  const [state, setState] = useState({loading:true, error:null, data:null});
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    setState({loading:true, error:null, data:null});
    getContractDetail(id).then(res => {
      if (res.ok) setState({loading:false, error:null, data:res.data});
      else setState({loading:false, error:res.message, data:null});
    });
  }, [id]);

  if (state.loading) return <div className="min-h-screen flex"><Sidebar /><main className="p-6">Loading…</main></div>;
  if (state.error) return <div className="min-h-screen flex"><Sidebar /><main className="p-6 text-red-600">{state.error}</main></div>;

  const c = state.data;
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{c.name}</h2>
                <div className="text-sm text-gray-600">{c.parties}</div>
                <div className="mt-2 space-x-2">
                  <span>Start: {c.start}</span>
                  <span>Expiry: {c.expiry}</span>
                </div>
              </div>
              <div className="space-y-2 text-right">
                <Chip text={c.status} tone={c.status==='Active'?'green':'yellow'} />
                <Chip text={`Risk: ${c.risk}`} tone={c.risk==='High'?'red': (c.risk==='Medium' ? 'yellow' : 'gray')} />
                <button onClick={()=>setShowEvidence(s=>!s)} className="text-sm text-indigo-600">Toggle Evidence</button>
              </div>
            </div>

            <section className="mt-6">
              <h3 className="font-semibold mb-2">Clauses</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {c.clauses.map((cl, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{cl.title}</div>
                        <div className="text-sm text-gray-600">{cl.summary}</div>
                      </div>
                      <div className="text-sm text-gray-700">{Math.round(cl.confidence * 100)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h3 className="font-semibold mb-2">AI Insights</h3>
              <ul className="space-y-2">
                {c.insights.map((i, idx)=>(
                  <li key={idx} className="flex items-center justify-between border rounded p-3">
                    <div>{i.message}</div>
                    <div>
                      <span className={`px-2 py-1 rounded text-sm ${i.risk==='High' ? 'bg-red-100 text-red-800' : i.risk==='Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{i.risk}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>

      {/* Evidence drawer */}
      <aside className={`w-96 bg-white border-l p-4 transition-transform ${showEvidence ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-0 h-full`}>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">Evidence</h4>
          <button onClick={()=>setShowEvidence(false)} className="text-sm text-gray-600">Close</button>
        </div>
        <div className="space-y-3">
          {c.evidence.map((e, i) => (
            <div key={i} className="border rounded p-3">
              <div className="text-xs text-gray-500">{e.source} · relevance {Math.round(e.relevance * 100)}%</div>
              <div className="mt-2 text-sm">{e.snippet}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
