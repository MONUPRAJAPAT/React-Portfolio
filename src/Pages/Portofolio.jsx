import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore, theme }) => (
  <button
    onClick={onClick}
                className={`
      px-3 py-1.5
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      rounded-md
      border 
      backdrop-blur-sm
      group
      relative
      overflow-hidden
      ${theme === 'dark' 
        ? 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
        : 'text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border-gray-200 hover:border-gray-300'
      }
    `}
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg", language: "HTML5" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg", language: "CSS3" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", language: "JavaScript" },
  { icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", language: "Tailwind" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg", language: "React" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg", language: "Node.js" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg", language: "Express.js" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg", language: "MongoDB" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg", language: "MySQL" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg", language: "PostgreSQL" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", language: "AWS" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg", language: "Docker" },
  { icon: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg", language: "Kubernetes" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg", language: "Bootstrap" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", language: "TypeScript" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg", language: "Redux" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg", language: "Sass" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg", language: "Webpack" },
  { icon: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg", language: "GraphQL" },
  { icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", language: "Postman" },
  { icon: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg", language: "Jenkins" },
  { icon: "https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg", language: "Jest" },
  { icon: "https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/selenium-logo.svg", language: "Selenium" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg", language: "C" },
  { icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", language: "C++" },
  { icon: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ionic_Logo.svg", language: "Ionic" },
];

// Local certificates - Add your certificate images to the public folder
// Example: If you have certificate1.png in public folder, add it as "/certificate1.png"
const localCertificates = [
  { Img: "/courses/blockchain.png" },
  { Img: "/courses/machineLearning.png" },
  { Img: "/courses/pythonBasics.png" },
  { Img: "/courses/frontendDevelopment.png" },
  { Img: "/courses/javaForAndroid.png" },
];

export default function FullWidthTabs() {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllTechStacks, setShowAllTechStacks] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;
  const initialTechStacks = isMobile ? 6 : 12;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectCollection);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      setProjects(projectData);

      // Use local certificates - prioritize localCertificates array over localStorage
      // Always use localCertificates if it has items, otherwise check localStorage
      if (localCertificates.length > 0) {
        setCertificates(localCertificates);
        localStorage.setItem("certificates", JSON.stringify(localCertificates));
      } else {
        const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
        setCertificates(storedCertificates);
      }

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
    } catch (error) {
      console.error("Error fetching data:", error);
      // If Firebase fails, use local certificates
      if (localCertificates.length > 0) {
        setCertificates(localCertificates);
        localStorage.setItem("certificates", JSON.stringify(localCertificates));
      } else {
        const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
        setCertificates(storedCertificates);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (value < 2) {
        setValue(value + 1);
      }
    },
    onSwipedRight: () => {
      if (value > 0) {
        setValue(value - 1);
      }
    },
    trackMouse: true,
  });

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else if (type === 'certificates') {
      setShowAllCertificates(prev => !prev);
    } else if (type === 'techstacks') {
      setShowAllTechStacks(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const displayedTechStacks = showAllTechStacks ? techStacks : techStacks.slice(0, initialTechStacks);
  
  return (
    <div className={`md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] overflow-hidden ${
      theme === 'dark' ? 'bg-[#030014]' : 'bg-white'
    }`} id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className={`max-w-2xl mx-auto text-sm md:text-base mt-2 ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
        }`}>
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div {...handlers}>
          <TabPanel value={value} index={0} dir={muiTheme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                  theme={theme}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={muiTheme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                  theme={theme}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={muiTheme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {displayedTechStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
            {techStacks.length > initialTechStacks && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('techstacks')}
                  isShowingMore={showAllTechStacks}
                  theme={theme}
                />
              </div>
            )}
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}