"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Loader2, Eye, EyeOff, ArrowRight,
  Lock, AlertCircle, Sparkles,
  ShieldCheck, CheckCircle, ArrowLeftCircle
} from "lucide-react";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    if (!tokenParam) {
      setIsError(true);
      toast.error('Reset token is missing. Please request a new password reset link.');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast.success(data.message || 'Password reset successful. You can now log in with your new password.');
      } else {
        setIsError(true);
        toast.error(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      setIsError(true);
      toast.error('An error occurred. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Particle effect (simulate AI/tech particles)
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 1, 0],
              scale: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background z-0">
          <ParticleBackground />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full filter blur-[120px] opacity-50"></div>
        </div>

        <motion.div
          className="max-w-md w-full space-y-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center">
            <Link href="/" className="inline-block">
              <motion.div
                className="flex items-center justify-center mb-4 relative"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <Image
                  src="/logo.png"
                  alt="Zapllo AI"
                  width={48}
                  height={48}
                  className="h-10 w-auto relative z-10"
                />
              </motion.div>
            </Link>
            <motion.h1
              className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              animate={{
                backgroundPosition: ['0% center', '100% center'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ backgroundSize: '200%' }}
            >
              Password Reset Successful
            </motion.h1>
            <p className="text-muted-foreground mt-2">Your password has been successfully updated</p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="relative border border-primary/20 shadow-xl backdrop-blur-sm bg-black/30">
              {/* Decorative gradient accents */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

              <CardContent className="pt-8 pb-6 px-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Password Reset Complete</h3>
                <p className="text-muted-foreground mb-6">
                  Your password has been successfully reset. You can now log in with your new password.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => router.push('/login')}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: ['100%'] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    />
                    <div className="flex items-center">
                      <span>Sign In</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      <Sparkles className="ml-1 h-3 w-3 opacity-70" />
                    </div>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (isError && !token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background z-0">
          <ParticleBackground />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full filter blur-[120px] opacity-50"></div>
        </div>

        <motion.div
          className="max-w-md w-full space-y-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center">
            <Link href="/" className="inline-block">
              <motion.div
                className="flex items-center justify-center mb-4 relative"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <Image
                  src="/logo.png"
                  alt="Zapllo AI"
                  width={48}
                  height={48}
                  className="h-10 w-auto relative z-10"
                />
              </motion.div>
            </Link>
            <motion.h1
              className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              animate={{
                backgroundPosition: ['0% center', '100% center'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ backgroundSize: '200%' }}
            >
              Invalid Reset Link
            </motion.h1>
            <p className="text-muted-foreground mt-2">The password reset link is invalid or has expired</p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="relative border border-primary/20 shadow-xl backdrop-blur-sm bg-black/30">
              {/* Decorative gradient accents */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

              <CardContent className="pt-8 pb-6 px-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Link Expired or Invalid</h3>
                <p className="text-muted-foreground mb-6">
                  The password reset link you clicked is no longer valid. Please request a new password reset link.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => router.push('/forgot-password')}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: ['100%'] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    />
                    <div className="flex items-center">
                      <span>Request New Link</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center text-sm text-muted-foreground">
            <div className="mt-2">
              <Link href="/login" className="text-primary hover:underline transition-colors">
                Back to login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Form state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background z-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full filter blur-[120px] opacity-50"></div>
      </div>

      <motion.div
        className="max-w-md w-full space-y-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center">
          <Link href="/" className="inline-block">
            <motion.div
              className="flex items-center justify-center mb-4 relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <Image
                src="/logo.png"
                alt="Zapllo AI"
                width={48}
                height={48}
                className="h-10 w-auto relative z-10"
              />
            </motion.div>
          </Link>
          <motion.h1
            className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            animate={{
              backgroundPosition: ['0% center', '100% center'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ backgroundSize: '200%' }}
          >
            Create New Password
          </motion.h1>
          <p className="text-muted-foreground mt-2">Set a secure password for your account</p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="relative border border-primary/20 shadow-xl backdrop-blur-sm bg-black/30">
            {/* Decorative gradient accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Reset Password</span>
                </CardTitle>
              </div>
              <CardDescription>
                Enter and confirm your new password
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className="pl-10 pr-10 bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:text-primary hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground/80 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className="pl-10 pr-10 bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:text-primary hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500"
                    disabled={isLoading || !token}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: ['100%'] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    />
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting Password...
                      </>
                    ) : (
                      <div className="flex items-center">
                        <span>Reset Password</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        <Sparkles className="ml-1 h-3 w-3 opacity-70" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t border-primary/20 p-6 backdrop-blur-sm bg-black/10">
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center text-sm text-muted-foreground">
          <div className="mt-2">
            <Link href="/forgot-password" className="text-primary hover:underline transition-colors">
              Request new reset link
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating UI elements */}
      <div className="fixed bottom-4 right-4 z-20 flex items-center bg-background/30 backdrop-blur-lg border border-primary/20 rounded-full px-3 py-1.5 shadow-lg">
        <div className="animate-pulse mr-2">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
        <span className="text-xs font-medium text-foreground/70">Secure connection</span>
      </div>
    </div>
  );
}
