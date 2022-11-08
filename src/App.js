import './App.css';
import React, { useEffect, useState } from 'react';
// import { PhantomWalletAdapter } from './index2.ts';
const App = () => {
  //solana.on("connect", () => console.log("connected!"));
  const [walletAddress, setWalletAddress] = useState(null);
  const { solana } = window;
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
    // const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      console.log(solana.isConnected);
    }
  };


  const disconnected = async () => {
    // const { solana } = window;
    solana.disconnect();
    console.log(solana.isConnected);
    solana.on("disconnect", () => {
     setWalletAddress(null);
      console.log(solana.isConnected);
    })
  };
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );
  const renderConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={disconnected}>
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