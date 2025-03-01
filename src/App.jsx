import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaChartLine, 
  FaRobot, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaLaptopCode, 
  FaServer, 
  FaNetworkWired, 
  FaShieldAlt, 
  FaDatabase, 
  FaCode, 
  FaCogs, 
  FaChartPie, 
  FaGlobe, 
  FaHandshake, 
  FaRocket
} from 'react-icons/fa';
import { imageUrls } from './imageUrls';

const slides = [
  'title',
  'executiveSummary',
  'executiveSummaryImage',
  'businessDescription',
  'businessDescriptionImage',
  'titleImage',
  'industryAnalysis',
  'leadershipTeam',
  'leadershipTeamImage',
  'scalabilityRoadmap',
  'revenueModel',
  'revenueModelImage',
  'conclusionImage',
  'conclusion'
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection('right');
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('left');
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide();
    }
    
    if (touchEnd - touchStart > 100) {
      // Swipe right
      prevSlide();
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'right' ? (isMobile ? 500 : 1000) : (isMobile ? -500 : -1000),
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === 'right' ? (isMobile ? -500 : -1000) : (isMobile ? 500 : 1000),
      opacity: 0
    })
  };

  const transition = {
    type: 'spring',
    stiffness: isMobile ? 200 : 300,
    damping: isMobile ? 25 : 30
  };

  const getCurrentSlideNumber = () => {
    return `${currentSlide + 1}/${slides.length}`;
  };

  return (
    <div 
      className="app gradient-bg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <FaServer className="floating-icon floating-icon-1 text-accentBlue" />
      <FaChartLine className="floating-icon floating-icon-2 text-accentGreen" />
      <FaDatabase className="floating-icon floating-icon-3 text-accentGold" />
      
      <div className="nav-dots">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="nav-arrows">
        <div className="nav-arrow" onClick={prevSlide}>
          <FaArrowLeft color={currentSlide === 0 ? '#999' : '#333'} />
        </div>
        <div className="slide-indicator">{getCurrentSlideNumber()}</div>
        <div className="nav-arrow" onClick={nextSlide}>
          <FaArrowRight color={currentSlide === slides.length - 1 ? '#999' : '#333'} />
        </div>
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="slide-container"
        >
          {slides[currentSlide] === 'title' && (
            <div className="slide-content">
              <div className="two-column">
                <div>
                  <motion.h1 
                    className="slide-title"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    BitBased
                  </motion.h1>
                  <motion.h2 
                    className="slide-subtitle highlight-text"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Redefining GPU Resale, One Unit at a Time
                  </motion.h2>
                  <motion.div 
                    className="highlight-box"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center">
                      <FaRocket className="text-2xl text-accentGold mr-3 icon-pulse" />
                      <p className="slide-text">
                        Leveraging cutting-edge automation to capitalize on the high-demand GPU market
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4"
                  >
                    <div className="flex items-center mb-3">
                      <FaLaptopCode className="text-xl text-accentBlue mr-2" />
                      <p className="slide-text mb-0">Advanced Automation Technology</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <FaChartPie className="text-xl text-accentGreen mr-2" />
                      <p className="slide-text mb-0">Strategic Market Analytics</p>
                    </div>
                    <div className="flex items-center">
                      <FaHandshake className="text-xl text-accentGold mr-2" />
                      <p className="slide-text mb-0">Robust Sales Infrastructure</p>
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  className="image-container"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <img src={imageUrls.titleImage} alt="BitBased GPU" className="slide-image" />
                </motion.div>
              </div>
            </div>
          )}

          {slides[currentSlide] === 'titleImage' && (
            <div className="slide-content flex justify-center items-center">
              <motion.div 
                className="image-container w-full h-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={imageUrls.titleFullImage} alt="BitBased GPU" className="fullscreen-image" />
                <div className="image-caption">
                  Next-Generation GPU Technology - The Foundation of Our Business
                </div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'executiveSummary' && (
            <div className="slide-content">
              <motion.h1 
                className="slide-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaChartLine className="inline-block mr-3 text-accentGold" />
                Executive Summary
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="slide-text">
                  BitBased is an <span className="highlight-text">innovative technology-driven business</span> that leverages advanced botting technology to acquire high-demand GPUs and resell them on the secondary market.
                </p>
                
                <div className="highlight-box">
                  <div className="flex items-center">
                    <FaRobot className="text-2xl text-accentGreen mr-3 icon-bounce" />
                    <p className="slide-text mb-0">
                      Our proprietary workflow allows us to purchase GPUs up to <span className="accent-green">99.7% faster than a human</span>, giving us a strategic edge in the marketplace.
                    </p>
                  </div>
                </div>
                
                <p className="slide-text">
                  Our goal is to scale operations, optimize procurement efficiency, and enhance profit margins while ensuring legal compliance and ethical business practices.
                </p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                >
                  <div className="stat-box">
                    <FaNetworkWired className="text-3xl text-accentBlue mx-auto mb-3 icon-pulse" />
                    <div className="text-lg font-semibold">Advanced Automation</div>
                    <p className="text-sm">Cutting-edge botting technology</p>
                  </div>
                  
                  <div className="stat-box">
                    <FaShieldAlt className="text-3xl text-accentGreen mx-auto mb-3 icon-spin" />
                    <div className="text-lg font-semibold">Legal Compliance</div>
                    <p className="text-sm">Ethical business practices</p>
                  </div>
                  
                  <div className="stat-box">
                    <FaChartBar className="text-3xl text-accentGold mx-auto mb-3 icon-bounce" />
                    <div className="text-lg font-semibold">Scalable Model</div>
                    <p className="text-sm">Designed for exponential growth</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'executiveSummaryImage' && (
            <div className="slide-content flex justify-center items-center">
              <motion.div 
                className="image-container w-full h-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={imageUrls.executiveSummaryImage} alt="GPU Technology" className="fullscreen-image" />
                <div className="image-caption">
                  High-Performance GPUs - The Core of Our Business Model
                </div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'businessDescription' && (
            <div className="slide-content">
              <motion.h1 
                className="slide-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaGlobe className="inline-block mr-3 text-accentBlue" />
                Business Description
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="slide-text">
                  BitBased operates in the highly competitive GPU resale market, utilizing sophisticated automation software to gain a procurement advantage.
                </p>
                
                <div className="highlight-box">
                  <h3 className="text-xl font-bold mb-2 highlight-text flex items-center">
                    <FaCogs className="mr-2 icon-spin" /> Technology Stack
                  </h3>
                  <div className="flex items-center mb-3">
                    <FaCode className="text-xl text-accentBlue mr-3" />
                    <p className="slide-text mb-0">
                      <span className="accent-blue">StellarAIO</span> - Premium botting solution: <span className="accent-gold">$199/quarter</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaServer className="text-xl text-accentBlue mr-3" />
                    <p className="slide-text mb-0">
                      <span className="accent-blue">Proxies</span> - For multiple transactions: <span className="accent-gold">$500-$1,000/month</span>
                    </p>
                  </div>
                </div>
                
                <p className="slide-text">
                  Our business thrives on speed, strategic execution, and constant innovation. As demand for GPUs continues to rise due to AI, blockchain technology, and gaming industries, BitBased remains at the forefront of capturing market inefficiencies.
                </p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="phase-box">
                    <div className="flex items-center">
                      <FaRobot className="text-2xl text-accentGreen mr-3 icon-pulse" />
                      <div className="phase-title">Automation Advantage</div>
                    </div>
                    <p className="slide-text mb-0">
                      Our technology allows us to monitor and purchase GPUs the moment they become available, outpacing human competitors.
                    </p>
                  </div>
                  
                  <div className="phase-box">
                    <div className="flex items-center">
                      <FaChartLine className="text-2xl text-accentGreen mr-3 icon-bounce" />
                      <div className="phase-title">Market Positioning</div>
                    </div>
                    <p className="slide-text mb-0">
                      We capitalize on supply chain inefficiencies to provide high-demand products to gamers, miners, and professionals.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'businessDescriptionImage' && (
            <div className="slide-content flex justify-center items-center">
              <motion.div 
                className="image-container w-full h-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={imageUrls.businessDescriptionImage} alt="Automation Software" className="fullscreen-image" />
                <div className="image-caption">
                  Advanced Automation Software - Our Competitive Edge
                </div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'industryAnalysis' && (
            <div className="slide-content">
              <motion.h1 
                className="slide-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaChartPie className="inline-block mr-3 text-accentGold" />
                Industry Analysis
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                <div className="stat-box">
                  <FaChartLine className="text-4xl text-accentBlue mx-auto mb-4 icon-pulse" />
                  <div className="stat-number">$200B+</div>
                  <div className="stat-label">Projected GPU Market by 2030</div>
                </div>
                
                <div className="stat-box">
                  <FaRobot className="text-4xl text-accentBlue mx-auto mb-4 icon-bounce" />
                  <div className="stat-number">99.7%</div>
                  <div className="stat-label">Faster Procurement than Humans</div>
                </div>
                
                <div className="stat-box">
                  <FaChartBar className="text-4xl text-accentBlue mx-auto mb-4 icon-spin" />
                  <div className="stat-number">3</div>
                  <div className="stat-label">Major Chip Manufacturers</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="slide-text">
                  The global GPU market is fueled by growing AI applications, gaming advancements, and decentralized computing needs. Due to frequent shortages and limited retail availability, demand for high-performance GPUs continues to surge.
                </p>
                
                <div className="highlight-box">
                  <div className="flex items-center">
                    <FaNetworkWired className="text-2xl text-accentGold mr-3 icon-pulse" />
                    <p className="slide-text mb-0">
                      With major chip manufacturers like <span className="highlight-text">NVIDIA, AMD, and Intel</span> struggling to meet demand, <span className="highlight-text">BitBased</span> exploits these inefficiencies by using automation to procure and resell GPUs before competitors can even react.
                    </p>
                  </div>
                </div>
                
                <p className="slide-text">
                  This unique advantage allows us to dictate supply in niche markets and command optimal pricing structures, ensuring high profitability with minimal operational risk.
                </p>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'leadershipTeam' && (
            <div className="slide-content">
              <motion.h1 
                className="slide-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaUsers className="inline-block mr-3 text-accentBlue" />
                Leadership Team
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="team-grid"
              >
                <motion.div 
                  className="team-member"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="team-name flex items-center">
                    <FaLaptopCode className="mr-2 icon-pulse" /> Juan Cordero
                  </div>
                  <div className="team-role">Chief Technology Officer (CTO)</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>Automation technology architect</li>
                    <li>System security manager</li>
                    <li>Custom ERP & IMS development</li>
                    <li>Research & reverse engineering</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="team-member"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="team-name flex items-center">
                    <FaHandshake className="mr-2 icon-bounce" /> Maximilian Reilly
                  </div>
                  <div className="team-role">Chief Sales Officer (CSO)</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>Pricing strategy leader</li>
                    <li>Sales channel management</li>
                    <li>Client acquisition & negotiation</li>
                    <li>Brand positioning</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="team-member"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="team-name flex items-center">
                    <FaServer className="mr-2 icon-spin" /> Tyler Federwitz
                  </div>
                  <div className="team-role">Chief Logistics & Inventory Officer (CLIO)</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>Inventory management</li>
                    <li>Shipping and fulfillment</li>
                    <li>Workflow optimization</li>
                    <li>Logistics partnerships</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="team-member"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="team-name flex items-center">
                    <FaMoneyBillWave className="mr-2 icon-pulse" /> Franco Alvarez
                  </div>
                  <div className="team-role">Chief Financial Officer (CFO)</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>Financial oversight</li>
                    <li>Capital allocation strategy</li>
                    <li>Cost efficiency & forecasting</li>
                    <li>Financial growth planning</li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'leadershipTeamImage' && (
            <div className="slide-content flex justify-center items-center">
              <motion.div 
                className="image-container w-full h-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={imageUrls.leadershipTeamImage} alt="Leadership Team" className="fullscreen-image" />
                <div className="image-caption">
                  Our Elite Leadership Team - Driving Innovation and Growth
                </div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'scalabilityRoadmap' && (
            <div className="slide-content">
              <motion.h1 
                className="slide-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaRocket className="inline-block mr-3 text-accentGreen" />
                Scalability Roadmap
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <motion.div 
                  className="phase-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="phase-title flex items-center">
                    <FaRocket className="mr-2 icon-pulse" /> Phase 1: Foundation (Up to $15,000 Profit)
                  </div>
                  <p className="slide-text">
                    Strengthen domestic botting operations, increase inventory turnover, and expand local sales reach.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-accentGreen h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <span className="ml-2 text-accentGreen">Complete</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="phase-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="phase-title flex items-center">
                    <FaGlobe className="mr-2 icon-spin" /> Phase 2: Expansion ($15,000 - $50,000 Profit)
                  </div>
                  <p className="slide-text">
                    Begin outsourcing bot operations to <span className="highlight-text">foreign bot farms</span> in <span className="highlight-text">Asia</span>, where cost efficiencies and workforce availability will allow for 24/7 scalability and higher acquisition volume.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-accentGold h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="ml-2 text-accentGold">In Progress</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="phase-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="phase-title flex items-center">
                    <FaChartLine className="mr-2 icon-bounce" /> Phase 3: Domination ($50,000+ Profit)
                  </div>
                  <p className="slide-text">
                    Establish direct supplier relationships and further automate logistics, ensuring BitBased evolves into a fully scaled enterprise with e-commerce integration and long-term brand positioning.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-accentBlue h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="ml-2 text-accentBlue">Planning</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'revenueModel' && (
            <div className="slide-content">
              <motion.h1 
                className="slide-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaMoneyBillWave className="inline-block mr-3 text-accentGold" />
                Revenue Model
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <motion.div 
                  className="phase-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="phase-title flex items-center">
                    <FaMoneyBillWave className="text-2xl text-accentGold mr-3 icon-pulse" />
                    Phase 1: Cash Business
                  </div>
                  <p className="slide-text">
                    Sales through OfferUp, Facebook Marketplace, and other direct in-person channels.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="phase-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="phase-title flex items-center">
                    <FaUsers className="text-2xl text-accentBlue mr-3 icon-bounce" />
                    Phase 2: E-commerce Transition
                  </div>
                  <p className="slide-text">
                    Leveraging platforms such as Amazon, eBay, StockX, and a proprietary website.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="phase-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="phase-title flex items-center">
                    <FaChartLine className="text-2xl text-accentGreen mr-3 icon-spin" />
                    Phase 3: Bulk Sales Expansion
                  </div>
                  <p className="slide-text">
                    Selling GPUs to crypto mining farms and system integrators at wholesale rates.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'revenueModelImage' && (
            <div className="slide-content flex justify-center items-center">
              <motion.div 
                className="image-container w-full h-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={imageUrls.revenueModelImage} alt="Revenue Model" className="fullscreen-image" />
                <div className="image-caption">
                  Revenue Growth Strategy - From Local Sales to Enterprise Scale
                </div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'conclusionImage' && (
            <div className="slide-content flex justify-center items-center">
              <motion.div 
                className="image-container w-full h-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={imageUrls.logoImage} alt="BitBased Logo" className="fullscreen-image" />
                <div className="image-caption">
                  BitBased - Redefining GPU Resale
                </div>
              </motion.div>
            </div>
          )}

          {slides[currentSlide] === 'conclusion' && (
            <div className="slide-content">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <motion.h1 
                  className="slide-title"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <FaRocket className="inline-block mr-3 text-accentGold icon-pulse" />
                  Conclusion
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="highlight-box">
                    <p className="slide-text text-center">
                      BitBased is strategically positioned to dominate the secondary GPU market with an elite team of technology, sales, logistics, and finance experts.
                    </p>
                  </div>
                  
                  <p className="slide-text mt-4">
                    Our roadmap ensures that we evolve from a primarily cash-based second-hand sales model into a fully automated e-commerce powerhouse.
                  </p>
                  
                  <motion.p 
                    className="slide-text mt-4 font-bold text-highlightYellow text-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                  >
                    BitBased offers a unique investment opportunity with massive growth potential.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
