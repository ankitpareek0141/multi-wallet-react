import './App.css';
import React from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { useState } from "react";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Coinbase wallet", // Required
      chainId: 1,
      rpc: "https://mainnet.infura.io/v3/c66841626ba049a89a3bda5edf5bb634", // Required
      darkMode: true // Optional. Use dark theme, defaults to false
    }
  }
}

function App() {

  const [ provider, setProvider ] = useState(null);

  async function connectWallet() {
    try {
      
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions // required
      });

      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      let signer = web3ModalProvider.provider.selectedAddress;

      if(web3ModalProvider) {
        setProvider(web3ModalProvider);
        console.log("provider := ", web3ModalProvider);
        console.log("Selected Address := ", signer);
      }

    } catch(error) {
      console.log("Error := ", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Connect your wallet!
        </h1>
        {
          provider == null ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <React.Fragment>
              <p>Connected Address : <strong>{provider.provider.selectedAddress}</strong> </p>
              <p>Network Id : <strong>{Number(provider.provider.chainId)}</strong> </p>
            </React.Fragment>
          )
        }
      </header>
    </div>
  );
}

export default App;
