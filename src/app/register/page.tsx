"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  Loader2, Eye, EyeOff, ArrowRight, CheckCircle,
  Mail, Lock, User, Building, Phone, AlertCircle,
  Sparkles, Bot, Zap, Shield, Globe, Radio,
  Users, Calendar, Briefcase, Award, BarChart3
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
  company: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to our terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof registerSchema>;

// Floating particle animation
const ParticleField = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: isDark ? "#60a5fa" : "#3b82f6",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: isDark ? 0.3 : 0.15,
          }}
          animate={{
            y: [null, `-${Math.random() * 200 + 50}px`],
            opacity: [0, isDark ? 0.3 : 0.15, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

// Feature highlight component
const FeatureHighlight = ({ icon: Icon, title, description, delay = 0 }: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <div className="space-y-1">
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Stats component
const StatCard = ({ value, label, delay = 0 }: {
  value: string;
  label: string;
  delay?: number;
}) => (
  <motion.div
    className="text-center p-3 rounded-lg bg-card/20 border border-border/30"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="text-xl font-bold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </motion.div>
);

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { theme } = useTheme();

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      company: "",
      agreeTerms: false,
    }
  });

  // Clear form error when form changes
  useEffect(() => {
    const subscription = form.watch(() => setFormError(null));
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: FormValues) => {
    try {
      const { confirmPassword, agreeTerms, ...userData } = data;
      await registerUser(userData);
    } catch (err: any) {
      setFormError(err.message || "An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
      </div>
      <div className="grid grid-cols-2">
        {/* Left Panel - Branding & Content */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 relative z-10">
          <div className="max-w-lg space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-flex items-center gap-3 mb-8">
                <div className="relative">
                  <Image
                    src="/zapllo.png"
                    alt="Zapllo AI"
                    width={48}
                    height={48}
                    className="h-12 w-auto"
                  />
                  <div className="absolute -top-1 -right-1">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600"></span>
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Zapllo Voice
                </span>
              </Link>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border /20 text-primary">
                <Radio className="h-4 w-4" />
                <span className="text-sm font-medium">Revolutionary Voice AI Technology</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Voice AI
                </span>
                <br />
                <span className="text-foreground">That Feels Human</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Deploy intelligent voice agents that handle calls, qualify leads, and support customers
                with conversations so natural, they're indistinguishable from humans.
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <FeatureHighlight
                icon={Bot}
                title="Human-like Conversations"
                description="Advanced AI that adapts to caller emotions and speech patterns"
                delay={0.5}
              />
              <FeatureHighlight
                icon={Shield}
                title="Enterprise Security"
                description="SOC 2 compliant with end-to-end encryption"
                delay={0.6}
              />
              <FeatureHighlight
                icon={Globe}
                title="Multi-language Support"
                description="Supports 20+ languages with native accent detection"
                delay={0.7}
              />
              <FeatureHighlight
                icon={Zap}
                title="Instant Deployment"
                description="Get your AI voice agents live in under 5 minutes"
                delay={0.8}
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <StatCard value="99.8%" label="Accuracy" delay={1.0} />
              <StatCard value="24/7" label="Availability" delay={1.1} />
              <StatCard value="20+" label="Languages" delay={1.2} />
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <p className="text-xs font-medium text-muted-foreground mb-3">TRUSTED BY COMPANIES WORLDWIDE</p>
              <div className="flex items-center gap-6 opacity-60">
                {['google', 'microsoft', 'salesforce'].map((company, i) => (
                  <Image
                    key={company}
                    src={`/logos/${company}.webp`}
                    alt={company}
                    width={80}
                    height={24}
                    className="h-6 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="w-full flex items-center justify-center p-8 lg:p-12 bg-card/30 backdrop-blur-xl border-l border-border/30 relative z-10">
          <motion.div
            className="w-full max-w-lg space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Form Header */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
              <p className="text-muted-foreground text-base">Start your AI voice journey in minutes</p>
            </div>

            {/* Registration Form */}
            <Card className="border border-border/60 shadow-xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-6">
                {(error || formError) && (
                  <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium">{error || formError}</AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-xs font-medium text-muted-foreground px-3 uppercase tracking-wider">
                          Personal Information
                        </span>
                        <div className="h-px bg-border flex-1" />
                      </div>

                      {/* Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold text-foreground">Full Name</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="Enter your full name"
                                  className="pl-12 h-12 text-base bg-background border-border hover:border-border/80 focus:border /50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold text-foreground">Email Address</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="you@company.com"
                                  type="email"
                                  className="pl-12 h-12 text-base bg-background border-border hover:border-border/80 focus:border /50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      {/* Company Field */}
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold text-foreground">
                              Company <span className="text-muted-foreground font-normal">(Optional)</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="Your company name"
                                  className="pl-12 h-12 text-base bg-background border-border hover:border-border/80 focus:border /50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Security Section */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-xs font-medium text-muted-foreground px-3 uppercase tracking-wider">
                          Security
                        </span>
                        <div className="h-px bg-border flex-1" />
                      </div>

                      {/* Password Fields */}
                      <div className="grid grid-cols-1 gap-5">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-foreground">Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                  <Input
                                    type={showPassword ? "text" : "password"}
                                    className="pl-12 pr-12 h-12 text-base bg-background border-border hover:border-border/80 focus:border /50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                    placeholder="Create a strong password"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1 h-10 w-10 hover:bg-muted/50 rounded-md transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-foreground">Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                  <Input
                                    type={showPassword ? "text" : "password"}
                                    className="pl-12 h-12 text-base bg-background border-border hover:border-border/80 focus:border /50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                    placeholder="Confirm your password"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <FormField
                      control={form.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <div className="flex items-start space-x-3 rounded-xl border border-border/60 p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border "
                              />
                            </FormControl>
                            <div className="grid gap-2 leading-none">
                              <FormLabel className="text-sm font-medium cursor-pointer leading-relaxed">
                                I agree to the{" "}
                                <Link
                                  href="/terms"
                                  className="text-primary hover:text-primary/80 font-semibold underline underline-offset-2 hover:underline-offset-4 transition-all"
                                >
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                  href="/privacy"
                                  className="text-primary hover:text-primary/80 font-semibold underline underline-offset-2 hover:underline-offset-4 transition-all"
                                >
                                  Privacy Policy
                                </Link>
                              </FormLabel>
                              <FormMessage className="text-xs" />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 via-blue-600 to-violet-600 hover:from-blue-700 hover:via-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                        disabled={loading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        {loading ? (
                          <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                            Creating your account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                            Create Account
                            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:text-primary/80 underline underline-offset-2 hover:underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
