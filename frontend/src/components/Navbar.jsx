import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav
            style={{
                padding: "1rem 2rem",
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                height: "80px",
                position: "relative",
                zIndex: 100
            }}
        >
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.75rem",
                    background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                }}
            >
                Bizurapay
            </Link>

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/" ? "#fff" : "rgba(255,255,255,0.7)",
                        fontWeight: location.pathname === "/" ? "600" : "500",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        background: location.pathname === "/" ? "rgba(59, 130, 246, 0.2)" : "transparent",
                        transition: "all 0.3s ease",
                        fontSize: "0.95rem",
                        border: location.pathname === "/" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                        if (location.pathname !== "/") {
                            e.target.style.background = "rgba(255, 255, 255, 0.1)";
                            e.target.style.color = "white";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/") {
                            e.target.style.background = "transparent";
                            e.target.style.color = "rgba(255,255,255,0.7)";
                        }
                    }}
                >
                    Home
                </Link>

                <Link
                    to="/proof"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/proof" ? "#fff" : "rgba(255,255,255,0.7)",
                        fontWeight: location.pathname === "/proof" ? "600" : "500",
                        fontSize: "0.95rem",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        background: location.pathname === "/proof" ? "rgba(59, 130, 246, 0.2)" : "transparent",
                        transition: "all 0.3s ease",
                        border: location.pathname === "/proof" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                        if (location.pathname !== "/proof") {
                            e.target.style.background = "rgba(255, 255, 255, 0.1)";
                            e.target.style.color = "white";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/proof") {
                            e.target.style.background = "transparent";
                            e.target.style.color = "rgba(255,255,255,0.7)";
                        }
                    }}
                >
                    Join Bizura
                </Link>

                <Link
                    to="/transfer"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/transfer" ? "#fff" : "rgba(255,255,255,0.7)",
                        fontWeight: location.pathname === "/transfer" ? "600" : "500",
                        fontSize: "0.95rem",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        background: location.pathname === "/transfer" ? "rgba(59, 130, 246, 0.2)" : "transparent",
                        transition: "all 0.3s ease",
                        border: location.pathname === "/transfer" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                        if (location.pathname !== "/transfer") {
                            e.target.style.background = "rgba(255, 255, 255, 0.1)";
                            e.target.style.color = "white";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/transfer") {
                            e.target.style.background = "transparent";
                            e.target.style.color = "rgba(255,255,255,0.7)";
                        }
                    }}
                >
                    PayPalUSD
                </Link>

                <Link
                    to="/profile"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/profile" ? "#fff" : "rgba(255,255,255,0.7)",
                        fontWeight: location.pathname === "/profile" ? "600" : "500",
                        fontSize: "0.95rem",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        background: location.pathname === "/profile" ? "rgba(59, 130, 246, 0.2)" : "transparent",
                        transition: "all 0.3s ease",
                        border: location.pathname === "/profile" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                        if (location.pathname !== "/profile") {
                            e.target.style.background = "rgba(255, 255, 255, 0.1)";
                            e.target.style.color = "white";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/profile") {
                            e.target.style.background = "transparent";
                            e.target.style.color = "rgba(255,255,255,0.7)";
                        }
                    }}
                >
                    Profile
                </Link>

                <Link
                    to="/verifier"
                    style={{
                        textDecoration: "none",
                        color: location.pathname === "/verifier" ? "#fff" : "rgba(255,255,255,0.7)",
                        fontWeight: location.pathname === "/verifier" ? "600" : "500",
                        fontSize: "0.95rem",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        background: location.pathname === "/verifier" ? "rgba(59, 130, 246, 0.2)" : "transparent",
                        transition: "all 0.3s ease",
                        border: location.pathname === "/verifier" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent"
                    }}
                    onMouseEnter={(e) => {
                        if (location.pathname !== "/verifier") {
                            e.target.style.background = "rgba(255, 255, 255, 0.1)";
                            e.target.style.color = "white";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/verifier") {
                            e.target.style.background = "transparent";
                            e.target.style.color = "rgba(255,255,255,0.7)";
                        }
                    }}
                >
                    Verifier
                </Link>

                <div style={{ marginLeft: "1rem" }}>
                    <appkit-button />
                </div>
            </div>
        </nav>
    );
}