import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const { theme } = useTheme();
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  

  return (
    <div className="group relative w-full">
            
      <div className={`relative overflow-hidden rounded-xl backdrop-blur-lg border shadow-2xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-white/10 hover:shadow-purple-500/20'
          : 'bg-white/90 border-gray-200 hover:shadow-purple-500/10'
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300 ${
          theme === 'light' ? 'opacity-20' : ''
        }`}></div>
    
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {Title}
            </h3>
            
            <p className={`text-sm leading-relaxed line-clamp-2 ${
              theme === 'dark' ? 'text-gray-300/80' : 'text-gray-700/80'
            }`}>
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>Demo Not Available</span>
              )}
              
     

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10 text-white/90'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>Details Not Available</span>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;