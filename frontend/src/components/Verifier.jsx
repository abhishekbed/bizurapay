import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { groth16 } from "snarkjs";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import abi from "../abis/abi.json"
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

window.Buffer = Buffer;
global.Buffer = Buffer;

export default function Verifier() {
    const [proofData, setProofData] = useState("");
    const [publicSignalsData, setPublicSignalsData] = useState("");
    const [verificationResult, setVerificationResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [verifiedProofs, setVerifiedProofs] = useState([]);
    const [walletAddress, setWalletAddress] = useState();

    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    const contarctAddress = "0x8F903e8bC7099AEc23dE021782cBa0d0f93F7b7f"

    useEffect(() => {
        const loadGeneratedProof = () => {
            try {
                const savedProof = localStorage.getItem('generatedProof');
                const savedPublicSignals = localStorage.getItem('generatedPublicSignals');

                if (savedProof) {
                    setProofData(savedProof);
                }
                if (savedPublicSignals) {
                    setPublicSignalsData(savedPublicSignals);
                }

                localStorage.removeItem('generatedProof');
                localStorage.removeItem('generatedPublicSignals');

                if (savedProof || savedPublicSignals) {
                    setVerificationResult("✅ Proof data loaded automatically from generator");
                }
            } catch (error) {
                console.error("Error loading proof data:", error);
            }
        };

        loadGeneratedProof();
    }, []);

    const verifyProof = async () => {
        if (address !== "0xeB3A1ED7777dE3dc662026B53e7004BF2227BcCa" || !isConnected) {
            setVerificationResult("❌ You are not the Owner");
            return;
        }

        if (!proofData || !publicSignalsData) {
            setVerificationResult("❌ No proof to verify");
            return;
        }

        if (!walletAddress) {
            return "Enter Address";
        }

        setIsLoading(true);
        setVerificationResult("Verifying proof on blockchain...");

        try {
            const vkeyPath = "/circom/verification_key.json";
            const response = await fetch(vkeyPath);

            if (!response.ok) throw new Error(`Failed to fetch verification key: ${response.status}`);

            const vKey = await response.json();

            const proofObj = JSON.parse(proofData);
            const publicSignals = JSON.parse(publicSignalsData);

            const isValid = await groth16.verify(vKey, publicSignals, proofObj);

            const resultMessage = isValid
                ? "✅ Proof is valid (Verified on Blockchain)"
                : "❌ Invalid proof";
            setVerificationResult(resultMessage);

            if (isValid) {
                const newVerifiedProof = {
                    id: Date.now(),
                    timestamp: new Date().toLocaleString(),
                    proofHash: generateProofHash(proofObj),
                    publicSignalsData: publicSignals,
                    status: "verified",
                    transaction: "off-chain"
                };
                setVerifiedProofs(prev => [newVerifiedProof, ...prev.slice(0, 4)]);
            }

            const provider = new ethers.providers.Web3Provider(walletProvider);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contarctAddress, abi, signer);

            const tx = await contract.setVerifyData(walletAddress);
            await tx.wait();

        } catch (err) {
            console.error("Verification error:", err);
            setVerificationResult("❌ Verification failed: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const generateProofHash = (proof) => {
        const proofString = JSON.stringify(proof);
        let hash = 0;
        for (let i = 0; i < proofString.length; i++) {
            const char = proofString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return `#${Math.abs(hash).toString(16).substring(0, 8).toUpperCase()}`;
    };

    const handleClear = () => {
        setProofData("");
        setPublicSignalsData("");
        setVerificationResult("");
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setVerificationResult("✅ Copied to clipboard!");
        setTimeout(() => {
            if (verificationResult.includes("✅ Copied")) {
                setVerificationResult("");
            }
        }, 2000);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 75%, #475569 100%)",
                fontFamily: "'Segoe UI', Roboto, sans-serif",
                display: "flex",
                flexDirection: "column",
            }}
        >

            <Navbar />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "2rem",
                }}
            >

                <div style={{
                    textAlign: "center",
                    marginBottom: "3rem",
                    color: "white"
                }}>
                    <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}>Proof Verifier</h1>
                    <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
                        Verify zero-knowledge proofs submitted by users
                    </p>
                    {isConnected && (
                        <div style={{
                            background: "rgba(255,255,255,0.2)",
                            padding: "0.5rem 1rem",
                            borderRadius: "20px",
                            marginTop: "1rem",
                            display: "inline-block"
                        }}>
                            <span style={{ fontWeight: "bold" }}>
                                Connected as: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                            </span>
                            {address === "0xeB3A1ED7777dE3dc662026B53e7004BF2227BcCa" && (
                                <span style={{ marginLeft: "1rem", color: "#4CAF50" }}>✓ Owner</span>
                            )}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        padding: "2.5rem",
                        borderRadius: "24px",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                        width: "100%",
                        maxWidth: "800px",
                        backdropFilter: "blur(6px)",
                        marginBottom: "2rem",
                    }}
                >

                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                Proof Data (JSON format):
                            </label>
                            <div style={{ display: "flex", gap: "0.5rem" }}>

                                <button
                                    onClick={() => copyToClipboard(proofData)}
                                    disabled={!proofData}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        background: "#f8f9fa",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "0.9rem",
                                        cursor: !proofData ? "not-allowed" : "pointer",
                                        opacity: !proofData ? 0.5 : 1
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={proofData}
                            onChange={(e) => setProofData(e.target.value)}
                            placeholder='Proof data will load automatically when generated...'
                            style={{
                                width: "100%",
                                height: "150px",
                                padding: "1rem",
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                                background: "#f8f9fa",
                                fontSize: "0.9rem",
                                resize: "vertical",
                                fontFamily: "monospace"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <label style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                                Public Signals (JSON format):
                            </label>
                            <div style={{ display: "flex", gap: "0.5rem" }}>

                                <button
                                    onClick={() => copyToClipboard(publicSignalsData)}
                                    disabled={!publicSignalsData}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        background: "#f8f9fa",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "0.9rem",
                                        cursor: !publicSignalsData ? "not-allowed" : "pointer",
                                        opacity: !publicSignalsData ? 0.5 : 1
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={publicSignalsData}
                            onChange={(e) => setPublicSignalsData(e.target.value)}
                            placeholder='Public signals will load automatically when generated...'
                            style={{
                                width: "100%",
                                height: "100px",
                                padding: "1rem",
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                                background: "#f8f9fa",
                                fontSize: "0.9rem",
                                resize: "vertical",
                                fontFamily: "monospace"
                            }}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "2rem",
                        flexWrap: "wrap"
                    }}>

                        <input
                            type="text"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "1rem 2rem",
                                color: "black",
                                border: "none",
                                borderRadius: "12px",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                minWidth: "400px",
                            }}
                        />

                        <button
                            onClick={verifyProof}
                            disabled={isLoading || !proofData.trim() || !publicSignalsData.trim() || !isConnected}
                            style={{
                                flex: 1,
                                padding: "1rem 2rem",
                                background: isLoading ? "#ccc" :
                                    !isConnected ? "#6c757d" : "linear-gradient(135deg, #4CAF50, #45a049)",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                cursor: (isLoading || !proofData.trim() || !publicSignalsData.trim() || !isConnected) ? "not-allowed" : "pointer",
                                opacity: (isLoading || !proofData.trim() || !publicSignalsData.trim() || !isConnected) ? 0.7 : 1,
                                minWidth: "100px",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {!isConnected ? "Connect Wallet First" :
                                isLoading ? "Verifying..." : "Verify Proof"}
                        </button>

                        <button
                            onClick={handleClear}
                            style={{
                                padding: "1rem 2rem",
                                background: "#6c757d",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                minWidth: "120px",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Clear
                        </button>
                    </div>

                    {verificationResult && (
                        <div style={{
                            padding: "1.5rem",
                            borderRadius: "12px",
                            background: verificationResult.includes("✅")
                                ? "rgba(76, 175, 80, 0.1)"
                                : "rgba(244, 67, 54, 0.1)",
                            border: `2px solid ${verificationResult.includes("✅") ? "#4CAF50" : "#f44336"}`,
                            marginBottom: "1.5rem"
                        }}>
                            <h3 style={{
                                marginBottom: "1rem",
                                color: verificationResult.includes("✅") ? "#4CAF50" : "#f44336",
                                textAlign: "center"
                            }}>
                                {verificationResult}
                            </h3>

                            {verificationResult.includes("✅") && verifiedProofs[0] && (
                                <div style={{
                                    display: "grid",
                                    gap: "0.5rem",
                                    background: "rgba(255,255,255,0.8)",
                                    padding: "1rem",
                                    borderRadius: "8px"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: "bold" }}>Proof Hash:</span>
                                        <span>{verifiedProofs[0].proofHash}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: "bold" }}>Timestamp:</span>
                                        <span>{verifiedProofs[0].timestamp}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: "bold" }}>Verification:</span>
                                        <span style={{ color: "#28a745", fontWeight: "bold" }}>Off-Chain</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>

            <footer
                style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "white",
                    opacity: 0.8,
                    marginTop: "auto",
                    background: "rgba(0,0,0,0.1)"
                }}
            >
                <p>© 2025 Bizurapay. All rights reserved.</p>
            </footer>
        </div>
    );
}