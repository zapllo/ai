"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  PhoneCall, Users, Calendar, Target, ArrowRight, Radio,
  Shield, Zap, Sparkles, CheckCircle, BarChart2, Bot,
  BrainCircuit, Globe, Crown, TrendingUp, Clock, Award,
  MessageSquare, Headphones, Star, Play, Volume2,
  Activity, Brain, Eye, Layers, Mic, Settings, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

// Enhanced product data
const products = [
  {
    id: "sales-agent",
    name: "Revenue Accelerator",
    tagline: "AI Sales Specialist",
    category: "Sales Automation",
    icon: <Target className="h-6 w-6" />,
    description: "Transform prospects into customers with AI agents that understand buyer psychology and close deals like your top performers.",
    longDescription: "Our Revenue Accelerator combines advanced sales psychology with real-time market intelligence to guide prospects through your entire funnel. It handles objections, identifies buying signals, and adapts its approach based on prospect behavior.",
    features: [
      "Advanced lead qualification with 96% accuracy",
      "Dynamic objection handling using proven frameworks",
      "Real-time CRM integration and pipeline management",
      "Personalized follow-up sequences based on buyer intent",
      "Sales psychology and behavioral trigger integration",
      "Multi-touch campaign orchestration across channels"
    ],
    stats: [
      { label: "Revenue Increase", value: "+267%", trend: "up", icon: <TrendingUp className="h-5 w-5" />, color: "#10b981" },
      { label: "Conversion Rate", value: "73.4%", trend: "up", icon: <Target className="h-5 w-5" />, color: "#3b82f6" },
      { label: "Sales Velocity", value: "5.2x", trend: "up", icon: <Zap className="h-5 w-5" />, color: "#f59e0b" }
    ],
    image: "/demo/sales.png",
    badge: { text: "Most Popular", color: "from-orange-500 to-red-500" },
    accent: "#3b82f6",
    testimonial: {
      quote: "Increased our sales qualified leads by 340% in the first quarter",
      author: "Sarah Chen",
      role: "VP Sales, TechCorp"
    }
  },
  {
    id: "support-agent",
    name: "Customer Success Engine",
    tagline: "AI Support Specialist",
    category: "Customer Experience",
    icon: <Headphones className="h-6 w-6" />,
    description: "Deliver world-class 24/7 customer support with AI agents that resolve complex issues and build lasting customer relationships.",
    longDescription: "The Customer Success Engine combines deep product knowledge with emotional intelligence to provide personalized support experiences. It learns from every interaction to continuously improve resolution quality.",
    features: [
      "Instant resolution of 91% of customer inquiries",
      "Multi-channel support across voice, chat, and email",
      "Advanced sentiment analysis and emotion recognition",
      "Comprehensive knowledge base with auto-updates",
      "Seamless escalation to human agents when needed",
      "Proactive outreach based on usage patterns"
    ],
    stats: [
      { label: "Resolution Rate", value: "91%", trend: "up", icon: <CheckCircle className="h-5 w-5" />, color: "#10b981" },
      { label: "Response Time", value: "<2.1s", trend: "down", icon: <Clock className="h-5 w-5" />, color: "#f59e0b" },
      { label: "CSAT Score", value: "4.9/5", trend: "up", icon: <Star className="h-5 w-5" />, color: "#8b5cf6" }
    ],
    image: "/demo/support.png",
    badge: { text: "Enterprise Grade", color: "from-purple-500 to-violet-600" },
    accent: "#8b5cf6",
    testimonial: {
      quote: "Our customer satisfaction scores improved by 47% while reducing support costs",
      author: "Marcus Johnson",
      role: "Head of Support, ServiceFirst"
    }
  },
  {
    id: "booking-agent",
    name: "Appointment Optimizer",
    tagline: "AI Scheduling Specialist",
    category: "Productivity",
    icon: <Calendar className="h-6 w-6" />,
    description: "Maximize calendar efficiency with AI agents that handle complex scheduling, eliminate no-shows, and optimize your team's time.",
    longDescription: "The Appointment Optimizer uses predictive analytics to prevent no-shows, intelligent scheduling to maximize productivity, and automated preparation to ensure every meeting is valuable.",
    features: [
      "Smart calendar optimization with conflict resolution",
      "Predictive no-show prevention (89% accuracy)",
      "Automated pre-meeting information collection",
      "Multi-timezone scheduling with availability sync",
      "Integration with 50+ calendar and CRM systems",
      "Dynamic rescheduling with preference learning"
    ],
    stats: [
      { label: "Schedule Efficiency", value: "+178%", trend: "up", icon: <Calendar className="h-5 w-5" />, color: "#10b981" },
      { label: "No-Show Rate", value: "-82%", trend: "down", icon: <Shield className="h-5 w-5" />, color: "#f59e0b" },
      { label: "Booking Speed", value: "3.7x", trend: "up", icon: <Zap className="h-5 w-5" />, color: "#06b6d4" }
    ],
    image: "/demo/appointment.png",
    badge: { text: "Productivity Boost", color: "from-emerald-500 to-teal-600" },
    accent: "#10b981",
    testimonial: {
      quote: "Eliminated scheduling conflicts and increased our team productivity by 156%",
      author: "Elena Rodriguez",
      role: "Operations Manager, ConsultPro"
    }
  },
  {
    id: "outreach-agent",
    name: "Growth Engine Pro",
    tagline: "AI Outreach Specialist",
    category: "Lead Generation",
    icon: <Users className="h-6 w-6" />,
    description: "Scale your outreach with AI agents that build genuine relationships and convert cold prospects into warm opportunities.",
    longDescription: "Growth Engine Pro transforms cold outreach by leveraging deep prospect research, personalized messaging, and relationship-building techniques that feel authentic and drive meaningful conversations.",
    features: [
      "Hyper-personalized outreach at enterprise scale",
      "Multi-channel campaign orchestration and optimization",
      "Real-time conversation adaptation based on responses",
      "Advanced prospect scoring with buying intent signals",
      "Seamless handoff to sales with context preservation",
      "A/B testing and continuous message optimization"
    ],
    stats: [
      { label: "Outreach Volume", value: "18x", trend: "up", icon: <Users className="h-5 w-5" />, color: "#f43f5e" },
      { label: "Response Rate", value: "+420%", trend: "up", icon: <MessageSquare className="h-5 w-5" />, color: "#10b981" },
      { label: "Cost Per Lead", value: "-86%", trend: "down", icon: <BarChart2 className="h-5 w-5" />, color: "#f59e0b" }
    ],
    image: "/demo/analytics.png",
    badge: { text: "Scale Master", color: "from-rose-500 to-pink-600" },
    accent: "#f43f5e",
    testimonial: {
      quote: "Generated 2,400+ qualified leads in 90 days with 67% lower acquisition costs",
      author: "David Park",
      role: "Growth Director, ScaleUp Inc"
    }
  }
];

