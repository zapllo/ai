'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { ProductShowcase } from "@/components/product-showcase";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { Integrations } from "@/components/integrations";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import {
  MenuIcon,
  X,
  ChevronRight,
  Globe,
  Bot,
  BarChart,
  Headphones,
  Sparkles,
  Shield,
  Zap,
  Crown,
  Phone
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { href: "#products", label: "Solutions", icon: <Bot className="h-4 w-4" /> },
    { href: "#dashboard", label: "Platform", icon: <BarChart className="h-4 w-4" /> },
    { href: "#integrations", label: "Integrations", icon: <Globe className="h-4 w-4" /> },
    { href: "/demo", label: "Demo", icon: <Phone className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Premium animated background */}
      <div className="fixed inset-0 z-0">
        {/* Sophisticated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:opacity-20 opacity-5"></div>

        {/* Premium gradient orbs */}
        <div className="absolute left-0 top-0 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-transparent blur-[120px] animate-pulse"></div>
        <div className="absolute right-0 bottom-0 -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-purple-500/30 via-pink-500/20 to-transparent blur-[120px] animate-pulse [animation-delay:2s]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-violet-500/20 blur-[100px] animate-pulse [animation-delay:4s]"></div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000" fill-opacity="0.4"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur-2xl shadow-lg shadow-black/5 dark:shadow-black/20"
          : "border-b border-transparent bg-background/5 backdrop-blur-sm"
          }`}
      >
        <div className="container mx-auto px-4 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-10 group">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative p-2 rounded-xl dark:bg bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 ">
                <Image
                  src="/zapllo.png"
                  alt="Zapllo AI"
                  width={100}
                  height={100}
                  className="h-12 dark:hidden w-auto relative z-10"
                />
                  <Image
                  src="/dark.png"
                  alt="Zapllo AI"
                  width={100}
                  height={100}
                  className="h-12 dark:block hidden w-auto relative z-10"
                />
                <div className="absolute -top-0.5 -right-0.5">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg"></span>
                  </div>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.div>

            {/* <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                Zapllo Voice
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                Enterprise AI
              </span>
            </motion.div> */}
          </Link>

          <motion.nav
            className="hidden lg:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent/50"
              >
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </motion.nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
               <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >

                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl font-medium transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/register">
                  <Button className="relative bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 font-medium text-white border-0 px-6 py-2.5 group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      <span>Start Free</span>
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </Button>
                </Link>
              </motion.div>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden bg-background/60 border border-border/60 rounded-xl backdrop-blur-sm hover:bg-accent/80 transition-all duration-300"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background/98 backdrop-blur-2xl border-border/60 p-0 w-[90vw] sm:max-w-md"
              >
                <div className="flex flex-col h-full">
                  <div className="border-b border-border/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                        <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20">
                          <Image
                            src="/zapllo.png"
                            alt="Zapllo AI"
                            width={100}
                            height={100}
                            className="h-8 w-auto"
                          />
                          <div className="absolute -top-0.5 -right-0.5">
                            <div className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600"></span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                            Zapllo Voice
                          </span>
                          <span className="text-xs text-muted-foreground">Enterprise AI</span>
                        </div>
                      </Link>
                      <SheetClose className="rounded-xl h-10 w-10 flex items-center justify-center transition-colors hover:bg-accent/80">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </SheetClose>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Revolutionary AI voice technology for enterprise businesses
                    </p>
                  </div>

                  <div className="flex-1 overflow-auto py-6 px-6">
                    <nav className="flex flex-col gap-3">
                      {navItems.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-accent/80 transition-all duration-300 group border border-transparent hover:border-border/50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 group-hover:from-blue-500/20 group-hover:to-violet-500/20 transition-colors">
                              {item.icon}
                            </div>
                            <span className="text-base font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="border-t border-border/50 p-6 space-y-4">
                    <Link
                      href="/login"
                      className="flex items-center justify-center h-12 px-6 rounded-xl border border-border/60 w-full hover:bg-accent/80 transition-all duration-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 w-full transition-all duration-300 font-medium gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Crown className="h-4 w-4" />
                      Start Free Trial
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <HeroSection />
        <ProductShowcase />
        <DashboardPreview />
        <Integrations />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
