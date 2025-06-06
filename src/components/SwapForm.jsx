import React, { useState } from 'react';
import Web3 from 'web3';
import config from '../config';

function SwapForm({ account }) {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSwap = async () => {
    if (!account) {
      setStatus("⚠️ Vui lòng kết nối ví trước.");
      return;
    }

    try {
      setStatus("⏳ Đang gửi giao dịch...");

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);

      const valueInWei = web3.utils.toWei(amount, 'ether');

      await contract.methods.swap().send({
        from: account,
        value: valueInWei,
      });

      setStatus("✅ Giao dịch thành công!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Giao dịch thất bại.");
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Nhập số BNB"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSwap} style={{ marginLeft: '10px' }}>
        Swap lấy GMECOIN
      </button>

      {status && (
        <div style={{ marginTop: '10px' }}>
          <em>{status}</em>
        </div>
      )}
    </div>
  );
}

export default SwapForm;