import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ClaimForm from './components/ClaimForm';
import LiquidityForm from './components/LiquidityForm';
import config from './config';
import tokenABI from './abis/GMECOIN.json';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => setAccount(accounts[0]));
    }
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      if (account && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const tokenContract = new ethers.Contract(config.TOKEN_ADDRESS, tokenABI, provider);
        const bal = await tokenContract.balanceOf(account);
        setBalance(ethers.utils.formatUnits(bal, 18));
      }
    };
    loadBalance();
  }, [account]);

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>🌐 Giao Diện Giao Dịch GMECOIN</h1>

        {account ? (
          <div style={{ marginBottom: '10px' }}>
            <button
              onClick={() => navigator.clipboard.writeText(account)}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              📋 Copy
            </button>
            <strong>📌 Địa chỉ ví:</strong> {account.slice(0, 6)}...{account.slice(-4)} <br />
            <strong>💰 Số dư GMECOIN:</strong> {balance}			
          </div>
        ) : (
          <p><em>Chưa kết nối ví</em></p>
        )}

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/claim" style={{ marginRight: '20px' }}>📩 Claim GMECOIN</Link>
          <Link to="/liquidity">💧 Liquidity</Link>
        </nav>

        <Routes>
          <Route path="/claim" element={<ClaimForm />} />
          <Route path="/liquidity" element={<LiquidityForm />} />
          <Route path="*" element={<ClaimForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;