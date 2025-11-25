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

  useEffect(() => setCurrent(activeSection), [activeSection]);
  useEffect(() => setHasScrolled(isScrolled), [isScrolled]);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'services', label: 'Services', icon: <Cog6ToothIcon className="w-6 h-6" /> },
    { id: 'projects', label: 'Work', icon: <FolderIcon className="w-6 h-6" /> },
    { id: 'pricing', label: 'Plans', icon: <CurrencyRupeeIcon className="w-6 h-6" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneIcon className="w-6 h-6" /> }
  ];

  const handleClick = (id: string) => {
    setCurrent(id);
    onNavigate?.(id);
    setIsMenuOpen(false);
  };

  // Animation variants for different states
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

  return (
    <>
      {/* Top Navbar - Shows initially */}
      <AnimatePresence mode="wait">
        {!hasScrolled && (
          <motion.nav
            key="top-nav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={topNavVariants}
            className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-slate-900/80 to-transparent backdrop-blur-xl border-b border-white/10"
          >
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="text-xl font-bold bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Crestovix
                  </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                      className={`text-sm font-medium transition-all duration-300 ${
                        current === item.id 
                          ? 'text-white bg-linear-to-r from-blue-600/20 to-purple-600/20 px-4 py-2 rounded-xl' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartProject?.()}
                    className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-xl font-semibold text-sm bg-linear-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
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
                    {isMenuOpen ? <XMarkIcon className="w-6 h-6 text-white" /> : <Bars3Icon className="w-6 h-6 text-white" />}
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
                  <div className="container mx-auto px-6 py-4 space-y-4">
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
                    <div className="pt-4 border-t border-white/10">
                      <button 
                        onClick={() => onStartProject?.()}
                        className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 font-semibold text-white text-center"
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

      {/* Bottom Navbar - Shows when scrolled */}
      <AnimatePresence mode="wait">
        {hasScrolled && (
          <motion.nav
            key="bottom-nav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bottomNavVariants}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4 lg:px-0"
          >
            <div className="mx-auto">
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl px-3 py-2 flex items-center justify-between gap-3">
                {/* Left: menu button */}
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Open menu"
                    onClick={() => setIsMenuOpen(v => !v)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {isMenuOpen ? <XMarkIcon className="w-6 h-6 text-white" /> : <Bars3Icon className="w-6 h-6 text-white" />}
                  </button>
                </div>

                {/* Center: nav items */}
                <div className="flex-1 flex items-center justify-center gap-1 md:gap-3">
                  {navItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                      className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all select-none ${
                        current === item.id 
                          ? 'text-white bg-linear-to-r from-blue-600/60 to-purple-600/60 shadow-md' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="w-6 h-6 mb-1">{item.icon}</div>
                      <span className="hidden sm:block">{item.label}</span>
                    </a>
                  ))}
                </div>

                {/* Right: CTA */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartProject?.()}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm bg-linear-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <RocketLaunchIcon className="w-5 h-5 text-white" />
                    <span className="hidden sm:inline text-white">Start</span>
                  </motion.button>
                </div>
              </div>

              {/* Mobile expanded sheet/menu for bottom nav */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-3"
                  >
                    <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 space-y-3">
                      {navItems.map(item => (
                        <a
                          key={`sheet-${item.id}`}
                          href={`#${item.id}`}
                          onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                            current === item.id 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="w-6 h-6">{item.icon}</div>
                          <div className="flex-1">{item.label}</div>
                        </a>
                      ))}

                      <div className="pt-2 border-t border-white/10">
                        <button 
                          onClick={() => onStartProject?.()} 
                          className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg"
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
      {!hasScrolled && <div className="h-16" />}

      {/* Accessibility: add safe-area bottom spacer for devices with home indicator */}
      <div aria-hidden className="h-[env(safe-area-inset-bottom)]" />
    </>
  );
}