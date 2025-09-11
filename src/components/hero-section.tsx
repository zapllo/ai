"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useSpring, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PlayCircle, BarChart3, Bot, Globe, Headphones, PhoneCall,
  Crown, ArrowRight, Star, Zap, Radio, Shield, TrendingUp,
  Users, Clock, MessageSquare, Brain, Award, Target,
  Sparkles, ChevronRight, Activity, Volume2, Mic,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

// Real-time metrics that update
const liveMetrics = [
  { label: "Active Calls", value: "2,847", icon: <PhoneCall className="h-5 w-5" />, trend: "+23%" },
  { label: "Conversion Rate", value: "94.7%", icon: <Target className="h-5 w-5" />, trend: "+12%" },
  { label: "Response Time", value: "0.3s", icon: <Clock className="h-5 w-5" />, trend: "-45%" },
  { label: "Customer Satisfaction", value: "4.9/5", icon: <Star className="h-5 w-5" />, trend: "+8%" }
];

// Interactive dashboard preview tabs
const dashboardPreviews = [
  {
    id: "analytics",
    name: "Analytics Dashboard",
    image: "/ss/1.png",
    description: "Real-time performance insights"
  },
  {
    id: "calls",
    name: "Active Calls",
    image: "/ss/2.png",
    description: "Live call monitoring"
  },
  {
    id: "agents",
    name: "Agent Management",
    image: "/ss/3.png",
    description: "AI agent configuration"
  }
];

// Floating feature cards
const featureCards = [

  {
    title: "Real-time Analytics",
    description: "Track every conversation metric",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "#10b981",
    position: { top: "60%", right: "25%" }
  },
  {
    title: "Voice Cloning",
    description: "Clone any voice in 30 seconds",
    icon: <Mic className="h-6 w-6" />,
    color: "#3b82f6",
    position: { top: "60%", right: "8%" }
  },
  // {
  //   title: "25+ Languages",
  //   description: "Global voice AI deployment",
  //   icon: <Globe className="h-6 w-6" />,
  //   color: "#8b5cf6",
  //   position: { top: "58%", right: "10%" }
  // }
];

