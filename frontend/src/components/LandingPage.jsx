import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function LandingPage() {
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
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                    textAlign: "center",
                    color: "white",
                }}
            >
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", marginTop: "13rem" }}>
                    Zero-Knowledge Business Authentication
                </h1>
                <p style={{ fontSize: "1.3rem", marginBottom: "2rem", maxWidth: "600px" }}>
                    Prove your business credentials without revealing sensitive information.
                    Secure, private, and verifiable on the blockchain.
                </p>

                <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
                    <Link
                        to="/proof"
                        style={{
                            padding: "15px 30px",
                            background: "transparent",
                            color: "white",
                            border: "2px solid white",
                            borderRadius: "12px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "white";
                            e.target.style.color = "#6a11cb";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "white";
                        }}
                    >
                        Join Bizura
                    </Link>

                    <button
                        style={{
                            padding: "15px 30px",
                            background: "transparent",
                            color: "white",
                            border: "2px solid white",
                            borderRadius: "12px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "white";
                            e.target.style.color = "#6a11cb";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "white";
                        }}
                    >
                        Learn More
                    </button>


                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "2rem",
                        maxWidth: "1000px",
                        width: "100%",
                        marginTop: "10rem"
                    }}
                >
                    {[
                        {
                            icon: "🔒",
                            title: "Privacy First",
                            description: "Your business data remains private and secure",
                        },
                        {
                            icon: "⚡",
                            title: "Instant Verification",
                            description: "Quick proof generation and verification",
                        },
                        {
                            icon: "🌐",
                            title: "Blockchain Ready",
                            description: "Compatible with Ethereum and other chains",
                        },
                        {
                            icon: "🛡️",
                            title: "Trustless",
                            description: "No need to trust third parties",
                        },
                        {
                            icon: "🛡️",
                            title: "Trustless",
                            description: "No need to trust third parties",
                        },
                        {
                            icon: "🛡️",
                            title: "Trustless",
                            description: "No need to trust third parties",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                padding: "2rem",
                                borderRadius: "16px",
                                backdropFilter: "blur(10px)",
                                transition: "transform 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-5px)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                            }}
                        >
                            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ marginBottom: "0.5rem" }}>{feature.title}</h3>
                            <p style={{ opacity: 0.9 }}>{feature.description}</p>
                        </div>
                    ))}
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