import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClaimForm from './components/ClaimForm';
import LiquidityForm from './components/LiquidityForm';

export default function App() {
  // 👉 Thêm đoạn này bên trong function App
  const [account, setAccount] = useState("");
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => setAccount(accounts[0]));
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>💱 Giao Diện Giao Dịch GMECOIN</h1

      {/* Hiển thị địa chỉ ví */}
{account ? (

  <div style={{ marginBottom: '10px' }}>
    <strong>Địa chỉ ví:</strong> {account.slice(0, 6)}...{account.slice(-4)}
    <button 
      onClick={() => navigator.clipboard.writeText(account)}
      style={{ marginLeft: '10px', cursor: 'pointer' }}
    >
      📋 Copy
    </button>
  </div>
) : (
  <p><em>Chưa kết nối ví</em></p>
)}

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
