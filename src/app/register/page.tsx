"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Loader2, Check, Eye, EyeOff, Sun, Moon, Sparkles, ArrowRight, ChevronRight } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  const onSubmit = async (data: FormValues) => {
    const { confirmPassword, agreeTerms, ...userData } = data;
    await registerUser(userData);
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050714] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px]" />
        <div className="absolute top-2/3 right-1/4 w-60 h-60 bg-violet-600/20 rounded-full filter blur-[80px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5" />
      </div>


      <motion.div
        className="max-w-md w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Zapllo AI"
                className="h-8 drop-shadow-[0_0_25px_rgba(79,70,229,0.4)]"

              />
              <motion.div
                className="absolute -inset-2 rounded-full bg-indigo-500/20 blur-md z-[-1]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Create your Zapllo AI account
          </h1>
          <p className="text-slate-400 mt-2">
            Step into the future of AI voice technology
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-lg shadow-[0_10px_40px_-10px_rgba(79,70,229,0.2)] rounded-xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-800">
              <CardTitle className="flex text-white items-center text-xl">
                <Sparkles className="h-5 w-5 text mr-2 text-indigo-400" />
                Join Zapllo AI
              </CardTitle>
              <CardDescription className="text-slate-400">
                Complete your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-">
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-900/30 border border-red-800">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-slate-800/50 border-slate-700 text-white focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            {...field}
                            className="bg-slate-800/50 border-slate-700 text-white focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                                className="bg-slate-800/50 border-slate-700 text-white focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              className="bg-slate-800/50 border-slate-700 text-white focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center">
                      <div className="h-px flex-1 bg-slate-800"></div>
                      <span className="px-3 text-xs text-slate-500 uppercase">Optional Details</span>
                      <div className="h-px flex-1 bg-slate-800"></div>
                    </div>

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (555) 000-0000"
                              {...field}
                              className="bg-slate-800/50 border-slate-700 text-white focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Company</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your organization"
                              {...field}
                              className="bg-slate-800/50 border-slate-700 text-white focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-slate-800/50 border border-slate-700/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal text-slate-300">
                            I agree to the{" "}
                            <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 underline decoration-dotted underline-offset-4">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline decoration-dotted underline-offset-4">
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage className="text-red-400" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium shadow-[0_8px_30px_rgb(79,70,229,0.2)] border-0"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col border-t border-slate-800 bg-slate-900/80">
              <div className="w-full text-center text-slate-400 text-sm pt-2">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Sign in <ChevronRight className="inline h-3 w-3" />
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
