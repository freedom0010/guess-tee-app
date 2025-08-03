
import React, { useState } from 'react';
import { ethers } from 'ethers';
import guessGameAbi from './abi/GuessGame.json';
declare global {
  interface Window {
    ethereum?: any;
  }
}


const contractAddress = '0xC101767d778bC1Bc72dc6027e1ed3e8EB2fba38E'; // 替换为实际部署地址

const App: React.FC = () => {
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState<string | null>(null);

  const handleGuess = async () => {
    if (!window.ethereum) {
      alert('请安装 MetaMask');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, guessGameAbi, signer);

    try {
      const tx = await contract.guess(guess, {
        value: ethers.utils.parseEther('0.01'),
      });
      await tx.wait();
      setStatus(`你猜了 ${guess}，交易成功`);
    } catch (err: any) {
      setStatus(err.message || '交易失败');
    }
  };

  const fetchBalance = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const contract = new ethers.Contract(contractAddress, guessGameAbi, provider);
    const bal = await contract.getBalance();
    setBalance(ethers.utils.formatEther(bal) + ' ETH');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🎲 猜大小游戏 (1-100)</h1>
      <input
        type="number"
        placeholder="请输入你的猜测"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess} style={{ marginLeft: 10 }}>
        提交猜测（0.01 ETH）
      </button>
      <p>{status}</p>
      <button onClick={fetchBalance}>查看奖池余额</button>
      {balance && <p>奖池余额: {balance}</p>}
    </div>
  );
};

export default App;




