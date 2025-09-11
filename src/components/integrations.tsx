"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Puzzle, ArrowRight, Code, Zap, Layers, Sparkles,
  CheckCircle, Globe
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// Clean integration data
const integrations = [
  { name: "Salesforce", logo: "/logos/salesforce.webp", category: "crm" },
  { name: "HubSpot", logo: "/logos/hubspot.png", category: "crm" },
  { name: "Zendesk", logo: "/logos/zendesk.png", category: "support" },
  { name: "Intercom", logo: "/logos/intercom.png", category: "support" },
  { name: "Shopify", logo: "/logos/shopify.png", category: "ecommerce" },
  { name: "Zoom", logo: "/logos/zoom.png", category: "communication" },
  { name: "Google Calendar", logo: "/logos/google.png", category: "productivity" },
  { name: "Microsoft Teams", logo: "/logos/teams.png", category: "communication" },
  { name: "Slack", logo: "/logos/slack.png", category: "communication" },
  { name: "Zapier", logo: "/logos/zapier.png", category: "automation" },
  { name: "Twilio", logo: "/logos/twilio.png", category: "communication" },
  { name: "Pipedrive", logo: "/logos/pipedrive.png", category: "crm" }
];

// Simple floating particles
const CleanParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full blur-sm"
          style={{
            background: isDark ? '#60a5fa' : '#3b82f6',
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -800], // ✅ Fixed value
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export function Integrations() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const xLeft = useTransform(scrollYProgress, [0.5, 0.7], [-50, 0]);
  const xRight = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      id="integrations"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Clean background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[100px]" />
        <CleanParticles />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            style={{ opacity, x: xLeft }}
            className="space-y-8"
          >
            {/* Clean badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-xl border shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                background: theme === 'dark'
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgba(59, 130, 246, 0.05)',
                borderColor: theme === 'dark'
                  ? 'rgba(59, 130, 246, 0.3)'
                  : 'rgba(59, 130, 246, 0.2)'
              }}
            >
              <Puzzle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                200+ Integrations
              </span>
            </motion.div>

            {/* Clean heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-foreground">Connect With Your</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Favorite Tools
                </span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Seamlessly integrate your AI voice agents with your existing workflow.
                No-code setup and real-time synchronization included.
              </p>
            </motion.div>

            {/* Clean feature cards */}
            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="group p-6 rounded-2xl backdrop-blur-xl border border-border/60 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">No-Code Setup</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connect your tools without writing a single line of code
                </p>
              </div>

              <div className="group p-6 rounded-2xl backdrop-blur-xl border border-border/60 hover:border-violet-500/30 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Real-time Sync</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Data flows seamlessly between all your platforms
                </p>
              </div>
            </motion.div>

            {/* Clean CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-2 border-muted-foreground/30 hover:bg-muted/50 rounded-2xl px-6 py-6 font-semibold transition-all duration-300"
                >
                  View All Integrations
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Clean integration grid */}
          <motion.div
            style={{ opacity, x: xRight }}
            className="relative"
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 relative">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  className="group flex items-center justify-center h-20 bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-border/60 rounded-2xl p-4 hover:border-blue-500/30 hover:bg-background/90 dark:hover:bg-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={integration.logo}
                    alt={integration.name}
                    width={32}
                    height={32}
                    className=" object-contain h-full w-full  group-hover:opacity-100 transition-opacity  dark:brightness-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Clean custom integration section */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="grid lg:grid-cols-2 gap-12 items-center p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-border/60 shadow-xl"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(139, 92, 246, 0.02))'
            }}
          >
            {/* Left content */}
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Need a Custom Integration?
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Don't see your tool? We build custom integrations for enterprise customers.
                  Connect with any platform using our flexible API.
                </p>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl px-8 py-6 font-semibold shadow-lg transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Request Integration
              </Button>
            </div>

            {/* Right side - Clean code block */}
            <div className="bg-gray-900 dark:bg-black/60 rounded-2xl p-6 font-mono text-sm border border-border/60 backdrop-blur-xl overflow-hidden">
              <div className="flex gap-2 mb-4 pb-3 border-b border-border/40">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-xs text-muted-foreground">API Integration</span>
              </div>
              <pre className="text-gray-300 leading-relaxed">
                <code>
                  <span className="text-blue-400">POST</span> <span className="text-gray-300">/api/integrations</span><br />
                  <br />
                  <span className="text-purple-400">{`{`}</span><br />
                  <span className="text-gray-300">{`  `}</span><span className="text-blue-300">"agent_id"</span><span className="text-gray-300">: </span><span className="text-green-300">"sales_agent"</span>,<br />
                  <span className="text-gray-300">{`  `}</span><span className="text-blue-300">"webhook"</span><span className="text-gray-300">: </span><span className="text-green-300">"https://api.com"</span>,<br />
                  <span className="text-gray-300">{`  `}</span><span className="text-blue-300">"sync"</span><span className="text-gray-300">: </span><span className="text-orange-400">true</span><br />
                  <span className="text-purple-400">{`}`}</span>
                </code>
              </pre>
              <motion.div
                className="inline-block w-2 h-4 bg-blue-400 ml-1 mt-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Simple bottom CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Ready to Connect Everything?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start integrating your tools in minutes. No setup fees, unlimited connections.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 text-white font-bold py-6 px-10 rounded-2xl shadow-xl transition-all duration-300"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-muted-foreground/30 hover:bg-muted/50 font-bold py-6 px-10 rounded-2xl transition-all duration-300"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
