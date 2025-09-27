import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 75%, #475569 100%)",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.1
        }}
      />
      
      <div 
        style={{
          position: "absolute",
          top: "5rem",
          left: "2.5rem",
          width: "5rem",
          height: "5rem",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
          borderRadius: "50%",
          filter: "blur(20px)",
          animation: "pulse 3s ease-in-out infinite"
        }}
      />
      
      <div 
        style={{
          position: "absolute",
          top: "10rem",
          right: "5rem",
          width: "8rem",
          height: "8rem",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "pulse 4s ease-in-out infinite 1s"
        }}
      />
      
      <div 
        style={{
          position: "absolute",
          bottom: "5rem",
          left: "25%",
          width: "4rem",
          height: "4rem",
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
          borderRadius: "50%",
          filter: "blur(15px)",
          animation: "pulse 3.5s ease-in-out infinite 0.5s"
        }}
      />

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}
      </style>

      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5rem 2rem 2rem",
          textAlign: "center",
          color: "white",
          position: "relative",
          zIndex: 1
        }}
      >
        <div 
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50px",
            padding: "0.5rem 1rem",
            marginBottom: "2rem"
          }}
        >
          <Shield size={16} style={{ color: "#3b82f6" }} />
          <span 
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "white"
            }}
          >
            Next-Generation B2B Payments
          </span>
        </div>

        <h1 
          style={{ 
            fontSize: "clamp(3rem, 8vw, 5.5rem)", 
            marginBottom: "1.5rem", 
            lineHeight: "1.1",
            fontWeight: "bold"
          }}
        >
          <span style={{ color: "white" }}>Secure </span>
          <span 
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            ZK-Powered
          </span>
          <br />
          <span style={{ color: "white" }}>B2B Payments</span>
        </h1>
        
        <p 
          style={{ 
            fontSize: "1.25rem", 
            marginBottom: "2rem", 
            maxWidth: "48rem", 
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: "1.6"
          }}
        >
          Experience the future of business payments with zero-knowledge privacy, 
          cross-chain compatibility, and instant stablecoin settlements.
        </p>

        <div 
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem"
          }}
        >
          {[
            { icon: Zap, text: "Instant Settlements", color: "#3b82f6" },
            { icon: Shield, text: "ZK Privacy", color: "#10b981" },
            { icon: Globe, text: "Cross-Chain", color: "#f59e0b" }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "50px",
                  padding: "0.5rem 1rem"
                }}
              >
                <IconComponent size={16} style={{ color: item.color }} />
                <span 
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "white"
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
        <div 
          style={{ 
            display: "flex", 
            flexDirection: window.innerWidth < 640 ? "column" : "row",
            gap: "1rem", 
            marginBottom: "4rem",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Link
            to="/proof"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "200px",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)";
              const arrow = e.target.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)";
              const arrow = e.target.querySelector('.arrow-icon');
              if (arrow) arrow.style.transform = "translateX(0)";
            }}
          >
            Get Started
            <ArrowRight 
              size={16} 
              className="arrow-icon"
              style={{ transition: "transform 0.3s ease" }}
            />
          </Link>

          <button
            style={{
              padding: "1rem 2rem",
              background: "transparent",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "200px",
              backdropFilter: "blur(8px)"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
              e.target.style.border = "2px solid rgba(255, 255, 255, 0.5)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.border = "2px solid rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Join Bizura
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <p 
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.875rem",
              marginBottom: "1rem"
            }}
          >
            Trusted by forward-thinking businesses
          </p>
          <div 
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              opacity: 0.6,
              flexWrap: "wrap"
            }}
          >
            {["Enterprise", "StartupCo", "TechFlow"].map((company, index) => (
              <div 
                key={index}
                style={{
                  width: "6rem",
                  height: "2rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)"
                }}
              >
                <span 
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "rgba(255, 255, 255, 0.7)"
                  }}
                >
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <svg
          style={{
            width: "100%",
            height: "5rem",
            fill: "#0f1419"
          }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
      <FeaturesSection />
      <Footer />
    </div>
  );
}