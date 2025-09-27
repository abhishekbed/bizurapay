import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav
            style={{
                padding: "1rem 2rem",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                height: "64px",
            }}
        >

            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "2rem"
                }}
            >
                Bizurapay
            </Link>

            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/" ? "#fff" : "rgba(255,255,255,0.8)",
                        fontWeight: location.pathname === "/" ? "bold" : "normal",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: location.pathname === "/" ? "rgba(255,255,255,0.2)" : "transparent",
                        transition: "all 0.3s ease",
                        fontSize: "1.2rem"
                    }}
                >
                    Home
                </Link>

                <Link
                    to="/proof"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/proof" ? "#fff" : "rgba(255,255,255,0.8)",
                        fontWeight: location.pathname === "/proof" ? "bold" : "normal",
                        fontSize: "1.2rem",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: location.pathname === "/proof" ? "rgba(255,255,255,0.2)" : "transparent",
                        transition: "all 0.3s ease",
                    }}
                >
                    Join Bizura
                </Link>

                <Link
                    to="/transfer"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/transfer" ? "#fff" : "rgba(255,255,255,0.8)",
                        fontWeight: location.pathname === "/transfer" ? "bold" : "normal",
                        fontSize: "1.2rem",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: location.pathname === "/transfer" ? "rgba(255,255,255,0.2)" : "transparent",
                        transition: "all 0.3s ease",
                    }}
                >
                    PayPalUSD
                </Link>

                <Link
                    to="/profile"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/profile" ? "#fff" : "rgba(255,255,255,0.8)",
                        fontWeight: location.pathname === "/profile" ? "bold" : "normal",
                        fontSize: "1.2rem",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: location.pathname === "/profile" ? "rgba(255,255,255,0.2)" : "transparent",
                        transition: "all 0.3s ease",
                    }}
                >
                    Profile
                </Link>

                <Link
                    to="/verifier"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/verifier" ? "#fff" : "rgba(255,255,255,0.8)",
                        fontWeight: location.pathname === "/verifier" ? "bold" : "normal",
                        fontSize: "1.2rem",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: location.pathname === "/verifier" ? "rgba(255,255,255,0.2)" : "transparent",
                        transition: "all 0.3s ease",
                    }}
                >
                    Verifier
                </Link>

                <div>
                    <appkit-button />
                </div>
            </div>
        </nav>
    );
}