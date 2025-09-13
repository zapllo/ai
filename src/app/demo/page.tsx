'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/footer";
import {
  Play, Phone, MessageSquare, Calendar, Users, ArrowRight,
  Sparkles, Crown, Star, TrendingUp, Clock, CheckCircle,
  Bot, Activity, Mic, Volume2, BarChart, Menu, X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const demoScenarios = [
  {
    id: "sales",
    title: "Sales Agent",
    description: "AI agent that converts prospects into customers",
    image: "/demo/sales.png",
    metrics: {
      "Conversion Rate": "94%",
      "Response Time": "0.8s",
      "Satisfaction": "4.9/5"
    },
    features: [
      "Objection handling with proven frameworks",
      "Lead qualification and scoring",
      "Appointment scheduling automation",
      "Real-time CRM integration"
    ],
    color: "#3b82f6"
  },
  {
    id: "support",
    title: "Support Agent",
    description: "AI agent that resolves customer issues instantly",
    image: "/demo/support.png",
    metrics: {
      "Resolution Rate": "91%",
      "Avg Handle Time": "2.1min",
      "CSAT Score": "4.8/5"
    },
    features: [
      "Instant issue diagnosis and resolution",
      "Intelligent solution recommendations",
      "Seamless escalation to human agents",
      "Automated follow-up sequences"
    ],
    color: "#10b981"
  },
  {
    id: "booking",
    title: "Booking Agent",
    description: "AI agent that manages appointments seamlessly",
    image: "/demo/appointment.png",
    metrics: {
      "Booking Success": "97%",
      "No-Show Rate": "3%",
      "Efficiency": "+178%"
    },
    features: [
      "Smart calendar synchronization",
      "Availability checking across time zones",
      "Automated confirmation handling",
      "Intelligent rescheduling management"
    ],
    color: "#8b5cf6"
  }
];

// Interactive Demo Component
const InteractiveDemo = ({ scenario }: { scenario: typeof demoScenarios[0] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    "Incoming call detected...",
    "AI agent analyzing request...",
    "Processing customer information...",
    "Providing personalized response...",
    "Action completed successfully!"
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, steps.length]);

  const handlePlayDemo = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
        <Image
          src={scenario.image}
          alt={`${scenario.title} Dashboard`}
          fill
          className="object-cover opacity-80"
        />

        {/* Interactive Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          {!isPlaying ? (
            <div className="text-center space-y-4">
              <Button
                onClick={handlePlayDemo}
                size="lg"
                className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
              <p className="text-lg font-medium">Click to see {scenario.title} in action</p>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <Bot className="absolute inset-0 m-auto h-6 w-6" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold">{steps[currentStep]}</p>
                <div className="flex justify-center space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-white' : 'bg-white/30'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-white text-sm font-medium">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </div>
          DEMO
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(scenario.metrics).map(([key, value]) => (
          <Card key={key} className="text-center p-4 bg-background/60 backdrop-blur-sm border-border/60">
            <div className="text-2xl font-bold" style={{ color: scenario.color }}>{value}</div>
            <div className="text-sm text-muted-foreground">{key}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState("sales");
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
    { href: "/#integrations", label: "Integrations", icon: <Activity className="h-4 w-4" /> },
    { href: "/demo", label: "Demo", icon: <Phone className="h-4 w-4" /> }
  ];

  const activeScenario = demoScenarios.find(s => s.id === activeDemo) || demoScenarios[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:opacity-20 opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "border-b border-border/60 bg-background/95 backdrop-blur-2xl shadow-lg shadow-black/5 dark:shadow-black/20" : "border-b border-transparent bg-background/5 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-10 group">
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
              <div className="absolute -top-0.5 -right-0.5">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-violet-400 to-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg"></span>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                Zapllo Voice
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide">Enterprise AI</span>
            </div> */}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent/50">
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl font-medium transition-all duration-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 font-medium text-white border-0 px-6 py-2.5">
                  <Crown className="h-4 w-4 mr-2" />
                  Start Free
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden bg-background/60 border border-border/60 rounded-xl backdrop-blur-sm hover:bg-accent/80 transition-all duration-300">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/98 backdrop-blur-2xl border-border/60 p-0 w-[90vw] sm:max-w-md">
                <div className="flex flex-col h-full">
                  <div className="border-b border-border/50 p-6">
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                        <Image src="/zapllo.png" alt="Zapllo AI" width={32} height={32} className="h-8 w-auto" />
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                          Zapllo Voice
                        </span>
                      </Link>
                      <SheetClose>
                        <X className="h-5 w-5" />
                      </SheetClose>
                    </div>
                  </div>
                  <nav className="flex-1 overflow-auto py-6 px-6">
                    {navItems.map((item, i) => (
                      <Link key={i} href={item.href} className="flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-accent/80 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                        {item.icon}
                        <span className="text-base font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t border-border/50 p-6 space-y-4">
                    <Link href="/login" className="flex items-center justify-center h-12 px-6 rounded-xl border border-border/60 w-full hover:bg-accent/80 transition-all duration-300 font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/register" className="flex items-center justify-center h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg w-full transition-all duration-300 font-medium gap-2" onClick={() => setMobileMenuOpen(false)}>
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
        {/* Header */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold mb-8">
                <Play className="h-4 w-4" />
                Interactive Demo
                <Sparkles className="h-4 w-4" />
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">See Our</span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                  AI Voice Agents
                </span>
                <br />
                <span className="text-foreground">In Action</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                Experience the future of business communications with interactive demonstrations
                of our AI agents handling real customer scenarios.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-300">
                    <Crown className="h-5 w-5 mr-2" />
                    Start Your Free Trial
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
              {/* Fixed Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-12"
              >
                <TabsList className="grid grid-cols-1 sm:grid-cols-3 p-2 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-xl h-auto">
                  {demoScenarios.map((scenario) => (
                    <TabsTrigger
                      key={scenario.id}
                      value={scenario.id}
                      className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl transition-all duration-500 min-w-[160px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                    >
                      <div className="text-base font-bold">{scenario.title}</div>
                      <div className="text-xs opacity-75">{scenario.description.split(' ').slice(0, 3).join(' ')}...</div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              {/* Demo Content */}
              {demoScenarios.map((scenario) => (
                <TabsContent key={scenario.id} value={scenario.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-12 items-start"
                  >
                    {/* Interactive Demo */}
                    <InteractiveDemo scenario={scenario} />

                    {/* Details */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-3xl font-bold mb-4">{scenario.title}</h3>
                        <p className="text-xl text-muted-foreground mb-6">{scenario.description}</p>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <Sparkles className="h-5 w-5" style={{ color: scenario.color }} />
                          Key Features Demonstrated
                        </h4>
                        <div className="space-y-4">
                          {scenario.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-4 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/60 hover:bg-accent/50 transition-all duration-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              <span className="font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                          <Crown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          Ready to experience this yourself?
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Start your free 14-day trial and deploy this exact AI agent for your business.
                        </p>
                        <Link href="/register">
                          <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white">
                            Get Started Free
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
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
                  Ready to Deploy Your Own AI Voice Agent?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses already using our AI voice technology to automate conversations and increase conversions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl shadow-blue-500/30">
                      <Crown className="h-5 w-5 mr-2" />
                      Start Free Trial
                      <Sparkles className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="font-bold py-6 px-10 rounded-2xl border-2">
                      <Phone className="h-5 w-5 mr-2" />
                      Schedule Demo Call
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
