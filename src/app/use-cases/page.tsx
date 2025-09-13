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
  Phone, Users, Calendar, ShoppingCart, Building, Headphones,
  TrendingUp, Clock, CheckCircle, ArrowRight, Crown, Sparkles,
  Menu, X, Bot, BarChart, Activity, Target, Zap, Shield, Globe
} from "lucide-react";

const useCases = [
  {
    id: "sales",
    title: "Sales & Lead Generation",
    description: "Automate your sales process and convert more prospects into customers",
    icon: <Target className="h-8 w-8" />,
    image: "/demo/sales.png",
    stats: {
      conversion: "+267% increase in conversion rate",
      response: "< 2s average response time",
      satisfaction: "4.9/5 customer satisfaction"
    },
    features: [
      "Intelligent lead qualification and scoring",
      "Automated follow-up sequences",
      "Objection handling with proven frameworks",
      "Real-time CRM integration and updates",
      "Appointment scheduling automation",
      "Performance analytics and insights"
    ],
    testimonial: {
      quote: "Our sales team productivity increased by 340% after implementing Zapllo Voice agents.",
      author: "Sarah Johnson",
      role: "VP Sales, TechCorp",
      company: "TechCorp"
    },
    color: "#3b82f6"
  },
  {
    id: "support",
    title: "Customer Support",
    description: "Provide 24/7 customer service that scales with your business",
    icon: <Headphones className="h-8 w-8" />,
    image: "/demo/support.png",
    stats: {
      resolution: "91% first-call resolution rate",
      availability: "24/7 customer support",
      satisfaction: "4.8/5 CSAT score"
    },
    features: [
      "Instant issue diagnosis and resolution",
      "Multi-language customer support",
      "Intelligent ticket routing and escalation",
      "Knowledge base integration",
      "Sentiment analysis and emotion detection",
      "Automated follow-up and surveys"
    ],
    testimonial: {
      quote: "Customer satisfaction scores improved 47% while reducing support costs by 60%.",
      author: "Michael Chen",
      role: "Head of Support",
      company: "ServiceFirst"
    },
    color: "#10b981"
  },
  {
    id: "booking",
    title: "Appointment Scheduling",
    description: "Streamline your booking process and reduce no-shows",
    icon: <Calendar className="h-8 w-8" />,
    image: "/demo/appointment.png",
    stats: {
      efficiency: "+178% booking efficiency",
      noshows: "82% reduction in no-shows",
      automation: "95% process automation"
    },
    features: [
      "Smart calendar synchronization",
      "Multi-timezone scheduling support",
      "Automated confirmation and reminders",
      "Intelligent rescheduling management",
      "Integration with popular calendar apps",
      "No-show prediction and prevention"
    ],
    testimonial: {
      quote: "Eliminated scheduling conflicts completely and increased our team productivity by 156%.",
      author: "Elena Rodriguez",
      role: "Operations Manager",
      company: "ConsultPro"
    },
    color: "#8b5cf6"
  },
  {
    id: "ecommerce",
    title: "E-commerce & Retail",
    description: "Drive online sales with personalized shopping assistance",
    icon: <ShoppingCart className="h-8 w-8" />,
    image: "/demo/analytics.png",
    stats: {
      revenue: "+210% revenue increase",
      cart: "65% cart abandonment recovery",
      orders: "4.2x average order value"
    },
    features: [
      "Personalized product recommendations",
      "Cart abandonment recovery calls",
      "Order status updates and tracking",
      "Inventory availability notifications",
      "Upselling and cross-selling automation",
      "Customer loyalty program management"
    ],
    testimonial: {
      quote: "Voice agents recovered $2.4M in abandoned carts and increased our conversion rate by 185%.",
      author: "David Park",
      role: "E-commerce Director",
      company: "RetailMax"
    },
    color: "#f59e0b"
  },
  {
    id: "healthcare",
    title: "Healthcare & Wellness",
    description: "Improve patient experience with automated healthcare communication",
    icon: <Shield className="h-8 w-8" />,
    image: "/demo/campaigns.png",
    stats: {
      satisfaction: "96% patient satisfaction",
      noshows: "45% reduction in missed appointments",
      efficiency: "3x staff efficiency"
    },
    features: [
      "HIPAA-compliant patient communication",
      "Appointment scheduling and reminders",
      "Prescription refill notifications",
      "Insurance verification and pre-auth",
      "Patient intake and health screening",
      "Follow-up care coordination"
    ],
    testimonial: {
      quote: "Patient no-shows decreased by 45% and our staff can now focus on providing better care.",
      author: "Dr. Amanda Smith",
      role: "Practice Manager",
      company: "HealthFirst Clinic"
    },
    color: "#06b6d4"
  },
  {
    id: "realestate",
    title: "Real Estate",
    description: "Qualify leads and schedule property viewings automatically",
    icon: <Building className="h-8 w-8" />,
    image: "/demo/insights.png",
    stats: {
      leads: "+320% qualified leads",
      showings: "87% showing attendance rate",
      conversion: "2.8x faster deal closure"
    },
    features: [
      "Intelligent lead qualification",
      "Property showing scheduling",
      "Market updates and notifications",
      "Mortgage pre-qualification assistance",
      "Property search and matching",
      "Client relationship management"
    ],
    testimonial: {
      quote: "Generated 2,400+ qualified leads in 90 days with 67% lower acquisition costs.",
      author: "Robert Martinez",
      role: "Broker Owner",
      company: "Prime Realty"
    },
    color: "#ef4444"
  }
];

