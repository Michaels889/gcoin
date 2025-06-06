import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClaimForm from './components/ClaimForm';
import LiquidityForm from './components/LiquidityForm';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🌐 GMECOIN dApp</h1>

      <nav style={{ marginBottom: '20px' }}>
        <Link to="/claim" style={{ marginRight: '20px' }}>📥 Claim GMECOIN</Link>
        <Link to="/liquidity">💧 Liquidity</Link>
      </nav>

      <Routes>
        <Route path="/claim" element={<ClaimForm />} />
        <Route path="/liquidity" element={<LiquidityForm />} />
        <Route path="*" element={<ClaimForm />} />
      </Routes>
    </div>
  );
}