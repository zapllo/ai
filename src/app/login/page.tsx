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
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, Mic, Eye, EyeOff, Sun, Moon, Sparkles, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceAssistOpen, setVoiceAssistOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await login(data.email, data.password);
  };

  // Simulated voice assistant
  const toggleVoiceAssist = () => {
    setIsRecording(!isRecording);
    setVoiceAssistOpen(!voiceAssistOpen);

    if (!isRecording) {
      // Simulate voice recognition after 2 seconds
      setTimeout(() => {
        setIsRecording(false);
        setVoiceAssistOpen(false);
      }, 2000);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-950 dark:to-black flex items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 dark:opacity-30">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-400 dark:bg-blue-600 rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-400 dark:bg-violet-600 rounded-full filter blur-[150px]"></div>
      </div>

      <motion.div
        className="max-w-md w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Theme toggle button */}
        <div className="absolute top-2 right-2 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Voice assistant button */}
        <div className="absolute top-2 left-2 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVoiceAssist}
                  className={`rounded-full ${isRecording ? 'bg-red-500/90' : 'bg-white/90 dark:bg-gray-800/90'} backdrop-blur-md shadow-md`}
                >
                  <Mic className={`h-5 w-5 ${isRecording ? 'text-white animate-pulse' : 'text-blue-500 dark:text-blue-400'}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use voice assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Voice assistant popup */}
        <AnimatePresence>
          {voiceAssistOpen && (
            <motion.div
              className="absolute top-14 left-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isRecording ? "Listening..." : "How can I help you with login?"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <Image
                src="/zapllo.png"
                alt="Zapllo AI"
                width={80}
                height={80}
                className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
              <motion.div
                className="absolute -inset-1 rounded-full bg-blue-500/20 blur-md -z-10"
                variants={pulseVariants}
                animate="pulse"
              ></motion.div>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            Welcome to Zapllo AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5 text-blue-500" />
              <span>Sign In</span>
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-900/30">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  placeholder="Your email address"
                  {...register("email")}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus-visible:ring-blue-500/50"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    {...register("password")}
                    className="bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus-visible:ring-blue-500/50 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 dark:text-red-400 text-sm">{errors.password.message}</p>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-700/30"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                onClick={() => {
                  // Demo account login - would be implemented in a real app
                  login("demo@zapllo.ai", "demopassword");
                }}
              >
                <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                Try Demo Account
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">
                  Sign up now
                </Link>
              </p>
            </motion.div>
          </CardFooter>
        </Card>

        {/* Decorative elements */}
        <div className="hidden md:block absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="hidden md:block absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
      </motion.div>
    </div>
  );
}
