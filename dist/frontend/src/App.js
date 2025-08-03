"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ethers_1 = require("ethers");
const GuessGame_json_1 = __importDefault(require("./abi/GuessGame.json"));
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // 替换为实际部署地址
const App = () => {
    const [guess, setGuess] = (0, react_1.useState)('');
    const [status, setStatus] = (0, react_1.useState)('');
    const [balance, setBalance] = (0, react_1.useState)(null);
    const handleGuess = async () => {
        if (!window.ethereum) {
            alert('请安装 MetaMask');
            return;
        }
        const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contract = new ethers_1.ethers.Contract(contractAddress, GuessGame_json_1.default, signer);
        try {
            const tx = await contract.guess(guess, {
                value: ethers_1.ethers.utils.parseEther('0.01'),
            });
            await tx.wait();
            setStatus(`你猜了 ${guess}，交易成功`);
        }
        catch (err) {
            setStatus(err.message || '交易失败');
        }
    };
    const fetchBalance = async () => {
        if (!window.ethereum)
            return;
        const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers_1.ethers.Contract(contractAddress, GuessGame_json_1.default, provider);
        const bal = await contract.getBalance();
        setBalance(ethers_1.ethers.utils.formatEther(bal) + ' ETH');
    };
    return (<div style={{ padding: 40 }}>
      <h1>🎲 猜大小游戏 (1-100)</h1>
      <input type="number" placeholder="请输入你的猜测" value={guess} onChange={(e) => setGuess(e.target.value)}/>
      <button onClick={handleGuess} style={{ marginLeft: 10 }}>
        提交猜测（0.01 ETH）
      </button>
      <p>{status}</p>
      <button onClick={fetchBalance}>查看奖池余额</button>
      {balance && <p>奖池余额: {balance}</p>}
    </div>);
};
exports.default = App;
