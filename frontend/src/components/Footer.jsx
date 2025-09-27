import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
    { name: "Guides", href: "#guides" },
    ],
    Resources: [
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" },
    ],
  };

  return (
    <footer 
      style={{
        background: "linear-gradient(180deg, #0f1419 0%, #000000 100%)",
        color: "white",
        padding: "4rem 0 2rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
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
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "4rem",
            marginBottom: "3rem"
          }}
        >
          <div style={{ maxWidth: "400px" }}>
            <div 
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Bizurapay
            </div>
            
            <p 
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: "1.6",
                marginBottom: "2rem",
                fontSize: "1rem"
              }}
            >
              Revolutionizing business payments through zero-knowledge technology. 
              Secure, private, and verifiable transactions on the blockchain.
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                  color: "rgba(255, 255, 255, 0.8)"
                }}
              >
                <Mail size={18} style={{ color: "#60a5fa" }} />
                <span>contact@bizurapay.com</span>
              </div>
              
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                  color: "rgba(255, 255, 255, 0.8)"
                }}
              >
                <Phone size={18} style={{ color: "#60a5fa" }} />
                <span>+91-12345 67890</span>
              </div>
              
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "rgba(255, 255, 255, 0.8)"
                }}
              >
                <MapPin size={18} style={{ color: "#60a5fa" }} />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "2rem"
            }}
          >
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "white"
                  }}
                >
                  {category}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {links.map((link, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                      <a
                        href={link.href}
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "color 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#60a5fa";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "rgba(255, 255, 255, 0.7)";
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div 
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <p 
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              margin: 0,
              fontSize: "0.9rem"
            }}
          >
            © 2025 Bizurapay. All rights reserved.
          </p>
          
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <span 
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.9rem"
              }}
            >
              Made with ❤️ in ETHGLOBAL NEW DELHI-2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;