// Premium live demo component
const LiveDemoCard = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % liveMetrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-white/40 dark:border-gray-700/40 rounded-3xl p-8 scale-[80%] w-72 h-52 shadow-2xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
        <span className="text-sm font-bold text-red-500 uppercase tracking-wide">LIVE</span>
        <span className="text-sm text-muted-foreground">Real-time Performance</span>
      </div>

      {/* Animated metrics */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMetric}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-2">
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${liveMetrics[currentMetric].label === 'Active Calls' ? '#3b82f6' : liveMetrics[currentMetric].label === 'Conversion Rate' ? '#10b981' : liveMetrics[currentMetric].label === 'Response Time' ? '#f59e0b' : '#8b5cf6'}20` }}
            >
              <div style={{ color: liveMetrics[currentMetric].label === 'Active Calls' ? '#3b82f6' : liveMetrics[currentMetric].label === 'Conversion Rate' ? '#10b981' : liveMetrics[currentMetric].label === 'Response Time' ? '#f59e0b' : '#8b5cf6' }}>
                {liveMetrics[currentMetric].icon}
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{liveMetrics[currentMetric].value}</p>
              <p className="text-sm text-muted-foreground">{liveMetrics[currentMetric].label}</p>
            </div>
            <div className="ml-auto">
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {liveMetrics[currentMetric].trend}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mini audio wave visualization */}
      {/* <div className="flex items-center gap-1 mb-4">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-violet-500"
            animate={{
              height: [`${Math.random() * 20 + 10}px`, `${Math.random() * 40 + 20}px`, `${Math.random() * 30 + 15}px`],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          />
        ))}
      </div> */}

      <p className="text-xs text-muted-foreground">
        <span className="text-green-500 font-semibold">2,847</span> calls in progress right now
      </p>
    </motion.div>
  );
};

// Interactive dashboard preview
const DashboardPreview = () => {
  const [activePreview, setActivePreview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePreview((prev) => (prev + 1) % dashboardPreviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Dashboard frame */}
      <div className="relative aspect-[16/12] z-[0] md:-mt-32 rounded-2xl overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePreview}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute h-full   inset-0"
          >
            <Image
              src={dashboardPreviews[activePreview].image}
              alt={dashboardPreviews[activePreview].name}
              fill
              className="object-cover  enter     bg-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dashboard tabs */}
        {/* <div className="absolute top-4 left-4 flex gap-2">
          {dashboardPreviews.map((preview, index) => (
            <button
              key={preview.id}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 backdrop-blur-sm border",
                activePreview === index
                  ? "bg-white/90 text-gray-900 border-white/40 shadow-lg"
                  : "bg-black/20 text-white border-white/20 hover:bg-white/10"
              )}
              onClick={() => setActivePreview(index)}
            >
              {preview.name}
            </button>
          ))}
        </div> */}

        {/* Status indicator */}
        <div className="absolute bottom-4 left-4 bg-black/60 dark:bg-black/80 backdrop-blur-md text-sm px-4 py-2 rounded-xl text-white border border-white/10 flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span>System Active</span>
        </div>
      </div>

      {/* Floating action button */}
      <motion.div
        className="absolute -bottom-4 -right-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/dashboard">
          <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-full p-4 shadow-2xl shadow-blue-500/30">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  // Cursor following effect
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const spotlightX = useMotionTemplate`${mouseX}px`;
  const spotlightY = useMotionTemplate`${mouseY}px`;

  return (
    <section ref={heroRef} className="relative py-24 md:py-32 lg:py-20 overflow-hidden">
      {/* Premium spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-500 lg:opacity-100"
        style={{
          background: isDark
            ? `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1) 40%, transparent 70%)`
            : `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.06) 40%, transparent 70%)`
        }}
      />

      {/* Enhanced background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-purple-500/10 rounded-full blur-[150px] animate-pulse"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/20 via-pink-500/15 to-blue-500/10 rounded-full blur-[140px] animate-pulse [animation-delay:3s]"
        />

        {/* Floating feature cards */}
        {/* {featureCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="absolute  hidden xl:block z-[1000]"
            style={card.position}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-2xl p-4 z-[100] shadow-2xl max-w-[200px]">
              <div
                className="p-2 rounded-xl mb-2 w-fit"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <div style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">{card.title}</h4>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </div>
          </motion.div>
        ))} */}
      </div>

      <div className="container mx-auto relative z-20 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                borderColor: 'rgba(59, 130, 246, 0.3)'
              }}
            >
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400">
                #1 ENTERPRISE CHOICE
              </span>
              <div className="w-px h-4 bg-gradient-to-b from-blue-500 to-violet-500"></div>
              <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                AI Voice Agents
              </span>
              <br />
              <span className="text-foreground">That Actually</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                Convert
              </span>
            </motion.h1>

            {/* Value proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-xl text-muted-foreground leading-relaxed">
                Deploy enterprise-grade AI voice agents that handle complex conversations,
                close deals, and provide support with <span className="text-blue-600 dark:text-blue-400 font-semibold">94.7% accuracy</span>.
              </p>

              {/* Key benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  { icon: <Target className="h-4 w-4" />, text: "267% Revenue Increase" },
                  { icon: <Clock className="h-4 w-4" />, text: "24/7 Availability" },
                  { icon: <Shield className="h-4 w-4" />, text: "Enterprise Security" },
                  { icon: <Users className="h-4 w-4" />, text: "Unlimited Scale" }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                  >
                    <div className="text-blue-600 dark:text-blue-400">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white py-6 px-8 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/30 transition-all duration-500 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-3">
                    <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-180" />
                    <span>Start Free Trial</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>

              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-2 border-border/60 text-foreground bg-background/60 hover:bg-background/80 backdrop-blur-xl py-6 px-8 rounded-2xl text-lg font-semibold transition-all duration-500"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
                    <span>See It In Action</span>
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span> from 500+ enterprise customers
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main dashboard */}
              <DashboardPreview />

              {/* Floating live demo card */}
              <div className="absolute -bottom-8 -left-8 lg:-left-16">
                <LiveDemoCard />
              </div>

              {/* Success notification */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary -500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, scale: 0, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <Clock className="h-4 w-4" />
                24/7 Availability
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust indicators */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-sm font-bold text-muted-foreground mb-8 tracking-widest uppercase">
            Powering Revenue for Global Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['google', 'microsoft', 'amazon', 'salesforce', 'slack'].map((company, i) => (
              <motion.div
                key={company}
                className="relative h-8 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={`/logos/${company}.webp`}
                  alt={company}
                  width={120}
                  height={32}
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
