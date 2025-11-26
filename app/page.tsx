/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/unsupported-syntax */
/* eslint-disable react/no-unescaped-entities */
// app/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback, JSX } from "react";
import Head from "next/head";
import { motion, Variants } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Project, Service, ContactInfo, Stat, PricingPlan } from "./types";
import Navbar from "./components/Navbar";
import { 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
} from 'react-icons/fa';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Throttled scroll handler
  const handleScroll = useCallback((): void => {
    if (scrollTimeoutRef.current) {
      return;
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      const sections: string[] = [
        "home",
        "services",
        "projects",
        "pricing",
        "contact",
      ];
      const scrollPosition: number = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }

      scrollTimeoutRef.current = undefined;
    }, 16); // ~60fps
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  // WhatsApp Integration
  const handleStartProject = () => {
    const phoneNumber = "917736314029";
    const message =
      "Hello! I'm interested in starting a project with Crestovix Studio. Can we discuss my requirements?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Optimized floating particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    const particles: Particle[] = [];
    const particleCount: number = 30; // Reduced from 50 for better performance

    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        const width = canvas?.width ?? window.innerWidth;
        const height = canvas?.height ?? window.innerHeight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles
        this.speedX = Math.random() * 0.8 - 0.4; // Slower movement
        this.speedY = Math.random() * 0.8 - 0.4;
        this.color = `rgba(99, 102, 241, ${Math.random() * 0.2})`; // More transparent
      }

      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;

        if (canvas) {
          if (this.x > canvas.width) this.x = 0;
          else if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0;
          else if (this.y < 0) this.y = canvas.height;
        }
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleImpl());
    }

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
      resizeObserver.disconnect();
    };
  }, []);

  const socialLinks: { name: string; icon: JSX.Element; url: string }[] = [
  { 
    name: "Twitter", 
    icon: <FaTwitter className="text-lg" />, 
    url: "https://twitter.com/crestovix" 
  },
  { 
    name: "Instagram", 
    icon: <FaInstagram className="text-lg" />, 
    url: "https://instagram.com/crestovix" 
  },
  { 
    name: "LinkedIn", 
    icon: <FaLinkedin className="text-lg" />, 
    url: "https://linkedin.com/company/crestovix" 
  },
  { 
    name: "GitHub", 
    icon: <FaGithub className="text-lg" />, 
    url: "https://github.com/crestovix" 
  },
];

  // Updated projects with our actual work
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Fashion Store",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      description:
        "Complete e-commerce solution with product management, payment integration, and admin dashboard.",
      technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      demoUrl: "#",
    },
    {
      id: 2,
      title: "Healthcare Platform",
      category: "No-Code Development",
      image:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      description:
        "Patient management system built with no-code tools for seamless healthcare operations.",
      technologies: ["Webflow", "Airtable", "Zapier", "Memberstack"],
      demoUrl: "#",
    },
    {
      id: 3,
      title: "Restaurant Booking System",
      category: "Full-Stack Development",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      description:
        "Table reservation system with real-time availability and automated confirmations.",
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      demoUrl: "#",
    },
    {
      id: 4,
      title: "Educational Platform",
      category: "No-Code Development",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      description:
        "Online learning platform with course management and student progress tracking.",
      technologies: ["Wix", "Google Sheets", "Calendly", "PayPal"],
      demoUrl: "#",
    },
    {
      id: 5,
      title: "Real Estate Portal",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      description:
        "Property listing platform with advanced filters and virtual tour integration.",
      technologies: ["Vue.js", "Express", "Firebase", "Mapbox"],
      demoUrl: "#",
    },
    {
      id: 6,
      title: "Startup Landing Page",
      category: "No-Code Development",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      description:
        "High-converting landing page for tech startup with integrated analytics.",
      technologies: ["Webflow", "Google Analytics", "Mailchimp", "Calendly"],
      demoUrl: "#",
    },
  ];

  // Updated services with both coding and no-code
  const services: Service[] = [
    {
      title: "Custom Web Development",
      icon: "💻",
      description:
        "Bespoke websites and web applications built with modern technologies for optimal performance and scalability.",
      features: [
        "React/Next.js Development",
        "Full-Stack Solutions",
        "API Integration",
        "Database Design",
        "Performance Optimization",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "No-Code Development",
      icon: "🚀",
      description:
        "Rapid website development using no-code platforms like Webflow, Wix, and Bubble for faster time-to-market.",
      features: [
        "Webflow Development",
        "Wix Expert",
        "Bubble.io",
        "Automation",
        "CMS Setup",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "UI/UX Design & Branding",
      icon: "🎨",
      description:
        "User-centered design approach that creates intuitive, accessible, and delightful digital experiences.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Brand Identity",
        "Design Systems",
      ],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Custom Development Pricing
  const codingPricing: PricingPlan[] = [
    {
      id: 1,
      name: "Basic Website",
      price: "₹14,999",
      period: "project",
      description: "Perfect for small businesses and startups",
      features: [
        "5 Page Responsive Website",
        "Basic SEO Setup",
        "Contact Form",
        "1 Month Support",
        "Mobile Friendly",
        "Basic Analytics",
      ],
      cta: "Start Project",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Business Website",
      price: "₹34,999",
      period: "project",
      description: "Ideal for growing businesses",
      features: [
        "15+ Page Dynamic Website",
        "Advanced SEO",
        "CMS Integration",
        "3 Months Support",
        "Performance Optimization",
        "Social Media Integration",
        "Google Analytics",
      ],
      popular: true,
      cta: "Get Started",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "E-commerce Website",
      price: "₹79,999",
      period: "project",
      description: "Complete online store solution",
      features: [
        "Full E-commerce Setup",
        "Payment Gateway Integration",
        "Product Management",
        "6 Months Support",
        "Order Tracking",
        "Admin Dashboard",
        "24/7 Priority Support",
      ],
      cta: "Contact Sales",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // No-Code Development Pricing
  const noCodePricing: PricingPlan[] = [
    {
      id: 1,
      name: "Wix Basic",
      price: "₹9,999",
      period: "project",
      description: "Simple no-code website using Wix",
      features: [
        "5 Page Wix Website",
        "Basic Design Setup",
        "Mobile Responsive",
        "Contact Form",
        "1 Week Training",
        "Basic SEO",
      ],
      cta: "Start Project",
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: 2,
      name: "Webflow Pro",
      price: "₹24,999",
      period: "project",
      description: "Professional no-code development",
      features: [
        "Custom Webflow Development",
        "CMS Integration",
        "Advanced Animations",
        "Complete SEO Setup",
        "2 Weeks Training",
        "Social Media Integration",
        "Performance Optimization",
      ],
      popular: true,
      cta: "Get Started",
      gradient: "from-teal-500 to-blue-500",
    },
    {
      id: 3,
      name: "Enterprise No-Code",
      price: "₹49,999",
      period: "project",
      description: "Advanced no-code solutions",
      features: [
        "Multi-page Application",
        "Database Integration",
        "User Authentication",
        "1 Month Training",
        "Priority Support",
        "Custom Domain",
        "Advanced Analytics",
      ],
      cta: "Contact Sales",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const contactInfo: ContactInfo[] = [
    {
      icon: "📍",
      title: "Visit Our Studio",
      content: "Munduparamb, Malappuram, Kerala",
      link: "https://maps.google.com",
    },
    {
      icon: "📞",
      title: "Call Us",
      content: "+91 7907456218",
      link: "tel:+917907456218",
    },
    {
      icon: "✉️",
      title: "Email Us",
      content: "crestovixstudio@gmail.com",
      link: "mailto:crestovixstudio@gmail.com",
    },
    {
      icon: "🕒",
      title: "Working Hours",
      content: "Mon - Fri: 9:00 - 18:00",
    },
  ];

  const stats: Stat[] = [
    { number: "10+", label: "Projects Completed" },
    { number: "8+", label: "Happy Clients" },
    { number: "1+", label: "Years Experience" },
    { number: "24/7", label: "Dedicated Support" },
  ];

  const navItems: string[] = [
    "Home",
    "Services",
    "Projects",
    "Pricing",
    "Contact",
  ];

  // Social Media Links
  // Removed duplicate declaration of socialLinks to
  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHoverVariants: Variants = {
    initial: {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    },
    hover: {
      y: -10,
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed -top-40 -right-40 w-80 h-80 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Head>
        <title>Crestovix Studio | Custom & No-Code Web Development</title>
        <meta
          name="description"
          content="Crafting exceptional digital experiences through custom web development, no-code solutions, and brand identity design. Transform your digital presence with Crestovix Studio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        activeSection={activeSection}
        onNavigate={(id) => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onStartProject={handleStartProject}
        isScrolled={isScrolled}
      />

      {/* Hero Section with Background Image */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200&q=80"
            alt="Digital technology background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">
                  Crafting Digital Excellence Since 2020
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-linear-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Digital
                </span>
                <br />
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
              >
                We craft{" "}
                <span className="text-blue-300 font-semibold">
                  premium digital experiences
                </span>{" "}
                that elevate your brand and drive measurable business growth
                through innovative web solutions and compelling brand
                identities.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-gray-300 mb-12 leading-relaxed"
              >
                From stunning custom websites to efficient no-code solutions, we
                transform your vision into digital reality that captivates
                audiences and delivers results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row items-start gap-6 mb-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartProject}
                  className="group relative bg-linear-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative border-2 border-white/30 text-white px-12 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <span className="relative z-10">View Our Work</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat: Stat, index: number) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="text-left"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Visual - Device Mockup Gallery */}
            {/* <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="relative"
>
  <div className="relative space-y-6">
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="relative"
    >
      <div className="bg-gray-800 rounded-lg p-2 mx-auto w-48">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded h-24 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">Desktop</span>
        </div>
      </div>
    </motion.div>

    <div className="flex justify-center gap-4">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="relative"
      >
        <div className="bg-gray-700 rounded-lg p-1 w-20">
          <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded h-16 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Tablet</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="relative"
      >
        <div className="bg-gray-700 rounded-lg p-1 w-12">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded h-20 flex items-center justify-center">
            <span className="text-white text-xs font-semibold rotate-90">Mobile</span>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <motion.path
          d="M30,40 L50,20 L70,40"
          stroke="rgba(99, 102, 241, 0.3)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>

    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-blue-600 to-purple-600 rounded-full p-4 border border-white/20 shadow-lg"
    >
      <span className="text-white text-lg">✨</span>
    </motion.div>
  </div>
</motion.div> */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div data-aos="fade-up" className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital solutions designed to transform your brand
              presence and drive meaningful results in today's competitive
              digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service: Service, index: number) => (
              <motion.div
                key={service.title}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="group relative"
              >
                <div className="relative bg-linear-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full backdrop-blur-xl">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-500 rounded-3xl"></div>
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">+</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 relative">
                    {service.title}
                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500"></div>
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 relative z-10">
                    {service.features.map((feature: string) => (
                      <div
                        key={feature}
                        className="flex items-center text-gray-300 group/feature"
                      >
                        <div className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover/feature:scale-125 transition-transform duration-300"></div>
                        <span className="group-hover/feature:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartProject}
                    className="w-full bg-linear-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div data-aos="fade-up" className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our diverse portfolio featuring both custom-coded
              solutions and efficient no-code platforms. Each project is
              tailored to meet unique business needs and deliver exceptional
              results.
            </p>
          </motion.div>

          {/* Project Filters */}
          <motion.div
            data-aos="fade-up"
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:bg-blue-700">
              All Projects
            </button>
            <button className="px-6 py-3 bg-white/10 text-gray-300 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/20 hover:text-white">
              Custom Development
            </button>
            <button className="px-6 py-3 bg-white/10 text-gray-300 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/20 hover:text-white">
              No-Code Solutions
            </button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm border ${
                          project.category.includes("No-Code")
                            ? "bg-green-500/80 text-white border-green-400/50"
                            : "bg-blue-500/80 text-white border-blue-400/50"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-white/5"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-white/5">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Project Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-sm"
                      onClick={() =>
                        project.demoUrl &&
                        window.open(project.demoUrl, "_blank")
                      }
                    >
                      View Project
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div data-aos="fade-up" className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Choose Your Solution
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Flexible pricing options for both custom development and no-code
              solutions. Choose the approach that best fits your budget and
              requirements.
            </p>
          </motion.div>

          {/* Custom Development Pricing */}
          <motion.div data-aos="fade-up" className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-4xl font-bold text-white">
                Custom Development
              </h3>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg ">
              Fully custom websites and web applications built with modern
              technologies for optimal performance and scalability.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
          >
            {codingPricing.map((plan: PricingPlan, index: number) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className={`relative ${
                  plan.popular ? "lg:scale-105 z-10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 my-3">
                    <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`bg-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 h-full transform-gpu ${
                    plan.popular
                      ? "border-purple-500/50 bg-purple-500/5 shadow-2xl"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map(
                      (feature: string, featureIndex: number) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      )
                    )}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartProject}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/25"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* No-Code Development Pricing */}
          <motion.div data-aos="fade-up" className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-4xl font-bold text-white">
                No-Code Solutions
              </h3>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Rapid website development using no-code platforms for faster
              time-to-market and cost-effectiveness.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {noCodePricing.map((plan: PricingPlan, index: number) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className={`relative ${
                  plan.popular ? "lg:scale-105 z-10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 my-3">
                    <span className="bg-linear-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <motion.div
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`bg-white/5 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 h-full transform-gpu ${
                    plan.popular
                      ? "border-teal-500/50 bg-teal-500/5 shadow-2xl"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map(
                      (feature: string, featureIndex: number) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      )
                    )}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartProject}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? "bg-linear-to-r from-teal-600 to-blue-600 text-white shadow-2xl hover:shadow-teal-500/25"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Custom Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need Custom Solutions?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We specialize in bespoke development tailored to your unique
                business requirements. Let's build something extraordinary
                together.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartProject}
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Discuss Custom Project
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div data-aos="fade-up" className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to Begin?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Let's discuss your project and create something extraordinary
                together. Our team is ready to bring your vision to life with
                innovative solutions and exceptional craftsmanship.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                data-aos="fade-right"
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Service Interest
                    </label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm">
                      <option value="">Select Service</option>
                      <option value="coding">Custom Development</option>
                      <option value="nocode">No-Code Solution</option>
                      <option value="branding">Brand Identity</option>
                      <option value="custom">Custom Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Project Details
                    </label>
                    <textarea
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm resize-none"
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div data-aos="fade-left" className="space-y-8">
                {contactInfo.map((item: ContactInfo, index: number) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-2xl w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-300">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Expertise Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-white font-semibold mb-3">
                    Our Expertise
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Custom Web Development
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      No-Code Solutions
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      UI/UX Design & Branding
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Performance Optimization
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Social Media */}
<footer className="relative border-t border-white/10 py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Company Info */}
      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Crestovix Studio
          </span>
        </motion.div>
        <p className="text-gray-400 mb-6 max-w-md">
          Crafting exceptional digital experiences through custom web
          development, no-code solutions, and compelling brand identities.
        </p>

        {/* Social Media Links with Real Icons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/5 group"
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Our Services</h3>
        <ul className="space-y-2">
          {services.map((service) => (
            <li key={service.title}>
              <a
                href="#services"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-white font-semibold mb-4">Resources</h3>
        <ul className="space-y-2">
          <li>
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Projects
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Blog
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Case Studies
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-white/10 mt-8 pt-8 text-center">
      <p className="text-gray-400">
        &copy; {new Date().getFullYear()} Crestovix Studio. All rights
        reserved. | Crafting Digital Excellence
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}
