import React, { useState } from 'react';
import { ethers } from 'ethers';
//import { CONTRACT_ADDRESS, CONTRACT_ABI, CONTRACT_ABI } from '../config';
import GMECOIN_ABI from '../abis/GMECOIN.json';
import CLAIM_ABI from '../abis/ClaimContract.json';
import config from '../config';
config.CONTRACT_ADDRESS;

export default function ClaimForm({ account }) {
  const [status, setStatus] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask không được phát hiện');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.claim();
      setStatus('⏳ Đang xử lý giao dịch...');
      await tx.wait();

      setIsClaimed(true);
      setStatus('✅ Nhận GMECOIN thành công!');
    } catch (err) {
      setStatus('❌ Lỗi: ' + err.message);
    }
  };

  return (
    <div>
      <h2>📥 Nhận GMECOIN</h2>
      <button onClick={handleClaim} disabled={isClaimed}>
        {isClaimed ? 'Đã nhận' : 'Nhận GMECOIN'}
      </button>
      <p>{status}</p>
    </div>
  );
}
