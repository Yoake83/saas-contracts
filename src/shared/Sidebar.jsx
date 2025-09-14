import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink to={to} className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
    {children}
  </NavLink>
);

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold text-xl">SaaS Contracts</div>
      <nav className="p-2 space-y-1">
        <NavItem to="/">Contracts</NavItem>
        <NavItem to="/insights">Insights</NavItem>
        <NavItem to="/reports">Reports</NavItem>
        <NavItem to="/settings">Settings</NavItem>
      </nav>
    </aside>
  );
}
