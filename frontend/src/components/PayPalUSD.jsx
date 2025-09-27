import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "./Navbar";
import abi from "../abis/abi.json";
import erc20 from "../abis/erc20.json";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";

const contarctAddress = "0x8F903e8bC7099AEc23dE021782cBa0d0f93F7b7f";
const paypalUSDAddress = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9";

export default function PayPalUSD() {
    const [isVerified, setIsVerified] = useState(false);
    const [balance, setBalance] = useState("0");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [txStatus, setTxStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const [qrAmount, setQrAmount] = useState("");
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");

    useEffect(() => {
        const checkVerification = async () => {
            if (!isConnected || !address) return;

            try {
                const provider = new ethers.providers.Web3Provider(walletProvider);
                const contract = new ethers.Contract(contarctAddress, abi, provider);
                const data = await contract.getData(address);
                const verified = data.isVerify ?? data[1];
                setIsVerified(verified);
            } catch (err) {
                console.error("Verification check failed:", err);
            }
        };
        checkVerification();
    }, [address, isConnected]);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!isConnected || !address) return;

            try {
                const provider = new ethers.providers.Web3Provider(walletProvider);
                const tokenContract = new ethers.Contract(paypalUSDAddress, erc20, provider);
                const bal = await tokenContract.balanceOf(address);
                const decimals = await tokenContract.decimals();
                setBalance(ethers.utils.formatUnits(bal, decimals));
            } catch (err) {
                console.error("Failed to fetch balance:", err);
            }
        };
        fetchBalance();
    }, [address, isConnected, txStatus]);

    const sendTokens = async () => {
        if (!isVerified) {
            setTxStatus("❌ Your business is not verified!");
            return;
        }
        if (!recipient || !amount) {
            setTxStatus("❌ Please enter recipient and amount");
            return;
        }

        try {
            setLoading(true);
            setTxStatus("Sending tokens...");

            const provider = new ethers.providers.Web3Provider(walletProvider);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(paypalUSDAddress, erc20, signer);

            const tx = await tokenContract.transfer(
                recipient,
                ethers.utils.parseUnits(amount, await tokenContract.decimals())
            );
            await tx.wait();

            setTxStatus(`✅ Sent ${amount} PayPalUSD to ${recipient}`);
            setRecipient("");
            setAmount("");

            // Refresh balance
            const bal = await tokenContract.balanceOf(address);
            const decimals = await tokenContract.decimals();
            setBalance(ethers.utils.formatUnits(bal, decimals));
        } catch (err) {
            console.error(err);
            setTxStatus("❌ Transaction failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

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
                        maxWidth: "600px",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem"
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
                        PayPalUSD Wallet
                    </h2>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <p><strong>Wallet:</strong> {address || "Not connected"}</p>
                        <p><strong>Verified:</strong> {isVerified ? "✅ Yes" : "❌ No"}</p>
                        <p><strong>Balance:</strong> {balance} PayPalUSD</p>
                    </div>

                    {isVerified && (
                        <>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <h3>Send PayPalUSD</h3>
                                <input
                                    type="text"
                                    placeholder="Recipient Address"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    style={{
                                        padding: "12px",
                                        borderRadius: "10px",
                                        border: "1px solid #ddd",
                                        fontSize: "1rem",
                                        width: "100%",
                                    }}
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    style={{
                                        padding: "12px",
                                        borderRadius: "10px",
                                        border: "1px solid #ddd",
                                        fontSize: "1rem",
                                        width: "100%",
                                    }}
                                />
                                <button
                                    onClick={sendTokens}
                                    disabled={loading}
                                    style={{
                                        padding: "12px",
                                        background: "linear-gradient(135deg,#7f5af0 0%,#5e3ecb 100%)",
                                        color: "#fff",
                                        fontWeight: "600",
                                        border: "none",
                                        borderRadius: "12px",
                                        cursor: loading ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {loading ? "Sending..." : "Send PayPalUSD"}
                                </button>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <h3>Receive PayPalUSD</h3>
                                <input
                                    type="number"
                                    placeholder="Amount (optional)"
                                    value={qrAmount}
                                    onChange={(e) => setQrAmount(e.target.value)}
                                    style={{
                                        padding: "12px",
                                        borderRadius: "10px",
                                        border: "1px solid #ddd",
                                        fontSize: "1rem",
                                        width: "100%",
                                    }}
                                />
                                <p>Scan this QR code to pay you:</p>
                                <div style={{ textAlign: "center" }}>
                                    <QRCodeCanvas
                                        value={`ethereum:${address}${qrAmount ? `?value=${ethers.utils.parseUnits(qrAmount || "0", 18).toString()}` : ""}`}
                                        size={180}
                                        fgColor="#6a11cb"
                                        bgColor="#fff"
                                    />
                                </div>


                            </div>
                        </>
                    )}

                    {!isVerified && (
                        <p style={{ color: "red", marginTop: "1rem" }}>
                            You must be a verified business to send or receive PayPalUSD.
                        </p>
                    )}

                    {txStatus && (
                        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{txStatus}</p>
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