const UseCaseCard = ({ useCase, index }: { useCase: typeof useCases[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full p-8 bg-background/80 backdrop-blur-xl border-border/60 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden relative">
        {/* Glow effect */}
        <div
          className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${useCase.color}40, ${useCase.color}20, transparent)` }}
        />

        <div className="relative z-10">
          <CardHeader className="p-0 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${useCase.color}15`,
                  borderColor: `${useCase.color}30`,
                  borderWidth: '1px',
                  color: useCase.color
                }}
              >
                {useCase.icon}
              </div>
              <Badge
                className="text-xs font-semibold"
                style={{
                  backgroundColor: `${useCase.color}20`,
                  color: useCase.color,
                  borderColor: `${useCase.color}40`
                }}
              >
                Popular
              </Badge>
            </div>

            <CardTitle className="text-2xl font-bold mb-3">
              {useCase.title}
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              {useCase.description}
            </p>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(useCase.stats).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: useCase.color }} />
                Key Features:
              </h4>
              <ul className="space-y-2">
                {useCase.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-border/60">
              <Link href="/demo">
                <Button
                  className="w-full rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${useCase.color}, ${useCase.color}CC)`,
                    color: 'white'
                  }}
                >
                  See {useCase.title} Demo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default function UseCasesPage() {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:opacity-20 opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "border-b border-border/60 bg-background/95 backdrop-blur-2xl shadow-lg" : "border-b border-transparent bg-background/5 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-10">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Image src="/zapllo.png" alt="Zapllo AI" width={40} height={40} className="h-10 w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                Zapllo Voice
              </span>
              <span className="text-xs text-muted-foreground font-medium">Enterprise AI</span>
            </div>
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
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold mb-8">
                <Target className="h-4 w-4" />
                Industry Solutions
                <Sparkles className="h-4 w-4" />
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">AI Voice Agents for</span><br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                  Every Industry
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
                Discover how businesses across different industries are using Zapllo Voice
                to automate conversations, increase efficiency, and drive growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-300">
                    <Crown className="h-5 w-5 mr-2" />
                    See All Demos
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
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
                  Ready to Transform Your Industry?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses already using AI voice agents to automate their operations and drive unprecedented growth.
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
                      Talk to Expert
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