// Premium animated background particles
const AnimatedParticles = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-sm"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -1200], // ✅ Fixed value
            opacity: [0, 0.8, 0.4, 0],
            scale: [0.5, 1.2, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Enhanced feature list component
const FeatureList = ({ features, color }: { features: string[], color: string }) => (
  <div className="space-y-3">
    {features.map((feature, index) => (
      <motion.div
        key={index}
        className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-800/60 border border-transparent hover:border-white/60 dark:hover:border-gray-700/60 backdrop-blur-sm cursor-default"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ x: 8, scale: 1.02 }}
      >
        <div
          className="flex-shrink-0 h-8 w-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${color}15`,
            borderColor: `${color}50`,
          }}
        >
          <CheckCircle
            style={{ color: color }}
            className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
          />
        </div>
        <span className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
          {feature}
        </span>
      </motion.div>
    ))}
  </div>
);

// Premium stat cards
const StatCard = ({ stat, index, delay = 0 }: {
  stat: { label: string, value: string, trend: string, icon: React.ReactNode, color: string },
  index: number,
  delay?: number
}) => (
  <motion.div
    className="group relative overflow-hidden backdrop-blur-xl border-2 rounded-3xl p-6 text-center transition-all duration-500 hover:shadow-2xl cursor-default"
    style={{
      background: `linear-gradient(135deg, ${stat.color}12, transparent)`,
      borderColor: `${stat.color}30`,
    }}
    whileHover={{ y: -8, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay + index * 0.1, duration: 0.6 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      <div className="flex justify-center items-center gap-3 mb-4">
        <div
          className="p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
        >
          {stat.icon}
        </div>
      </div>
      <p className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: stat.color }}>
        {stat.value}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
        {stat.label}
      </p>
    </div>
  </motion.div>
);

