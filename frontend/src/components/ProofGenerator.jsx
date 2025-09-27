import { useState } from "react";
import { Buffer } from "buffer";
import { groth16 } from "snarkjs";
import { ethers } from "ethers";
import { poseidon6 } from "poseidon-lite";
import Navbar from "./Navbar";
import abi from "../abis/abi.json"
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

window.Buffer = Buffer;
global.Buffer = Buffer;

export default function ProofGenerator() {
    const [businessName, setBusinessName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [taxId, setTaxId] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [registeredAddress, setRegisteredAddress] = useState("");

    const [proof, setProof] = useState(null);
    const [publicSignals, setPublicSignals] = useState(null);
    const [verifyResult, setVerifyResult] = useState("");
    const [loading, setLoading] = useState(false);

    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    const contarctAddress = "0x8F903e8bC7099AEc23dE021782cBa0d0f93F7b7f"

    const stringToCircuitFriendlyBigInt = (str, fieldName = "") => {
        if (!str || str.trim() === "") return 0n;

        try {
            let numericValue = 0n;
            const maxChars = 8;

            for (let i = 0; i < Math.min(str.length, maxChars); i++) {
                numericValue = numericValue * 256n + BigInt(str.charCodeAt(i));
            }

            const FIELD_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
            numericValue = numericValue % FIELD_MODULUS;

            console.log(`${fieldName}: "${str.substring(0, 10)}${str.length > 10 ? '...' : ''}" -> ${numericValue}`);
            return numericValue;

        } catch (error) {
            console.error(`Error converting ${fieldName}:`, error);
            return 0n;
        }
    };

    const generateProof = async () => {
        if (!isConnected) {
            return "Please connect wallet!"
        }

        setLoading(true);
        setVerifyResult("Generating proof...");

        try {
            if (!businessName.trim()) {
                setVerifyResult("❌ Business Name is required");
                setLoading(false);
                return;
            }

            const bn = stringToCircuitFriendlyBigInt(businessName, "businessName");
            const rn = stringToCircuitFriendlyBigInt(registrationNumber, "registrationNumber");
            const tid = stringToCircuitFriendlyBigInt(taxId, "taxId");
            const wa = stringToCircuitFriendlyBigInt(walletAddress, "walletAddress");
            const be = stringToCircuitFriendlyBigInt(businessEmail, "businessEmail");
            const ra = stringToCircuitFriendlyBigInt(registeredAddress, "registeredAddress");

            console.log("Circuit Input Values:", {
                businessName: bn.toString(),
                registrationNumber: rn.toString(),
                taxId: tid.toString(),
                walletAddress: wa.toString(),
                businessEmail: be.toString(),
                registeredAddress: ra.toString()
            });

            const computedHash = poseidon6([bn, rn, tid, wa, be, ra]);
            console.log("Computed Hash (Poseidon6):", computedHash.toString());

            const input = {
                businessName: bn.toString(),
                registrationNumber: rn.toString(),
                taxId: tid.toString(),
                walletAddress: wa.toString(),
                businessEmail: be.toString(),
                registeredAddress: ra.toString(),
                givenHash: computedHash.toString(),
            };

            console.log("Final Circuit Input:", JSON.stringify(input, null, 2));

            const wasmPath = "/circom/Auth.wasm";
            const zkeyPath = "/circom/Auth.zkey";

            try {
                const wasmResponse = await fetch(wasmPath);
                if (!wasmResponse.ok) throw new Error("WASM file not found");
                console.log("WASM file is accessible");
            } catch (fileError) {
                console.error("WASM file access error:", fileError);
                setVerifyResult("❌ Auth.wasm file not found");
                setLoading(false);
                return;
            }

            console.log("Starting proof generation...");
            const { proof, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);

            console.log("Proof generated successfully!");
            console.log("Public Signals:", publicSignals);

            setProof(proof);
            setPublicSignals(publicSignals);

            const provider = new ethers.providers.Web3Provider(walletProvider);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contarctAddress, abi, signer);

            const tx = await contract.setData(JSON.stringify(publicSignals[0]));
            await tx.wait();

            localStorage.setItem('generatedProof', JSON.stringify(proof, null, 2));
            localStorage.setItem('generatedPublicSignals', JSON.stringify(publicSignals, null, 2));
            setVerifyResult("Proof generated ✅");

        } catch (err) {
            console.error("Error generating proof:", err);

            if (err.message.includes("Assert Failed")) {
                setVerifyResult("❌ Hash mismatch! Circuit constraint failed.");
            } else if (err.message.includes("not found")) {
                setVerifyResult("❌ Circuit files missing. Check file paths.");
            } else {
                setVerifyResult("❌ Error: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
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
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        padding: "2.5rem",
                        borderRadius: "24px",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                        width: "100%",
                        maxWidth: "500px",
                        backdropFilter: "blur(6px)",
                        position: "relative",
                        marginTop: "1rem",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
                        Generate ZK Proof
                    </h2>

                    {[
                        { label: "Business Name", value: businessName, setter: setBusinessName, placeholder: "MyBiz Inc" },
                        { label: "Registration Number", value: registrationNumber, setter: setRegistrationNumber, placeholder: "123456" },
                        { label: "Tax ID", value: taxId, setter: setTaxId, placeholder: "T12345" },
                        { label: "Wallet Address", value: address, setter: setWalletAddress, placeholder: "0xABC123..." },
                        { label: "Business Email", value: businessEmail, setter: setBusinessEmail, placeholder: "contact@biz.com" },
                        { label: "Registered Address", value: registeredAddress, setter: setRegisteredAddress, placeholder: "123 Main St" },
                    ].map((field, index) => (
                        <div key={index} style={{ marginBottom: "12px" }}>
                            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                                {field.label}
                            </label>
                            <input
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                placeholder={field.placeholder}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>
                    ))}

                    <div style={{ display: "flex", gap: "12px", marginBottom: "15px" }}>
                        <button
                            onClick={generateProof}
                            disabled={loading || !businessName.trim()}
                            style={{
                                flex: 1,
                                padding: "14px",
                                background: loading || !businessName.trim() ? "#ccc" : "linear-gradient(135deg,#7f5af0 0%,#5e3ecb 100%)",
                                border: "none",
                                borderRadius: "14px",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: loading || !businessName.trim() ? "not-allowed" : "pointer",
                                opacity: loading || !businessName.trim() ? 0.6 : 1,
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                if (!loading && businessName.trim()) {
                                    e.target.style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading && businessName.trim()) {
                                    e.target.style.transform = "translateY(0)";
                                }
                            }}
                        >
                            {loading ? "Generating..." : "Generate Proof"}
                        </button>
                    </div>

                    <div style={{ marginTop: "15px", fontSize: "0.8rem", color: "#666" }}>
                        {proof && <p>✅ Proof generated</p>}
                    </div>
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