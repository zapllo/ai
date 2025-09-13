'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  CheckCircle, AlertTriangle, XCircle, Clock, Activity,
  Server, Globe, Zap, Shield, Menu, X, Bot, BarChart,
  Phone, Crown, Sparkles, TrendingUp
} from "lucide-react";

const systemStatus = {
  overall: "operational", // operational, degraded, outage
  services: [
    {
      name: "AI Voice Processing",
      status: "operational",
      uptime: "99.98%",
      description: "Core AI voice processing and conversation handling"
    },
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.99%",
      description: "REST API and webhook services"
    },
    {
      name: "Dashboard & Analytics",
      status: "operational",
      uptime: "99.97%",
      description: "Web dashboard and real-time analytics"
    },
    {
      name: "Integrations Hub",
      status: "operational",
      uptime: "99.95%",
      description: "Third-party integrations and CRM sync"
    },
    {
      name: "Voice Training Platform",
      status: "operational",
      uptime: "99.96%",
      description: "Custom voice model training and deployment"
    }
  ],
  incidents: [
    {
      id: "INC-2024-001",
      title: "Brief API Latency Increase",
      status: "resolved",
      severity: "minor",
      date: "2024-01-15",
      time: "14:30 UTC",
      description: "API response times increased by 200ms for 12 minutes",
      resolution: "Auto-scaling resolved the issue by provisioning additional resources"
    },
    {
      id: "INC-2024-002",
      title: "Scheduled Maintenance Complete",
      status: "resolved",
      severity: "maintenance",
      date: "2024-01-10",
      time: "02:00 UTC",
      description: "Scheduled infrastructure upgrades completed successfully",
      resolution: "All systems back to full operational capacity"
    }
  ],
  metrics: {
    uptime: "99.98%",
    responseTime: "145ms",
    errorRate: "0.02%",
    throughput: "2.4M requests/hour"
  }
};

const StatusIndicator = ({ status }: { status: string }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case "outage":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded Performance";
      case "outage":
        return "Service Outage";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "operational":
        return "text-green-600 dark:text-green-400";
      case "degraded":
        return "text-yellow-600 dark:text-yellow-400";
      case "outage":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <span className={`font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    </div>
  );
};

export default function StatusPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/#products", label: "Solutions", icon: <Bot className="h-4 w-4" /> },
    { href: "/#dashboard", label: "Platform", icon: <BarChart className="h-4 w-4" /> },
    { href: "/help", label: "Help", icon: <Activity className="h-4 w-4" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:opacity-20 opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-500/20 via-blue-500/15 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 via-green-500/15 to-transparent rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "border-b border-border/60 bg-background/95 backdrop-blur-2xl shadow-lg" : "border-b border-transparent bg-background/5 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-10">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 backdrop-blur-sm">
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
            </div>
            {/* <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                Zapllo Voice
              </span>
              <span className="text-xs text-muted-foreground font-medium">Enterprise AI</span>
            </div> */}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent/50">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 rounded-xl shadow-lg text-white border-0 px-6 py-2.5">
                  <Crown className="h-4 w-4 mr-2" />
                  Start Free
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[90vw] sm:max-w-md">
                <div className="flex flex-col h-full">
                  <div className="border-b p-6">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <span className="text-lg font-bold">Zapllo Voice</span>
                    </Link>
                  </div>
                  <nav className="flex-1 py-6 px-6">
                    {navItems.map((item, i) => (
                      <Link key={i} href={item.href} className="flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-accent/80 transition-all" onClick={() => setMobileMenuOpen(false)}>
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-green-700 dark:text-green-300 rounded-full font-semibold mb-8">
                <Activity className="h-4 w-4" />
                System Status
                <TrendingUp className="h-4 w-4" />
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">All Systems</span><br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-violet-600 dark:from-green-400 dark:via-blue-400 dark:to-violet-400">
                  Operational
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Real-time status and performance metrics for all Zapllo Voice services.
                We're committed to 99.99% uptime for your business-critical AI voice agents.
              </p>
            </motion.div>

            {/* Overall Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-8 bg-background/80 backdrop-blur-xl border-border/60 shadow-2xl mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Current Status</h2>
                    <StatusIndicator status={systemStatus.overall} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {systemStatus.metrics.uptime}
                    </div>
                    <div className="text-sm text-muted-foreground">30-day uptime</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Service Status */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                  <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  Service Status
                </h2>
                <div className="space-y-4">
                  {systemStatus.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/60 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="text-lg font-bold">{service.name}</h3>
                              <StatusIndicator status={service.status} />
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {service.description}
                            </p>
                          </div>
                          <div className="text-right ml-6">
                            <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                              {service.uptime}
                            </div>
                            <div className="text-xs text-muted-foreground">Uptime</div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                  Performance Metrics
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/60 text-center">
                    <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {systemStatus.metrics.uptime}
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Uptime</div>
                  </Card>

                  <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/60 text-center">
                    <Zap className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {systemStatus.metrics.responseTime}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  </Card>

                  <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/60 text-center">
                    <Shield className="h-12 w-12 text-violet-600 dark:text-violet-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                      {systemStatus.metrics.errorRate}
                    </div>
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                  </Card>

                  <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/60 text-center">
                    <Activity className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {systemStatus.metrics.throughput}
                    </div>
                    <div className="text-sm text-muted-foreground">Throughput</div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        {/* <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                  <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  Recent Incidents
                </h2>
                <div className="space-y-6">
                  {systemStatus.incidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/60">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold">{incident.title}</h3>
                              <Badge
                                className={`text-xs ${
                                  incident.status === 'resolved'
                                    ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30'
                                    : 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30'
                                }`}
                              >
                                {incident.status}
                              </Badge>
                              <Badge
                                className={`text-xs ${
                                  incident.severity === 'minor'
                                    ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30'
                                    : incident.severity === 'maintenance'
                                    ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30'
                                    : 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30'
                                }`}
                              >
                                {incident.severity}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">
                              {incident.description}
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              <strong>Resolution:</strong> {incident.resolution}
                            </p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground ml-6">
                            <div>{incident.date}</div>
                            <div>{incident.time}</div>
                            <div className="text-xs mt-1">ID: {incident.id}</div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Subscribe to Updates */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 backdrop-blur-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Stay Updated on System Status
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Subscribe to get notifications about planned maintenance, incidents, and service updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl shadow-blue-500/30">
                    <Globe className="h-5 w-5 mr-2" />
                    Subscribe to Updates
                    <Sparkles className="h-5 w-5 ml-2" />
                  </Button>
                  <Link href="https://zapllo.com/contact">
                    <Button variant="outline" size="lg" className="font-bold py-6 px-10 rounded-2xl border-2">
                      <Phone className="h-5 w-5 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
