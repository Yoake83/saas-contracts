import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const ContractsContext = createContext();

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state: search, filters, pagination
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetch("/contracts.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load contracts");
        return r.json();
      })
      .then((data) => {
        setContracts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = [...contracts];
    if (q) arr = arr.filter(c => c.name.toLowerCase().includes(q) || c.parties.toLowerCase().includes(q));
    if (statusFilter) arr = arr.filter(c => c.status === statusFilter);
    if (riskFilter) arr = arr.filter(c => c.risk === riskFilter);
    return arr;
  }, [contracts, search, statusFilter, riskFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getContractDetail = async (id) => {
    // fetch detail from public/contracts/:id.json
    try {
      const res = await fetch(`/contracts/${id}.json`);
      if (!res.ok) throw new Error("Failed to fetch contract detail");
      const data = await res.json();
      return { ok: true, data };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  };

  return (
    <ContractsContext.Provider value={{
      contracts, loading, error,
      search, setSearch,
      statusFilter, setStatusFilter,
      riskFilter, setRiskFilter,
      page, setPage, pageSize, totalPages, pageItems,
      getContractDetail
    }}>
      {children}
    </ContractsContext.Provider>
  )
};

export const useContracts = () => useContext(ContractsContext);
