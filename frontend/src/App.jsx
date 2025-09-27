import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProofGenerator from "./components/ProofGenerator";
import Profile from "./components/Profile";
import Verifier from "./components/Verifier";
import PayPalUSD from "./components/PayPalUSD";
import { createAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia } from "@reown/appkit/networks";

// Wallet Connect
const projectId = "2153db670a2a45ecb63588df6db52c07";

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia],
  projectId,
  features: {
    analytics: true,
  },
})

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/proof" element={<ProofGenerator />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/verifier" element={<Verifier />} />
      <Route path="/transfer" element={<PayPalUSD />} />
    </Routes>
  );
}
