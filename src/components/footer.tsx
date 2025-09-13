"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Github, Twitter, Linkedin, Youtube, Mail, MapPin, Phone,
  ArrowRight, Sparkles, Crown, Globe, Heart, Send
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// Clean floating particles for footer
const FooterParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full blur-sm"
          style={{
            background: isDark ? '#60a5fa' : '#3b82f6',
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50],
            opacity: [0, 0.8, 0],
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

// Newsletter subscription component
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-bold text-foreground">Stay Updated</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Get the latest updates on AI voice technology and product releases.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border-border/60 bg-background/60 backdrop-blur-sm"
            required
          />
          <Button
            type="submit"
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl px-4 transition-all duration-300"
            disabled={isSubscribed}
          >
            {isSubscribed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Thanks for subscribing!
          </motion.div>
        )}
      </form>
    </div>
  );
};

export function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/#features" },
      // { name: "Pricing", href: "/pricing" },
      // { name: "API Docs", href: "/docs" },
      { name: "Integrations", href: "/#integrations" },
      { name: "Use Cases", href: "/use-cases" }
    ],
    company: [
      { name: "About Us", href: "https://zapllo.com/contact" },
      { name: "Blog", href: "https://www.zapllo.com/blog" },
      { name: "Careers", href: "https://zapllo.notion.site/Work-at-Zapllo-9c970622e3d142919bdca4c42ee38aab?pvs=4" },
      { name: "Press Kit", href: "https://www.zapllo.com/pressRelease" },
      // { name: "Contact", href: "/contact" }
    ],
    resources: [
      // { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "https://www.zapllo.com/contact" },
      // { name: "Community", href: "/community" },
      { name: "Status Page", href: "/status" },
      // { name: "Changelog", href: "/changelog" }
    ],
    legal: [
      { name: "Privacy Policy", href: "https://zapllo.com/privacypolicy" },
      { name: "Terms of Service", href: "https://zapllo.com/terms" },
      // { name: "Security", href: "/security" },
      // { name: "Cookie Policy", href: "/cookies" },
      // { name: "GDPR", href: "/gdpr" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/zapllo" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/zapllo" },
    { name: "GitHub", icon: Github, href: "https://github.com/zapllo" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@zapllo" }
  ];

  return (
    <footer className="relative overflow-hidden border-t  border-border/60 bg-background/80 dark:bg-background/60 backdrop-blur-xl">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[80px]" />
        <FooterParticles />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Main footer content */}
        <div className="py-16 md:py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="inline-flex items-center gap-3 group">
                  <div className="relative dark:bg-white rounded p-2">
                    <Image
                      src="/zapllo.png"
                      alt="Zapllo Voice"
                      width={100}
                      height={100}
                      className="h-12 w-auto transition-transform group-hover:scale-105"
                    />
                    <div className="absolute -top-1 -right-1">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600"></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                      Zapllo Voice
                    </span> */}
                    <Badge className="ml-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  </div>
                </Link>

                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Transforming business communications with enterprise-grade AI voice agents
                  that deliver human-like conversations and measurable results.
                </p>

                {/* Key stats */}
                <div className="flex items-center gap-6 pt-4">
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
                </div>
              </motion.div>
            </div>

            {/* Links sections */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Product
                </h3>
                <div className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Company
                </h3>
                <div className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Newsletter section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <NewsletterSignup />
            </motion.div>
          </div>
        </div>

        {/* Additional links section */}
        <div className="py-8 border-t border-border/60">
          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-foreground text-sm">Resources</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.resources.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-foreground text-sm">Legal</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-border/60"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>© {currentYear} Zapllo Voice. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                <span>in India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="group relative p-2 rounded-xl bg-background/60 dark:bg-background/40 border border-border/60 hover:border-blue-500/40 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />

                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {social.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
