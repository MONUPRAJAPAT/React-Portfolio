import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer>
      <center>
        <hr className={`my-3 sm:mx-auto lg:my-6 text-center ${
          theme === 'dark' ? 'border-gray-400 opacity-15' : 'border-gray-300'
        }`} />
        <div className="flex flex-col items-center gap-2 pb-4">
          <span className={`text-sm text-center ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Made with <span className="text-red-500">❤️</span> by{" "}
            <a href="#Home" className="text-[#6366f1] hover:text-[#a855f7] hover:underline transition-colors font-medium">
              Monu Prajapat
            </a>
            {" "}© {new Date().getFullYear()}
          </span>
          <span className={`text-xs text-center ${
            theme === 'dark' ? 'text-gray-500/70' : 'text-gray-600/70'
          }`}>
            Full Stack Developer | MERN • DevOps • Web3
          </span>
        </div>
      </center>
    </footer>
  );
};

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <Footer />
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;