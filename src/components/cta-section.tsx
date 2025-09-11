"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall, ArrowRight, CheckCircle2, Sparkles, Crown,
  Zap, Users, TrendingUp, Clock, Star, Play
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

// Clean floating particles
const CleanParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full blur-sm"
          style={{
            background: isDark
              ? 'linear-gradient(45deg, #60a5fa, #a78bfa)'
              : 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Floating stats component
const FloatingStats = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute top-6 right-6 bg-background/90 dark:bg-background/80 backdrop-blur-xl border border-border/60 p-4 rounded-2xl shadow-xl max-w-[200px]"
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
        <TrendingUp className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="text-sm font-bold text-foreground">+347%</div>
        <div className="text-xs text-muted-foreground">Conversion Rate</div>
      </div>
    </div>
    <div className="text-xs text-muted-foreground">
      Last 30 days performance boost
    </div>
  </motion.div>
);

// Activity indicator component
const ActivityIndicator = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute bottom-6 left-6 bg-background/90 dark:bg-background/80 backdrop-blur-xl border border-border/60 p-4 rounded-2xl shadow-xl max-w-[200px]"
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </div>
      <span className="text-sm font-semibold text-foreground">Live Agent Active</span>
    </div>
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground">Currently handling:</div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Active calls</span>
        <span className="font-bold text-blue-600 dark:text-blue-400">247</span>
      </div>
    </div>
  </motion.div>
);

export function CTASection() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  const benefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      text: "14-day free trial, no credit card required",
      color: "#3b82f6"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Set up in minutes, not days or weeks",
      color: "#10b981"
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Cancel anytime with no long-term contracts",
      color: "#8b5cf6"
    }
  ];

  return (
    <section
      className="py- relative overflow-hidden"
      ref={containerRef}
    >
      {/* Clean background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/20 via-purple-500/15 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/20 via-indigo-500/15 to-transparent rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <CleanParticles />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] dark:opacity-10 opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      <motion.div
        className="container mx-auto relative z-10 px-4"
        style={{ opacity, y }}
      >
        <div
          className="rounded-3xl lg:rounded-[2.5rem] overflow-hidden backdrop-blur-xl border border-border/60 shadow-2xl"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(139, 92, 246, 0.02))'
          }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                {/* Premium badge */}
                <div className="flex items-center gap-4">
                  <Badge
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold"
                  >
                    <Crown className="h-4 w-4" />
                    Setup in minutes
                  </Badge>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-muted-foreground">
                      4.9/5 rating
                    </span>
                  </div>
                </div>

                {/* Main heading */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    <span className="text-foreground">Experience the Future of</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                      Voice AI
                    </span>
                  </h2>

                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                    Join thousands of forward-thinking companies using our AI voice agents to
                    <span className="text-blue-600 dark:text-blue-400 font-semibold"> scale operations</span> and
                    <span className="text-violet-600 dark:text-violet-400 font-semibold"> deliver exceptional experiences</span>.
                  </p>
                </div>

                {/* Benefits list */}
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${benefit.color}15`,
                          borderColor: `${benefit.color}40`,
                          color: benefit.color
                        }}
                      >
                        {benefit.icon}
                      </div>
                      <span className="text-foreground font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:scale-105"
                    >
                      <Sparkles className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
                      Start Free Trial
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  {/* <Link href="/demo">
                    <Button
                      variant="outline"
                      size="lg"
                      className="group border-2 border-muted-foreground/30 hover:bg-muted/50 font-bold py-6 px-10 rounded-2xl backdrop-blur-sm transition-all duration-500"
                    >
                      <Play className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                      Watch Demo
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link> */}
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className="flex items-center gap-6 pt-6 border-t border-border/60"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                    <div className="text-xs text-muted-foreground">Companies</div>
                  </div>
                  <div className="w-px h-8 bg-border/60" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">99.9%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="w-px h-8 bg-border/60" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">24/7</div>
                    <div className="text-xs text-muted-foreground">Support</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Enhanced image preview */}
            <motion.div
              className="relative m-6 lg:m-8 rounded-2xl lg:rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[600px]"
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Premium glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-violet-500/30 rounded-2xl lg:rounded-3xl blur-lg opacity-60" />

              {/* Main image */}
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-border/60 shadow-2xl backdrop-blur-xl">
                <Image
                  src="/demo/insights.png"
                  alt="AI Voice Agent Dashboard"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

                {/* Floating stats */}
                <FloatingStats delay={0.4} />
                <ActivityIndicator delay={0.6} />

                {/* Live indicator */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-background/90 dark:bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/60 shadow-lg">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </div>
                  <span className="text-xs font-medium text-foreground">Live Demo</span>
                </div>

                {/* Interactive play button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-xl border border-border/60 flex items-center justify-center shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                      <Play className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400 ml-1" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom social proof */}

      </motion.div>
    </section>
  );
}
