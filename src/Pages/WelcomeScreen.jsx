import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text, speed = 60 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-[#6366f1]">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 via-[#8b5cf6]/20 to-[#a855f7]/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-[#6366f1]/15 via-transparent to-[#ec4899]/15 blur-2xl animate-float" />
    <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-[#f43f5e]/10 blur-3xl animate-pulse delay-300" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-full blur-3xl animate-pulse" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div
                    key={index}
                    data-aos="fade-down"
                    data-aos-delay={index * 200}
                  >
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                className="text-center mb-4 sm:mb-6 md:mb-8"
                variants={childVariants}
              >
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <p
                    data-aos="fade-down"
                    data-aos-delay="100"
                    className="text-xs sm:text-sm text-gray-400 font-semibold tracking-[0.3em] uppercase mb-2 relative inline-block"
                  >
                    <span className="absolute -left-3 top-1/2 w-2 h-2 rounded-full bg-[#6366f1] animate-pulse"></span>
                    Welcome To
                    <span className="absolute -right-3 top-1/2 w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
                  </p>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-2 leading-tight">
                  <div className="mb-2 sm:mb-3">
                    <span
                      data-aos="fade-up"
                      data-aos-delay="200"
                      className="inline-block px-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                      Monu
                    </span>{" "}
                    <span
                      data-aos="fade-up"
                      data-aos-delay="400"
                      className="inline-block px-2 bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f43f5e] bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                      Prajapat's
                    </span>
                  </div>
                  <div>
                    <span
                      data-aos="fade-up"
                      data-aos-delay="600"
                      className="inline-block px-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                      Portfolio
                    </span>
                  </div>
                </h1>
                <div className="mt-4 sm:mt-6 md:mt-8">
                  <span
                    data-aos="fade-up"
                    data-aos-delay="800"
                    className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/30 via-[#8b5cf6]/30 to-[#a855f7]/30 backdrop-blur-sm border-2 border-[#6366f1]/40 shadow-lg shadow-[#6366f1]/20 hover:shadow-xl hover:shadow-[#6366f1]/30 hover:scale-105 transition-all duration-300"
                  >
                    <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-bold">
                      Full Stack Developer
                    </span>
                  </span>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.div
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <div className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-[#6366f1]/10 hover:shadow-[#6366f1]/20 transition-all duration-300">
                  <p className="text-sm sm:text-base md:text-lg text-gray-100 font-semibold tracking-wide">
                    <TypewriterEffect text="MERN • AWS • DevOps • Web3" speed={50} />
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
