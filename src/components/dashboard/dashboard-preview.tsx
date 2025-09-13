"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2, PieChart, LineChart, Users, Activity, BarChart,
  Layers, Radio, Sparkles, Zap, Cpu, BrainCircuit, Wand2,
  MessageSquare, Server, Crown, TrendingUp, Shield, Eye,
  Mic, Bot, Globe, Clock
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

// Enhanced dashboard tabs with premium styling
const dashboardTabs = [
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    image: "/ss/an.png",
    description: "Monitor real-time performance metrics and conversion insights",
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30"
  },
  {
    id: "calls",
    label: "Call Logs",
    icon: <Activity className="h-5 w-5" />,
    image: "/ss/call.jpg",
    description: "Review call transcripts with AI-powered sentiment analysis",
    color: "#10b981",
    gradient: "from-emerald-500/20 to-green-600/20",
    borderColor: "border-emerald-500/30"
  },
  {
    id: "agents",
    label: "Agent Builder",
    icon: <BrainCircuit className="h-5 w-5" />,
    image: "/ss/create.jpg",
    description: "Design and train your AI voice personas with advanced customization",
    color: "#8b5cf6",
    gradient: "from-violet-500/20 to-purple-600/20",
    borderColor: "border-violet-500/30"
  },
  {
    id: "reporting",
    label: "Insights",
    icon: <PieChart className="h-5 w-5" />,
    image: "/ss/lead.jpg",
    description: "Generate comprehensive reports on ROI and performance metrics",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-yellow-600/20",
    borderColor: "border-amber-500/30"
  }
];

