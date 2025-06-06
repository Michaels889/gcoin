import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClaimForm from './components/ClaimForm';
import LiquidityForm from './components/LiquidityForm';
import { ethers } from 'ethers';
import config from './config';
import tokenABI from './abis/GMECOIN.json';

export default function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  // Kết nối MetaMask
  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(newAccounts[0]);
          }
        } else {
          console.error("🦊 MetaMask chưa được cài đặt.");
        }
      } catch (error) {
        if (error.code === -32002) {
          console.warn("🛑 Đang chờ MetaMask cho phép. Vui lòng kiểm tra ví.");
        } else {
          console.error("❌ Lỗi kết nối MetaMask:", error.message);
        }
      }
    };

    connectWallet();
  }, []);

  // Lấy số dư token
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
    <div style={{ padding: '20px' }}>
      <h1>🌐 Giao Diện Giao Dịch GMECOIN</h1>

      {/* Hiển thị địa chỉ ví */}
      {account ? (
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={() => navigator.clipboard.writeText(account)}
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          >
            📋 Copy
          </button>
          <strong>Địa chỉ ví:</strong> {account.slice(0, 6)}...{account.slice(-4)}
          <p><strong>Số dư GMECOIN:</strong> {balance}</p>
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
  );
}
