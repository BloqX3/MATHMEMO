import React, { useState } from 'react';
import { ethers } from 'ethers';
import RadioSelector from './RadioSelector';
import './RadioSelector.css';

// Configuration: choose your network and donation address
const NETWORKS = {
  polygon: {
    chainId: '0x89', // Chain ID 137 in hexadecimal.
    chainName: 'Polygon Mainnet', // The network name.
    rpcUrls: ['https://polygon-rpc.com'], // Array of RPC URLs.
    blockExplorerUrls: ['https://polygonscan.com'], // Array of block explorer URLs.
    nativeCurrency: {
      name: 'MATIC',    // The descriptive name of the native currency.
      symbol: 'MATIC',  // The currency symbol.
      decimals: 18      // The number of decimals (Polygon uses 18).
    },
    priceId: 'matic-network' // For external services like CoinGecko (optional).
  },
};

const DONATION_ADDRESS = '0xa166DF1C5b2A5264De126519826ee6c3AA8355E1';
const PRESETS = [5, 10, 20, 100];

export default function CryptoDonate({ network = 'polygon' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Prepare options for donation amounts.
  const options = PRESETS.map((amt) => ({ label: `$${amt}`, value: amt.toString() }))
    .concat({ label: 'Custom', value: 'custom' });

  // Initialize wallet and switch network – returns signer.
  const getSigner = async () => {
    if (!window.ethereum) throw new Error('MetaMask not detected');
    // Request account access if needed.
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const ethProvider = new ethers.BrowserProvider(window.ethereum);
    
    // Destructure network properties from the configuration.
    const { chainId, chainName, rpcUrls, nativeCurrency, blockExplorerUrls } = NETWORKS[network];
    
    // Attempt to switch to the desired network.
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (switchError) {
      // If the chain has not been added yet, add it.
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId,
            chainName,
            rpcUrls,
            nativeCurrency,
            blockExplorerUrls,
          }],
        });
      } else {
        throw switchError;
      }
    }
    return ethProvider.getSigner();
  };

  // Send donation: USD → token based on real-time price.
  const sendDonation = async () => {
    const option = options[selectedIndex];
    if (!option) return alert('Please select an amount');

    let amountUSD = option.value === 'custom' ? Number(customAmount) : Number(option.value);
    if (!amountUSD || isNaN(amountUSD) || amountUSD <= 0) return alert('Enter a valid USD amount');

    setLoading(true);
    try {
      // Fetch token price (USD value per token)
      const priceRes = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${NETWORKS[network].priceId}&vs_currencies=usd`
      );
      const priceData = await priceRes.json();
      const price = priceData[NETWORKS[network].priceId]?.usd;
      if (!price) throw new Error('Price fetch failed');
      
      // Calculate how many tokens to send.
      const amountToken = (amountUSD / price).toString();

      // Obtain signer after ensuring the network is set.
      const signer = await getSigner();
      
      // Important: use ethers.parseUnits according to ethers v6
      const tx = await signer.sendTransaction({
        to: DONATION_ADDRESS,
        value: ethers.parseUnits(amountToken, 'ether')
      });

      alert(`Transaction sent! Hash: ${tx.hash}`);
      await tx.wait();
      alert('Thank you for your donation!');
    } catch (err) {
      console.error(err);
      alert('Transaction failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
      <h3>
        Donate {NETWORKS[network].nativeCurrency.symbol} (USD → {NETWORKS[network].nativeCurrency.symbol})
      </h3>
      <RadioSelector
      tiny={true}
        options={options}
        name="donation"
        selectedIndex={selectedIndex}
        onChange={(i) => {
          setSelectedIndex(i);
          if (options[i].value !== 'custom') setCustomAmount('');
        }}
      />
      {options[selectedIndex]?.value === 'custom' && (
        <input
          type="number"
          placeholder="Enter USD amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          style={{ marginTop: '1rem', width: '100%', boxSizing:'border-box' }}
        />
      )}
      <button
        onClick={sendDonation}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          background: '#007bff',
          color: '#fff',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}
      >
        {loading ? 'Processing...' : 'Connect & Send'}
      </button>
    </div>
  );
}