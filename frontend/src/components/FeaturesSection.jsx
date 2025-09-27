import { Shield, Coins, Globe, Zap, Lock, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Zero-Knowledge Privacy",
      description: "Advanced ZK-SNARK technology ensures transaction privacy while maintaining transparency and compliance for business operations.",
      gradient: "linear-gradient(135deg, #6a11cb 0%, #8b5fbf 100%)"
    },
    {
      icon: Coins,
      title: "PayPal USD Integration", 
      description: "Seamlessly receive PayPal USD stablecoins regardless of the sender's token - USDC, Sepolia ETH, or any EVM-compatible asset.",
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
    },
    {
      icon: Globe,
      title: "Cross-Chain Compatibility",
      description: "Support for multiple blockchain networks enabling businesses to transact across different ecosystems without friction.",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
    },
    {
      icon: Zap,
      title: "Instant Settlements",
      description: "Lightning-fast transaction processing with automated settlement to ensure optimal cash flow for your business operations.",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade security protocols with multi-signature wallets and advanced fraud detection to protect your business assets.",
      gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)"
    },
    {
      icon: Users,
      title: "B2B Optimized",
      description: "Purpose-built for business-to-business transactions with bulk payments, recurring billing, and comprehensive reporting tools.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)"
    }
  ];

  const stats = [
    { value: "$2.5B+", label: "Transaction Volume" },
    { value: "50K+", label: "Active Businesses" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "<2s", label: "Average Settlement" }
  ];

  return (
    <section 
      id="features" 
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, rgba(106, 17, 203, 0.05) 0%, rgba(37, 117, 252, 0.05) 100%)",
        color: "white"
      }}
    >
      <div 
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem"
        }}
      >
        <div 
          style={{
            textAlign: "center",
            marginBottom: "4rem"
          }}
        >
          <div 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(164, 150, 179, 0.1)",
              border: "1px solid rgba(216, 211, 221, 0.3)",
              borderRadius: "50px",
              padding: "0.5rem 1rem",
              marginBottom: "1.5rem"
            }}
          >
            <Shield size={16} style={{ color: "#e0dce4ff" }} />
            <span 
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#e0dce4ff"
              }}
            >
              Core Features
            </span>
          </div>
          
          <h2 
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              lineHeight: "1.2"
            }}
          >
            Revolutionizing{" "}
            <span 
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Business Payments
            </span>
          </h2>
          
          <p 
            style={{
              fontSize: "1.25rem",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "48rem",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            Our cutting-edge technology stack combines zero-knowledge proofs, cross-chain interoperability, 
            and stablecoin infrastructure to deliver unparalleled B2B payment solutions.
          </p>
        </div>

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "5rem"
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "2rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(106, 17, 203, 0.2)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: feature.gradient,
                    opacity: 0,
                    transition: "opacity 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "1";
                  }}
                />
                
                {/* Icon */}
                <div 
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    background: feature.gradient,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    transition: "transform 0.3s ease"
                  }}
                >
                  <IconComponent size={24} color="white" />
                </div>
                
                <h3 
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "white"
                  }}
                >
                  {feature.title}
                </h3>
                
                <p 
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.6",
                    fontSize: "1rem"
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "20px",
            padding: "3rem 2rem",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {stats.map((stat, index) => (
            <div key={index} style={{ padding: "1rem" }}>
              <div 
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "0.5rem"
                }}
              >
                {stat.value}
              </div>
              <div 
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  fontWeight: "500"
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div 
          style={{
            textAlign: "center",
            marginTop: "4rem"
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(106, 17, 203, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(106, 17, 203, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(106, 17, 203, 0.3)";
            }}
          >
            Start Building Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;