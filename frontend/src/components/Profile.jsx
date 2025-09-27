import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import abi from "../abis/abi.json"
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

const contractAddress = "0x8F903e8bC7099AEc23dE021782cBa0d0f93F7b7f"

export default function Profile() {
    const [businessData, setBusinessData] = useState(null);
    const [proofData, setProofData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    useEffect(() => {
        const fetchBusinessData = async () => {
            if (!isConnected || !address) return;

            setLoading(true);
            try {
                const provider = new ethers.providers.Web3Provider(walletProvider);
                const contract = new ethers.Contract(contractAddress, abi, provider);
                const data = await contract.getData(address);

                const profile = {
                    walletAddress: data[0],
                    isVerify: data[1],
                    publicProof: data[2],
                    isBlock: data[3],
                };

                setBusinessData({
                    walletAddress: profile.walletAddress,
                    isVerify: profile.isVerify,
                    isBlock: profile.isBlock,
                });

                if (profile.publicProof && profile.publicProof !== "") {
                    try {
                        const parsedProof = JSON.parse(profile.publicProof);
                        setProofData(parsedProof);
                    } catch {
                        setProofData({ raw: profile.publicProof });
                    }
                }
            } catch (err) {
                console.error("Error fetching business data:", err);
                setError("Failed to load business profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessData();
    }, [address, isConnected]);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                fontFamily: "'Segoe UI', Roboto, sans-serif",
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            }}
        >
            <Navbar />

            <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "2rem" }}>
                <div
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        padding: "2.5rem",
                        borderRadius: "24px",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                        width: "100%",
                        maxWidth: "700px",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
                        Business Profile
                    </h2>

                    {loading ? (
                        <p style={{ textAlign: "center", color: "#666" }}>Loading profile...</p>
                    ) : error ? (
                        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
                    ) : businessData ? (
                        <div>

                            <section style={{ marginBottom: "2rem" }}>
                                <h3
                                    style={{
                                        color: "#6a11cb",
                                        borderBottom: "2px solid #6a11cb",
                                        paddingBottom: "0.5rem",
                                    }}
                                >
                                    Business Information
                                </h3>
                                <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: "bold" }}>Wallet Address:</span>
                                        <span>{businessData.walletAddress}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: "bold" }}>Verified:</span>
                                        <span style={{ color: businessData.isVerify ? "green" : "red" }}>
                                            {businessData.isVerify ? "✅ Yes" : "❌ No"}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: "bold" }}>Blocked:</span>
                                        <span style={{ color: businessData.isBlock ? "red" : "green" }}>
                                            {businessData.isBlock ? "Yes" : "No"}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section style={{ marginBottom: "2rem" }}>
                                <h3
                                    style={{
                                        color: "#6a11cb",
                                        borderBottom: "2px solid #6a11cb",
                                        paddingBottom: "0.5rem",
                                    }}
                                >
                                    Proof Details
                                </h3>
                                {proofData ? (
                                    <div
                                        style={{
                                            background: "#f8f9fa",
                                            padding: "1rem",
                                            borderRadius: "8px",
                                            marginTop: "1rem",
                                        }}
                                    >
                                        <p>
                                            <strong>Public Signals:</strong>{" "}
                                            {Array.isArray(proofData) ? proofData.length : 1} items
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span style={{ color: businessData.isVerify ? "green" : "red" }}>
                                                {businessData.isVerify ? "✅ Verified" : "❌ Not Verified"}
                                            </span>
                                        </p>

                                    </div>
                                ) : (
                                    <p style={{ color: "#666", marginTop: "1rem" }}>No proof found.</p>
                                )}
                            </section>


                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                <button
                                    onClick={() => window.print()}
                                    style={{
                                        padding: "10px 20px",
                                        background: "linear-gradient(135deg,#7f5af0 0%,#5e3ecb 100%)",
                                        border: "none",
                                        borderRadius: "8px",
                                        color: "#fff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Print Certificate
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", color: "#666" }}>
                            <p>No profile found for this wallet.</p>
                            <Link
                                to="/proof"
                                style={{
                                    color: "#6a11cb",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                Go to Proof Generator
                            </Link>
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
                }}
            >
                <p>© 2025 Bizurapay. All rights reserved.</p>
            </footer>
        </div>
    );
}
