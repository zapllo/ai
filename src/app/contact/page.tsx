'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  Phone, Mail, MapPin, Clock, Send, MessageSquare,
  Calendar, Headphones, Crown, Sparkles, ArrowRight,
  CheckCircle, Globe, Shield, Zap, Menu, X, Bot, BarChart, Activity,
  ChevronDown
} from "lucide-react";

const contactMethods = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone Support",
    description: "Speak with our AI experts directly",
    contact: "+1 (555) 123-4567",
    available: "24/7 Enterprise Support",
    color: "#3b82f6"
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    description: "Get detailed responses within 2 hours",
    contact: "support@zapllo.com",
    available: "Response within 2 hours",
    color: "#10b981"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Live Chat",
    description: "Instant support from our team",
    contact: "Start Chat",
    available: "Available now",
    color: "#8b5cf6"
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Schedule Demo",
    description: "Book a personalized walkthrough",
    contact: "Book Meeting",
    available: "15-30 min sessions",
    color: "#f59e0b"
  }
];

const faqs = [
  {
    question: "How quickly can I deploy AI voice agents?",
    answer: "Most businesses can have their first AI voice agent live within 24-48 hours. Our no-code setup process and pre-built templates make deployment incredibly fast."
  },
  {
    question: "What's included in the free trial?",
    answer: "Your 14-day free trial includes full access to all features, up to 100 minutes of voice calls, complete dashboard access, and dedicated onboarding support."
  },
  {
    question: "Do you offer enterprise-level security?",
    answer: "Yes, we're SOC 2 Type II certified with end-to-end encryption, GDPR compliance, and enterprise-grade security measures to protect your data."
  },
  {
    question: "Can AI agents integrate with our existing systems?",
    answer: "Absolutely. We support 200+ integrations including Salesforce, HubSpot, Zendesk, and custom APIs. Our team can help with any specific integration needs."
  }
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="border border-border/60 rounded-2xl overflow-hidden bg-background/60 backdrop-blur-sm"
    >
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4 border-t border-border/60"
        >
          <p className="text-muted-foreground leading-relaxed pt-4">{faq.answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
        {/* Header */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold mb-8">
                <Headphones className="h-4 w-4" />
                Expert Support
                <Crown className="h-4 w-4" />
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Get in</span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400">
                  Touch
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Ready to transform your business with AI voice agents? Our team of experts
                is here to help you get started and answer any questions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full p-6 bg-background/60 backdrop-blur-sm border-border/60 hover:bg-accent/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardContent className="p-0 text-center space-y-4">
                      <div
                        className="inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${method.color}15`,
                          color: method.color
                        }}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                        <div className="text-sm font-semibold" style={{ color: method.color }}>
                          {method.contact}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {method.available}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="p-8 bg-background/80 backdrop-blur-xl border-border/60 shadow-2xl">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      Send us a message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 2 hours.
                    </p>
                  </CardHeader>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll respond within 2 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            className="bg-background/60 border-border/60"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="bg-background/60 border-border/60"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Company</label>
                          <Input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company name"
                            className="bg-background/60 border-border/60"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="bg-background/60 border-border/60"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">How can we help?</label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full p-3 rounded-xl bg-background/60 border border-border/60 text-foreground"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="demo">Schedule a Demo</option>
                          <option value="pricing">Pricing Information</option>
                          <option value="enterprise">Enterprise Solutions</option>
                          <option value="integration">Integration Support</option>
                          <option value="technical">Technical Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your needs..."
                          rows={4}
                          required
                          className="bg-background/60 border-border/60"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Send Message
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>

              {/* Company Info & FAQs */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Company Info */}
                <Card className="p-8 bg-background/80 backdrop-blur-xl border-border/60">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Globe className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      Our Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Headquarters</h4>
                        <p className="text-muted-foreground">
                          123 AI Innovation Drive<br />
                          San Francisco, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-green-600 dark:text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">Business Hours</h4>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                          Saturday - Sunday: 10:00 AM - 4:00 PM PST<br />
                          <span className="text-green-600 dark:text-green-400 font-medium">Enterprise Support: 24/7</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQs */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <FAQItem key={index} faq={faq} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
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
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Don't wait - start your free trial today and experience the power of AI voice agents for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl shadow-blue-500/30">
                      <Crown className="h-5 w-5 mr-2" />
                      Start Free Trial
                      <Sparkles className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button variant="outline" size="lg" className="font-bold py-6 px-10 rounded-2xl border-2">
                      <Phone className="h-5 w-5 mr-2" />
                      Watch Demo
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
