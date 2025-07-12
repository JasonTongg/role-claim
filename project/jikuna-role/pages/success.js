"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import { ToastContainer, toast } from "react-toastify"
import "../app/globals.css";
import Image from "next/image";
import Logo from "../public/Logo2.webp";
import Head from "next/head";

const SuccessPage = () => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [balances, setBalances] = useState({});

  const contractAddresses = [
    "0x66bfe7c5c2dc052492938a9f7d50251a47b375ef",
    "0x874df014adc21d0f76c706b2f58b069487a6d71d"
  ];

  const ERC721_ABI = [
    "function balanceOf(address owner) view returns (uint256)"
  ];

  const checkAndConnectWallet = async () => {
    if (typeof window === 'undefined') return;

    if (!window.ethereum?.isMetaMask) {
      toast.error("MetaMask is not installed");
      return;
    }
  }

  useEffect(() => {
    checkAndConnectWallet();
  }, []);

  async function init() {
    checkAndConnectWallet();
    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signer = await prov.getSigner();
      const addr = await signer.getAddress();

      setProvider(prov);
      setSigner(signer);
      setAddress(addr);
    } catch (err) {
      console.error("Wallet not connected:", err);
    }
  }

  async function switchToMonad() {
    checkAndConnectWallet();
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x279F", // 0x279F = 10143 in hex
          chainName: "Monad Testnet",
          rpcUrls: ["https://testnet-rpc.monad.xyz/"],
          nativeCurrency: {
            name: "Monad",
            symbol: "MON",
            decimals: 18
          },
          blockExplorerUrls: ["https://testnet.monadexplorer.com/"]
        }]
      });
      init();
    } catch (err) {
      console.error("Failed to switch network:", err);
    }
  }


  async function fetchBalances(addr) {
    if (!addr || typeof addr !== "string") {
      console.error("Invalid address:", addr);
      return;
    }

    const prov = new ethers.BrowserProvider(window.ethereum);
    const newBalances = {};

    for (const c of contractAddresses) {
      const contract = new ethers.Contract(c, ERC721_ABI, prov);
      try {
        const bal = await contract.balanceOf(addr);
        newBalances[c] = bal.toString();
      } catch (err) {
        newBalances[c] = "0";
      }
    }
    setBalances(newBalances);
  }

  useEffect(() => {
    if (address) {
      fetchBalances(address);
    }
  }, [address])

  const router = useRouter();
  const { user } = router.query;

  let parsedUser = null;
  if (user && typeof user === "string") {
    try {
      parsedUser = JSON.parse(decodeURIComponent(user));
    } catch (err) {
      console.error("Failed to parse user:", err);
    }
  }

  async function getRoleLior() {
    let res = await fetch("/api/discord-grant-lior", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: parsedUser.id })
    });

    if (res.ok) {
      toast.success("✅ Role granted successfully!");
    } else {
      let err = await res.json();
      toast.error(`❌ Error granting role`);
    }
  }


  const getRolePass = async () => {
    let res = await fetch("/api/discord-grant-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: parsedUser.id })
    });

    if (res.ok) {
      toast.success("✅ Role granted successfully!");
    } else {
      let err = await res.json();
      toast.error(`❌ Error granting role`);
    }
  };

  const getRoleSpecialis = async () => {
    let res = await fetch("/api/discord-grant-special", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: parsedUser.id })
    });

    if (res.ok) {
      toast.success("✅ Role granted successfully!");
    } else {
      let err = await res.json();
      toast.error(`❌ Error granting role`);
    }
  };


  return (
    <div className="bg-bg">
      <Head>
        <title>Jikuna Role</title>
      </Head>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="./background2.webm" type="video/webm" />
      </video>
      <ToastContainer></ToastContainer>
      <Image src={Logo}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          width: "100px",
          height: "auto"
        }}
      ></Image>
      <div className="container" style={{ color: "white" }}>
        <h1 style={{ margin: "0px", fontSize: "20px", textAlign: "center" }}>Welcome, {parsedUser?.global_name}</h1>
        <div style={{ padding: 0 }}>
          {address ? (
            <>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}>
                <Image src="/walleet.png" className="wallet-icon" alt="Wallet Icon" width="100" height="100" />
                <strong className="btn-btn">{address.substring(0, 7)}...{address.substr(-5)}</strong>
              </div>
            </>
          ) : (
            <button onClick={switchToMonad} style={{
              padding: "10px 20px",
              backgroundColor: "#5865F2",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
              borderRadius: "30px",
              border: "none",
              cursor: "pointer",
              outline: "none",
              fontSize: "20px",
            }}>Connect Wallet</button>
          )}
        </div>
      </div>
      {
        address && (
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}>
            <div className="container container-2">
              <h1 style={{ margin: "0px", fontSize: "1.2rem" }}>Pass Holder</h1>
              <p>A role assigned to those who hold at least 1 Jikupass NFT.</p>
              <button disabled={balances["0x66bfe7c5c2dc052492938a9f7d50251a47b375ef"] < 1} onClick={getRolePass} className="btn-btn">Claim Role</button>
            </div>
            <div className="container container-2">
              <h1 style={{ margin: "0px", fontSize: "1.2rem" }}>Litor Holder</h1>
              <p>A role assigned to those who hold at least 3 Jikuna Little Origins NFTs.</p>
              <button disabled={balances["0x874df014adc21d0f76c706b2f58b069487a6d71d"] < 3} className="btn-btn" onClick={getRoleLior}>Claim Role</button>
            </div>
            <div className="container container-2">
              <h1 style={{ margin: "0px", fontSize: "1.2rem" }}>Specialist</h1>
              <p>This role can be claimed by eligible holders of both 1 Jikupass and 3 Jikuna Little Origin NFTs.</p>
              <button disabled={balances["0x66bfe7c5c2dc052492938a9f7d50251a47b375ef"] < 1 || balances["0x874df014adc21d0f76c706b2f58b069487a6d71d"] < 3} className="btn-btn" onClick={getRoleSpecialis}>Claim Role</button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default SuccessPage;