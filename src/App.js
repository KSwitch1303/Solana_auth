import './App.css';
import React, { useEffect, useState } from 'react';

const App = () =>  {
  const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log('Connected with Public Key:', response.publicKey.toString());
        const wallet = response.publicKey.toString()
        setWalletAddress(response.publicKey.toString()); 
      }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } 
  };
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );
  const renderConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Wallet Already Connected. Revoke connection from your Phantom wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <p>
        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && renderConnectedContainer()}
        </p>
      </header>
    </div>
  );
}

export default App;
