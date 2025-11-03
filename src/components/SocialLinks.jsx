import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  ExternalLink
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/monuprajapat/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@monuprajapat",
    icon: Github,
    url: "https://github.com/monuprajapat",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]"
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@monu__prajapat",
    icon: Instagram,
    url: "https://www.instagram.com/monu__prajapat/",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]"
  }
];

const SocialLinks = () => {
  const { theme } = useTheme();
  const linkedIn = socialLinks.find(link => link.isPrimary);
  const otherLinks = socialLinks.filter(link => !link.isPrimary);
  const [github, instagram] = otherLinks;

  return (
    <div className={`w-full rounded-2xl p-6 py-8 backdrop-blur-xl ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-white/10 to-white/5' 
        : 'bg-white border border-gray-200 shadow-sm'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* LinkedIn - Primary Row */}
        <a
  href={linkedIn.url}
  target="_blank"
  rel="noopener noreferrer"
  className={`group relative flex items-center justify-between p-4 rounded-lg overflow-hidden transition-all duration-500 ${
    theme === 'dark'
      ? 'bg-white/5 border border-white/10 hover:border-white/20'
      : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
  }`}
>
  {/* Hover Gradient Background */}
  <div 
    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
               bg-gradient-to-r ${linkedIn.gradient}`}
  />
  
  {/* Content Container */}
  <div className="relative flex items-center gap-4">
    {/* Icon Container */}
    <div className="relative flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-20 rounded-md transition-all duration-500
                   group-hover:scale-110 group-hover:opacity-30"
        style={{ backgroundColor: linkedIn.color }}
      />
      <div className="relative p-2 rounded-md">
        <linkedIn.icon
          className="w-6 h-6 transition-all duration-500 group-hover:scale-105"
          style={{ color: linkedIn.color }}
        />
      </div>
    </div>

    {/* Text Container */}
    <div className="flex flex-col">
      <span className={`text-lg font-bold pt-[0.2rem] tracking-tight leading-none transition-colors duration-300 ${
        theme === 'dark'
          ? 'text-gray-200 group-hover:text-white'
          : 'text-gray-800 group-hover:text-gray-900'
      }`}>
        {linkedIn.displayName}
      </span>
      <span className={`text-sm transition-colors duration-300 ${
        theme === 'dark'
          ? 'text-gray-400 group-hover:text-gray-300'
          : 'text-gray-600 group-hover:text-gray-700'
      }`}>
        {linkedIn.subText}
      </span>
    </div>
  </div>

  {/* External Link */}
  <ExternalLink 
    className={`relative w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1 ${
      theme === 'dark' ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-gray-900'
    }`}
  />

  {/* Shine Effect */}
  <div 
    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
  </div>
</a>


        {/* Second Row - GitHub & Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[github, instagram].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-3 p-4 rounded-xl overflow-hidden transition-all duration-500 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 hover:border-white/20'
                  : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                             bg-gradient-to-r ${link.gradient}`} />
              
              <div className="relative flex items-center justify-center">
                <div 
                  className={`absolute inset-0 rounded-lg transition-all duration-500
                               group-hover:scale-125 ${
                    link.name === 'GitHub' && theme === 'light'
                      ? 'opacity-10 group-hover:opacity-20 bg-gray-900'
                      : 'opacity-20 group-hover:opacity-30'
                  }`}
                  style={{ 
                    backgroundColor: link.name === 'GitHub' && theme === 'light' 
                      ? '#111827' 
                      : link.color 
                  }} 
                />
                <div className="relative p-2 rounded-lg">
                  <link.icon
                    className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      color: link.name === 'GitHub' && theme === 'light' 
                        ? '#111827' 
                        : link.color 
                    }}
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className={`text-sm font-bold transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-gray-200 group-hover:text-white'
                    : 'text-gray-800 group-hover:text-gray-900'
                }`}>
                  {link.displayName}
                </span>
                <span className={`text-xs truncate transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {link.subText}
                </span>
              </div>
              
              <ExternalLink className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2 ${
                theme === 'dark' ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-gray-900'
              }`} />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;