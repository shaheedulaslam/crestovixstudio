/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  HomeIcon,
  Cog6ToothIcon,
  FolderIcon,
  CurrencyRupeeIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
};

interface Props {
  /** current active section id (home, services, projects, pricing, contact) */
  activeSection?: string;
  /** callback when user clicks a nav item */
  onNavigate?: (id: string) => void;
  /** callback to trigger primary CTA */
  onStartProject?: () => void;
  /** when true, keep the classic top desktop nav (lg+) instead of app-bar style */
  desktopTopNav?: boolean;
  /** control whether navbar is in scrolled state */
  isScrolled?: boolean;
}

export default function Navbar({
  activeSection = 'home',
  onNavigate,
  onStartProject,
  desktopTopNav = false,
  isScrolled = false
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [current, setCurrent] = useState(activeSection);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setCurrent(activeSection), [activeSection]);
  useEffect(() => setHasScrolled(isScrolled), [isScrolled]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'services', label: 'Services', icon: <Cog6ToothIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'projects', label: 'Work', icon: <FolderIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'pricing', label: 'Plans', icon: <CurrencyRupeeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6" /> }
  ];

  const handleClick = (id: string) => {
    setCurrent(id);
    onNavigate?.(id);
    setIsMenuOpen(false);
  };

  // Animation variants
  const topNavVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const bottomNavVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  // For mobile, always use bottom nav when scrolled
  const shouldShowBottomNav = hasScrolled || isMobile;

  return (
    <>
      {/* Top Navbar - Shows on desktop when not scrolled */}
      <AnimatePresence mode="wait">
        {!shouldShowBottomNav && (
          <motion.nav
            key="top-nav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={topNavVariants}
            className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-slate-900/80 to-transparent backdrop-blur-xl border-b border-white/10"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-lg">C</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Crestovix
                  </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                  {navItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                      className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-xl ${
                        current === item.id 
                          ? 'text-white bg-linear-to-r from-blue-600/20 to-purple-600/20' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* CTA Button & Mobile Menu */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartProject?.()}
                    className="hidden sm:flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm bg-linear-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <RocketLaunchIcon className="w-4 h-4 text-white" />
                    <span className="text-white">Start Project</span>
                  </motion.button>

                  {/* Mobile Menu Button */}
                  <button
                    aria-label="Open menu"
                    onClick={() => setIsMenuOpen(v => !v)}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {isMenuOpen ? <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu for Top Nav */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
                >
                  <div className="container mx-auto px-4 sm:px-6 py-4 space-y-3">
                    {navItems.map(item => (
                      <a
                        key={`mobile-${item.id}`}
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          current === item.id 
                            ? 'text-white bg-linear-to-r from-blue-600/20 to-purple-600/20' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="w-5 h-5">{item.icon}</div>
                        {item.label}
                      </a>
                    ))}
                    <div className="pt-3 border-t border-white/10">
                      <button 
                        onClick={() => onStartProject?.()}
                        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 font-semibold text-white text-center text-sm sm:text-base"
                      >
                        Start Project
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Bottom Navbar - Shows when scrolled or on mobile */}
      <AnimatePresence mode="wait">
        {shouldShowBottomNav && (
          <motion.nav
            key="bottom-nav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bottomNavVariants}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95vw] max-w-3xl px-2 sm:px-4"
          >
            <div className="mx-auto">
              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl px-2 sm:px-3 py-2 flex items-center justify-between gap-1 sm:gap-2">
                
                {/* Left: menu button - only show on mobile */}
                <div className="flex items-center">
                  <button
                    aria-label="Open menu"
                    onClick={() => setIsMenuOpen(v => !v)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors flex md:hidden"
                  >
                    {isMenuOpen ? <XMarkIcon className="w-5 h-5 text-white" /> : <Bars3Icon className="w-5 h-5 text-white" />}
                  </button>
                </div>

                {/* Center: nav items */}
                <div className="flex-1 flex items-center justify-center gap-0 sm:gap-1 md:gap-2">
                  {navItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                      className={`flex flex-col items-center justify-center p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium transition-all select-none min-w-[50px] sm:min-w-[60px] ${
                        current === item.id 
                          ? 'text-white bg-linear-to-r from-blue-600/60 to-purple-600/60 shadow-md' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 mb-1">{item.icon}</div>
                      <span className="text-[10px] sm:text-xs">{item.label}</span>
                    </a>
                  ))}
                </div>

                {/* Right: CTA - compact on mobile */}
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartProject?.()}
                    className="flex items-center gap-1 sm:gap-2 p-2 sm:px-3 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm bg-linear-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <RocketLaunchIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="hidden xs:inline text-white">Start</span>
                  </motion.button>
                </div>
              </div>

              {/* Mobile expanded sheet/menu for bottom nav */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="mt-2 sm:mt-3"
                  >
                    <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-3 sm:p-4 space-y-2 sm:space-y-3">
                      {navItems.map(item => (
                        <a
                          key={`sheet-${item.id}`}
                          href={`#${item.id}`}
                          onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm sm:text-base ${
                            current === item.id 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="w-5 h-5">{item.icon}</div>
                          <div className="flex-1">{item.label}</div>
                        </a>
                      ))}

                      <div className="pt-2 border-t border-white/10">
                        <button 
                          onClick={() => onStartProject?.()} 
                          className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg text-sm sm:text-base"
                        >
                          Start Project
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Spacer for top nav to prevent content overlap */}
      {!shouldShowBottomNav && <div className="h-16" />}

      {/* Overlay when mobile menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Accessibility: add safe-area bottom spacer for devices with home indicator */}
      <div aria-hidden className="h-[env(safe-area-inset-bottom)]" />
    </>
  );
}