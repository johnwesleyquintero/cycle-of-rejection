import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AudioProvider } from "./contexts/AudioContext";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { Home } from "./pages/Home";
import { Discography } from "./pages/Discography";
import { Tour } from "./pages/Tour";
import { Codex } from "./pages/Codex";

function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="min-h-screen bg-brand-black text-white">
          <Header />
          <main className="pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discography" element={<Discography />} />
              <Route path="/tour" element={<Tour />} />
              <Route path="/codex" element={<Codex />} />
            </Routes>
          </main>
          <Footer />
          <AudioPlayer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1F1F1F",
                color: "white",
                border: "1px solid #404040",
              },
            }}
          />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