// Premium floating particles with theme support
const PremiumParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-sm"
          style={{
            background: isDark
              ? `radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -960], // ✅ Fixed value (800 * 1.2)
            opacity: [0, 0.8, 0.4, 0],
            scale: [0.5, 1.2, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Modern grid background with theme support
const ModernGrid = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="h-full w-full opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, ${isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)'} 1px, transparent 1px), linear-gradient(to bottom, ${isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
    </div>
  );
};

// Enhanced data visualization with theme support
const PremiumDataViz = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-1 h-12">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{
            background: isDark
              ? "linear-gradient(to top, #3b82f6, #8b5cf6)"
              : "linear-gradient(to top, #2563eb, #7c3aed)"
          }}
          animate={{
            height: ["15%", "85%", "45%", "75%", "30%", "90%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Modern AI terminal with theme support
const ModernTerminal = () => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const fullText = "✓ Voice model initialized\n✓ Processing conversation data\n✓ Optimizing response patterns\n✓ AI training complete";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => setText(''), 2000);
        clearInterval(typing);
      }
    }, 80);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="bg-gray-900 dark:bg-black/90 p-4 rounded-2xl font-mono text-sm text-green-400 max-w-[280px] h-[160px] border border-green-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-500/20">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-green-300">AI Console</span>
      </div>
      <pre className="whitespace-pre-wrap text-xs leading-relaxed">
        {text}
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >_</motion.span>
      </pre>
    </div>
  );
};

// Enhanced dashboard features with theme support
const getDashboardFeatures = (theme: string | undefined) => {
  const isDark = theme === 'dark';

  return [
    {
      title: "Real-time Analytics",
      description: "Monitor calls, conversions, and performance with live updating dashboards",
      icon: <BarChart className="h-6 w-6" />,
      color: "#3b82f6",
      accentIcon: <TrendingUp className="h-4 w-4" />,
      bgGradient: isDark ? "from-blue-900/20 to-blue-800/10" : "from-blue-100/80 to-blue-50/40",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Voice Customization",
      description: "Create custom AI personas with accent, tone, and personality controls",
      icon: <Mic className="h-6 w-6" />,
      color: "#8b5cf6",
      accentIcon: <Wand2 className="h-4 w-4" />,
      bgGradient: isDark ? "from-violet-900/20 to-violet-800/10" : "from-violet-100/80 to-violet-50/40",
      borderColor: "border-violet-500/30",
      textColor: "text-violet-600 dark:text-violet-400"
    },
    {
      title: "Sentiment Analysis",
      description: "Analyze caller emotions and adjust responses with advanced AI psychology",
      icon: <BrainCircuit className="h-6 w-6" />,
      color: "#10b981",
      accentIcon: <MessageSquare className="h-4 w-4" />,
      bgGradient: isDark ? "from-emerald-900/20 to-emerald-800/10" : "from-emerald-100/80 to-emerald-50/40",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Enterprise Security",
      description: "SOC 2 compliant infrastructure with end-to-end encryption and data protection",
      icon: <Shield className="h-6 w-6" />,
      color: "#f59e0b",
      accentIcon: <Crown className="h-4 w-4" />,
      bgGradient: isDark ? "from-amber-900/20 to-amber-800/10" : "from-amber-100/80 to-amber-50/40",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-600 dark:text-amber-400"
    }
  ];
};

export function DashboardPreview() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("analytics");
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = getDashboardFeatures(theme);
  const activeTabData = dashboardTabs.find(tab => tab.id === activeTab) || dashboardTabs[0];

  // Enhanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const spotlightX = useMotionTemplate`${mousePosition.x}px`;
  const spotlightY = useMotionTemplate`${mousePosition.y}px`;

  return (
    <section id="dashboard" className="py-16 md:py-4 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced background with theme support */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/20 via-pink-500/15 to-blue-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
        <ModernGrid />
        <PremiumParticles />

        {/* Interactive spotlight effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-300 lg:opacity-100"
          style={{
            background: isDark
              ? `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(59, 130, 246, 0.15), transparent 40%)`
              : `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(59, 130, 246, 0.08), transparent 40%)`
          }}
        />
      </div>

      <motion.div
        className="container mx-auto relative z-10 px-4"
        style={{ scale, opacity }}
      >
        {/* Premium section header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 backdrop-blur-xl border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))'
                : 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))',
              borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'
            }}
          >
            <Crown className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wide">
              Enterprise Dashboard
            </span>
            <div className="w-px h-4 bg-gradient-to-b from-violet-500 to-blue-500"></div>
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-pulse" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
              Mission Control
            </span>
            <br />
            <span className="text-foreground">For Your Voice AI</span>
          </motion.h2>

          <motion.p
            className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Manage all your AI voice agents from one powerful interface with
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> real-time analytics</span>,
            advanced customization, and <span className="text-violet-600 dark:text-violet-400 font-semibold">enterprise-grade security</span>.
          </motion.p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-24">
          {/* Dashboard preview - takes 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* Premium tab navigation */}
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4  p-2 mb-8 bg-background/60 dark:bg-background/40 backdrop-blur-xl h-56 md:h-32 rounded-2xl border border-border/60 shadow-xl">
                {dashboardTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4  rounded-xl transition-all duration-500 text-xs font-semibold",
                      "data-[state=active]:shadow-lg data-[state=active]:text-white",
                      "text-muted-foreground hover:text-foreground"
                    )}
                    style={
                      tab.id === activeTab
                        ? {
                          background: `linear-gradient(135deg, ${tab.color}, ${tab.color}CC)`,
                          boxShadow: `0 8px 25px -5px ${tab.color}40`
                        }
                        : {}
                    }
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-all duration-300",
                        tab.id === activeTab
                          ? "bg-white/20 shadow-md"
                          : "bg-muted/50"
                      )}
                    >
                      <div className={tab.id === activeTab ? "text-white" : ""} style={tab.id !== activeTab ? { color: tab.color } : {}}>
                        {tab.icon}
                      </div>
                    </div>
                    <span className="hidden sm:block">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {dashboardTabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Premium glow effect */}
                      <div
                        className="absolute -inset-1 rounded-3xl blur-xl opacity-60"
                        style={{
                          background: `linear-gradient(135deg, ${tab.color}40, ${tab.color}20, transparent)`
                        }}
                      />

                      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border-2 border-white/10 dark:border-white/5 shadow-2xl bg-background/80 dark:bg-background/60 backdrop-blur-xl">
                        {/* Terminal overlay */}
                        <div className="absolute top-4 right-4 z-20 hidden md:block">
                          <ModernTerminal />
                        </div>

                        {/* Main dashboard image */}
                        <Image
                          src={tab.image}
                          alt={`${tab.label} dashboard view`}
                          fill
                          className="object-cover"
                        />

                        {/* Premium overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Grid pattern overlay */}
                        <div
                          className="absolute inset-0 opacity-20 dark:opacity-30"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '40px 40px'
                          }}
                        />

                        {/* Content overlay */}
                        <div className="md:absolute hidden inset-0 flex items-end p-6 md:p-8">
                          <motion.div
                            className="bg-background/90 dark:bg-background/80 backdrop-blur-xl rounded-2xl p-6 border border-border/60 max-w-lg shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div
                                className="p-3 rounded-xl shadow-lg"
                                style={{
                                  backgroundColor: `${tab.color}20`,
                                  borderColor: `${tab.color}40`,
                                  borderWidth: '1px'
                                }}
                              >
                                <div style={{ color: tab.color }}>
                                  {tab.icon}
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{tab.label}</h3>
                                <Badge
                                  className="text-xs font-semibold"
                                  style={{
                                    backgroundColor: `${tab.color}20`,
                                    color: tab.color,
                                    borderColor: `${tab.color}40`
                                  }}
                                >
                                  Live Data
                                </Badge>
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{tab.description}</p>
                          </motion.div>
                        </div>

                        {/* Live status indicator */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 dark:bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-border/60 shadow-lg">
                          <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                          </div>
                          <span className="text-xs font-medium text-foreground">Live</span>
                        </div>

                        {/* Data visualization */}
                        {/* <div className="absolute bottom-4 left-4 bg-background/80 dark:bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 hidden lg:block shadow-lg">
                          <PremiumDataViz />
                        </div> */}
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Feature cards - takes 1 column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "group relative overflow-hidden p-6 rounded-3xl border backdrop-blur-xl transition-all duration-500 cursor-default",
                  `bg-gradient-to-br ${feature.bgGradient}`,
                  feature.borderColor,
                  "hover:shadow-2xl hover:scale-105"
                )}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                whileHover={{
                  boxShadow: `0 25px 50px -12px ${feature.color}40`
                }}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div
                    className="p-3 rounded-2xl border shadow-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      borderColor: `${feature.color}40`,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={cn("text-lg font-bold mb-2", feature.textColor)}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Floating accent icon */}
                <motion.div
                  className="absolute -right-2 -bottom-2 p-3 rounded-full border backdrop-blur-sm shadow-lg"
                  style={{
                    backgroundColor: `${feature.color}30`,
                    borderColor: `${feature.color}50`,
                    color: feature.color
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 1
                  }}
                >
                  {feature.accentIcon}
                </motion.div>

                {/* Hover highlight effect */}
                {hoveredFeature === index && (
                  <motion.div
                    className="absolute inset-0 border-2 rounded-3xl pointer-events-none"
                    style={{ borderColor: `${feature.color}60` }}
                    layoutId="featureHighlight"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile preview section */}
        <div className="flex justify-center">
          <motion.div
            className="relative max-w-[320px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            {/* Premium glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-violet-600/30 rounded-[60px] blur-2xl opacity-60 animate-pulse"></div>

            {/* Orbital elements */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-blue-500 shadow-lg"
              animate={{
                x: [0, 120, 0, -120, 0],
                y: [0, 80, 160, 80, 0],
                opacity: [1, 0.8, 0.6, 0.8, 1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute w-3 h-3 rounded-full bg-violet-500 right-0 shadow-lg"
              animate={{
                x: [0, -80, 0, 80, 0],
                y: [0, 60, 120, 60, 0],
                opacity: [1, 0.7, 0.5, 0.7, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Phone mockup */}
            <div className="relative h-full -mt-2 z-10">
              <Image
                src="/phone-mockup.png"
                alt="Mobile dashboard"
                width={360}
                height={640}
                className="relative object-cover scale-[100%]  z-10"
              />

              {/* Screen content */}
              <div className="absolute top-[3.6%] left-[6%] right-[7.2%] bottom-[10.6%] overflow-hidden rounded-[24px] z-20">
                <Image
                  src="/mobile.png"
                  alt="Mobile interface"
                  fill
                  className="object-cover object-top"
                />

                {/* Scanner effect */}
                <motion.div
                  className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent blur-sm"
                  animate={{ top: ["100%", "0%", "100%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
                />

                {/* Mobile overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                {/* Grid pattern for mobile */}
                <div
                  className="absolute inset-0 opacity-20 dark:opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* Mobile status indicators */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/80 dark:bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/40 scale-75 shadow-lg">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </div>
                  <span className="text-xs font-medium text-foreground">Live</span>
                </div>

                {/* Mobile interface elements */}
                <div className="absolute bottom-20 left-3 right-3">
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-xl rounded-2xl p-4 border border-border/60 shadow-xl">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <div className="text-sm font-semibold text-foreground">Call Analytics</div>
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                          +47% conversion rate
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <div className="h-8 w-12">
                          <div className="flex items-center gap-0.5 h-full">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-0.5 rounded-full bg-gradient-to-t from-blue-600 to-violet-600"
                                animate={{
                                  height: ["20%", "80%", "40%", "90%", "30%", "70%"],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  delay: i * 0.1,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>2,847 active calls</span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone button glow */}
              <div className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg z-30"></div>
            </div>

            {/* Mobile caption */}
            <div className="relative flex justify-center mt-8">
              <motion.div
                className="inline-flex items-center gap-3 -mt-8 px-6 py-3 rounded-full backdrop-blur-xl border shadow-lg"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
                  borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'
                }}
                animate={{
                  boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-foreground">
                  Control your AI agents anywhere
                </span>
                <Radio className="h-4 w-4 text-violet-600 dark:text-violet-400 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Technology showcase section */}
        <motion.div
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Built with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Cutting-Edge Technology
              </span>
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our dashboard leverages advanced AI infrastructure and enterprise-grade security
              to deliver real-time insights and seamless user experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <BrainCircuit className="h-8 w-8" />,
                title: "AI-Powered Analytics",
                description: "Advanced machine learning algorithms provide predictive insights and performance optimization",
                color: "#3b82f6"
              },
              {
                icon: <Server className="h-8 w-8" />,
                title: "Real-time Processing",
                description: "Sub-millisecond response times with distributed computing and edge optimization",
                color: "#10b981"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Enterprise Security",
                description: "SOC 2 Type II certified with end-to-end encryption and zero-trust architecture",
                color: "#8b5cf6"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Cloud-Native Scale",
                description: "Auto-scaling infrastructure handles millions of concurrent conversations seamlessly",
                color: "#f59e0b"
              }
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                className="group relative p-6 md:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 cursor-default"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${tech.color}10, transparent)`
                    : `linear-gradient(135deg, ${tech.color}08, transparent)`,
                  borderColor: `${tech.color}30`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: `0 25px 50px -12px ${tech.color}30`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                <div className="relative z-10 text-center space-y-4">
                  <div
                    className="inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-lg"
                    style={{
                      backgroundColor: `${tech.color}15`,
                      borderColor: `${tech.color}30`,
                      borderWidth: '1px',
                      color: tech.color
                    }}
                  >
                    {tech.icon}
                  </div>

                  <h4 className="text-lg font-bold text-foreground">
                    {tech.title}
                  </h4>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* Floating indicator */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 shadow-lg"
                  style={{
                    backgroundColor: `${tech.color}20`,
                    borderColor: tech.color
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-24 md:mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="relative rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-xl border-2 shadow-2xl overflow-hidden"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${activeTabData.color}08, transparent)`
                : `linear-gradient(135deg, ${activeTabData.color}05, transparent)`,
              borderColor: `${activeTabData.color}20`
            }}
          >
            {/* Background animation */}
            <div className="absolute inset-0 opacity-30">
              <PremiumParticles />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="flex justify-center mb-8">
                <div
                  className="p-6 rounded-full border-2 shadow-2xl"
                  style={{
                    backgroundColor: `${activeTabData.color}15`,
                    borderColor: `${activeTabData.color}30`
                  }}
                >
                  <Crown className="h-12 w-12" style={{ color: activeTabData.color }} />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Ready to Experience the Future?
              </h3>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                Join thousands of companies already using our AI-powered dashboard to
                transform their voice operations and drive unprecedented growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-500 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative flex items-center gap-3">
                      <Sparkles className="h-5 w-5" />
                      <span>Start Free Trial</span>
                      <Crown className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="border-2 border-muted-foreground/30 text-foreground hover:bg-muted/50 font-bold py-4 px-8 rounded-2xl backdrop-blur-sm transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5" />
                      <span>Schedule Demo</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