// Image preview with enhanced styling
const ImagePreview = ({ product }: { product: typeof products[0] }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Premium glow effect */}
      <div
        className="absolute -inset-6 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, ${product.accent}40, ${product.accent}20, transparent)`
        }}
      ></div>

      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl">
        {/* Image content */}
        <div className="absolute inset-0">
          <Image
            src={product.image}
            alt={`${product.name} Dashboard`}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20">
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h60v60H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
        </div>

        {/* Product badge */}
        {product.badge && (
          <motion.div
            className={cn(
              "absolute top-6 right-6 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20",
              `bg-gradient-to-r ${product.badge.color}`
            )}
            initial={{ opacity: 0, scale: 0, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              {product.badge.text}
            </div>
          </motion.div>
        )}

        {/* Live status indicator */}
        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md text-sm px-4 py-3 rounded-2xl text-white border border-white/10 flex items-center gap-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="font-medium">Active Agent</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <Activity className="h-4 w-4 text-green-400" />
        </div>

        {/* Quick action buttons */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          <Link href={`/products/${product.id}`}>
            <Button
              size="sm"
              className="backdrop-blur-md text-white border border-white/30 rounded-xl hover:scale-105 transition-transform"
              style={{
                background: `linear-gradient(135deg, ${product.accent}80, ${product.accent}60)`
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Customer testimonial card
const TestimonialCard = ({ testimonial, delay = 0 }: {
  testimonial: typeof products[0]['testimonial'],
  delay?: number
}) => (
  <motion.div
    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 rounded-3xl p-8 shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="flex items-center gap-2 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
      ))}
    </div>

    <blockquote className="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed font-medium">
      "{testimonial.quote}"
    </blockquote>

    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
        {testimonial.author.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.author}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
);

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("sales-agent");
  const activeProduct = products.find(p => p.id === activeTab) || products[0];
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="products"
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Premium background with parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y }}
          className="absolute left-0 top-1/4 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-violet-500/8 to-transparent rounded-full blur-[150px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute right-0 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-l from-purple-500/10 via-pink-500/8 to-transparent rounded-full blur-[120px]"
        />

        {/* Animated particles */}
        <AnimatedParticles color={activeProduct.accent} />

        {/* Grid pattern with mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] dark:opacity-10 opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Premium section header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Category badge */}
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full mb-8 backdrop-blur-xl border-2 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))',
              borderColor: 'rgba(59, 130, 246, 0.25)'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 uppercase tracking-wide">
                Enterprise AI Solutions
              </span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-blue-500 to-violet-500"></div>
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                Choose Your Specialist
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
              AI Agents That
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Actually Work</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Deploy specialized AI voice agents that deliver measurable results.
            Each agent is trained for specific use cases with <span className="text-blue-600 dark:text-blue-400 font-semibold">enterprise-grade performance</span> and <span className="text-violet-600 dark:text-violet-400 font-semibold">human-like intelligence</span>.
          </motion.p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Fixed tab navigation */}
          <motion.div
            className="relative flex justify-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <TabsList className="hidden md:inline-flex h-auto p-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border-2 border-white/20 dark:border-gray-700/20 shadow-2xl">
              {products.map((product) => (
                <TabsTrigger
                  key={product.id}
                  value={product.id}
                  className={cn(
                    "flex flex-col items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 min-w-[140px] md:min-w-[160px] data-[state=active]:shadow-lg",
                    "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                  style={
                    product.id === activeTab
                      ? {
                        background: `linear-gradient(135deg, ${product.accent}, ${product.accent}DD)`,
                        color: 'white'
                      }
                      : {}
                  }
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl transition-all duration-300",
                      product.id === activeTab
                        ? "bg-white/20 shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    <div className={product.id === activeTab ? "text-white" : ""} style={product.id !== activeTab ? { color: product.accent } : {}}>
                      {product.icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">{product.name}</div>
                    <div className="text-xs opacity-75 mt-1">{product.tagline}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Product content */}
          <AnimatePresence mode="wait">
            {products.map((product) => (
              <TabsContent key={product.id} value={product.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                  className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start max-w-7xl mx-auto"
                >
                  {/* Left content */}
                  <div className="space-y-10">
                    {/* Product header */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {/* Category and badge */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <div
                          className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl border-2 backdrop-blur-sm text-sm font-bold"
                          style={{
                            backgroundColor: `${product.accent}12`,
                            borderColor: `${product.accent}30`,
                            color: product.accent
                          }}
                        >
                          {product.icon}
                          <span>{product.category}</span>
                        </div>

                        {product.badge && (
                          <Badge
                            className={cn(
                              "px-4 py-2 text-white font-bold border-0 shadow-lg",
                              `bg-gradient-to-r ${product.badge.color}`
                            )}
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            {product.badge.text}
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        Meet Your{" "}
                        <span
                          className="bg-clip-text text-transparent"
                          style={{ backgroundImage: `linear-gradient(135deg, ${product.accent}, ${product.accent}AA)` }}
                        >
                          {product.name}
                        </span>
                      </h3>

                      {/* Description */}
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Long description */}
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        {product.longDescription}
                      </p>
                    </motion.div>

                    {/* Features list */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" style={{ color: product.accent }} />
                        Key Capabilities
                      </h4>
                      <FeatureList features={product.features} color={product.accent} />
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      {product.stats.map((stat, index) => (
                        <StatCard
                          key={index}
                          stat={stat}
                          index={index}
                          delay={0.8}
                        />
                      ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <Link href={`/register`}>
                        <Button
                          size="lg"
                          className="group relative overflow-hidden font-bold py-6 px-8 rounded-2xl text-white border-0 shadow-2xl transition-all duration-500 hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${product.accent}, ${product.accent}CC)`,
                            boxShadow: `0 10px 30px -5px ${product.accent}40`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          <div className="relative flex items-center gap-3">
                            <Zap className="h-5 w-5 transition-transform group-hover:rotate-12" />
                            <span>Deploy {product.name}</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Button>
                      </Link>

                      <Link href={`/demo`}>
                        <Button
                          variant="outline"
                          size="lg"
                          className="group border-2 font-bold py-6 px-8 rounded-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm"
                          style={{
                            borderColor: `${product.accent}40`,
                            color: product.accent,
                            background: `${product.accent}05`
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                            <span>Watch Demo</span>
                            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Right side - Image Preview */}
                  <div className="relative">
                    <ImagePreview product={product} />
                  </div>
                </motion.div>

                {/* Customer testimonial section */}
                {/* <motion.div
                  className="mt-24 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="text-center mb-12">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      What Our Customers Say
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Real results from companies using {product.name}
                    </p>
                  </div>

                  <TestimonialCard testimonial={product.testimonial} delay={1.4} />
                </motion.div> */}
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div
            className="relative rounded-3xl p-12 lg:p-16 backdrop-blur-xl border-2 shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${activeProduct.accent}08, transparent)`,
              borderColor: `${activeProduct.accent}20`
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              <AnimatedParticles color={activeProduct.accent} />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="flex justify-center mb-8">
                <div
                  className="p-6 rounded-full border-2 shadow-lg"
                  style={{
                    backgroundColor: `${activeProduct.accent}15`,
                    borderColor: `${activeProduct.accent}30`
                  }}
                >
                  <Sparkles className="h-12 w-12" style={{ color: activeProduct.accent }} />
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Transform Your Business?
              </h3>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                Join 500+ companies using our AI voice agents to automate conversations,
                increase conversions, and scale their operations without limits.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative flex items-center gap-3">
                      <Crown className="h-6 w-6" />
                      <span>Start Free Trial</span>
                      <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    </div>
                  </Button>
                </Link>

                <Link href="https://zapllo.com/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold py-6 px-10 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5" />
                      <span>Talk to Expert</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technology showcase */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Powered by Advanced{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                AI Technology
              </span>
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI agents leverage cutting-edge natural language processing,
              emotional intelligence, and machine learning to deliver human-like conversations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Neural Language Models",
                description: "Advanced GPT-4 based language understanding with context awareness",
                color: "#3b82f6"
              },
              {
                icon: <Volume2 className="h-8 w-8" />,
                title: "Natural Voice Synthesis",
                description: "Lifelike voice generation with emotion and accent adaptation",
                color: "#10b981"
              },
              {
                icon: <Activity className="h-8 w-8" />,
                title: "Real-time Processing",
                description: "Sub-second response times with continuous conversation flow",
                color: "#f59e0b"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Enterprise Security",
                description: "SOC 2 compliant with end-to-end encryption and data protection",
                color: "#8b5cf6"
              }
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                className="group relative p-8 rounded-3xl backdrop-blur-xl border-2 transition-all duration-500 hover:scale-105 cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}08, transparent)`,
                  borderColor: `${tech.color}20`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                <div className="relative z-10 text-center space-y-4">
                  <div
                    className="inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${tech.color}15`,
                      color: tech.color
                    }}
                  >
                    {tech.icon}
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {tech.title}
                  </h4>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
