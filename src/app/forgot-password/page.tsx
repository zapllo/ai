"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, ArrowRight, Mail, AlertCircle,
  Volume, BrainCircuit, Waves, Mic, Zap,
  Cpu, Check, Undo, ArrowLeft, BrainCog
} from "lucide-react";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [voiceAssistActive, setVoiceAssistActive] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const animationRef = useRef<number>(0);

//   const form = useForm<z.infer<typeof forgotPasswordSchema>>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   // Clear form error when form changes
//   useEffect(() => {
//     const subscription = form.watch(() => setError(null));
//     return () => subscription.unsubscribe();
//   }, [form.watch]);

//   // Neural connections canvas animation
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Setup
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Particle configuration
//     const particlesArray: any[] = [];
//     const numberOfParticles = 100;
//     let hue = 220; // Adjust for color

//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       color: string;

//       constructor() {
//         this.x = Math.random() * (canvas?.width || window.innerWidth);
//         this.y = Math.random() * (canvas?.height || window.innerHeight);
//         this.size = Math.random() * 5 + 1;
//         this.speedX = Math.random() * 2 - 1;
//         this.speedY = Math.random() * 2 - 1;
//         this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.size > 0.2) this.size -= 0.05;

//         // Boundary check
//         if (this.x < 0 || this.x > (canvas?.width || 0)) this.speedX *= -1;
//         if (this.y < 0 || this.y > (canvas?.height || 0)) this.speedY *= -1;
//       }

//       draw() {
//         if (!ctx) return;
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     function init() {
//       for (let i = 0; i < numberOfParticles; i++) {
//         particlesArray.push(new Particle());
//       }
//     }

//     function handleParticles() {
//       for (let i = 0; i < particlesArray.length; i++) {
//         particlesArray[i].update();
//         particlesArray[i].draw();

//         // Connect particles with lines
//         for (let j = i; j < particlesArray.length; j++) {
//           const dx = particlesArray[i].x - particlesArray[j].x;
//           const dy = particlesArray[i].y - particlesArray[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 100) {
//             ctx.beginPath();
//             ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.2 - distance / 500})`;
//             ctx.lineWidth = 0.2;
//             ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
//             ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
//             ctx.stroke();
//           }
//         }

//         if (particlesArray[i].size <= 0.3) {
//           particlesArray.splice(i, 1);
//           i--;
//         }
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       handleParticles();

//       // Shift hue for color cycling
//       hue += 0.5;

//       // Add new particles
//       if (particlesArray.length < numberOfParticles) {
//         for (let i = 0; i < 2; i++) {
//           particlesArray.push(new Particle());
//         }
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     }

//     init();
//     animate();

//     // Cleanup
//     return () => {
//       cancelAnimationFrame(animationRef.current);
//     };
//   }, []);

//   const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: data.email }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to process password reset request');
//       }

//       setSuccess(true);
//       // Clear form
//       form.reset();
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   // Data flow animation
//   const DataFlow = () => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {Array.from({ length: 15 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-primary to-blue-500"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: 0,
//               scale: Math.random() * 2 + 1,
//               opacity: Math.random() * 0.3 + 0.1,
//             }}
//             animate={{
//               y: [0, window.innerHeight],
//               opacity: [0, 0.6, 0],
//             }}
//             transition={{
//               duration: 2 + Math.random() * 4,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   // Matrix-like code rain
//   const CodeRain = () => {
//     return (
//       <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute top-0 text-xs font-mono"
//             style={{
//               left: `${Math.random() * 100}%`,
//               color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`,
//             }}
//             initial={{ y: -100 }}
//             animate={{
//               y: [0, window.innerHeight],
//               opacity: [0.7, 0],
//             }}
//             transition={{
//               duration: 7 + Math.random() * 5,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//               ease: "linear",
//             }}
//           >
//             {Array.from({ length: 10 }).map((_, j) => (
//               <div key={j} className="my-1">
//                 {Math.round(Math.random())}
//               </div>
//             ))}
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   // Glowing orbs animation
//   const GlowingOrbs = () => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 filter blur-[80px]"
//           style={{ top: '30%', left: '20%' }}
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.4, 0.6, 0.4],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//         <motion.div
//           className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-violet-500/20 to-primary/20 filter blur-[70px]"
//           style={{ bottom: '20%', right: '15%' }}
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//             delay: 1,
//           }}
//         />
//       </div>
//     );
//   };

//   // Circuit path animation
//   const CircuitPath = () => {
//     return (
//       <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <motion.path
//             key={i}
//             d={`M${20 + i * 15},0 Q${50},${50 + i * 5} ${80 - i * 10},100`}
//             stroke="hsl(220, 100%, 50%)"
//             strokeWidth="0.1"
//             fill="none"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{
//               pathLength: [0, 1, 1, 1, 0],
//               opacity: [0, 0.5, 0.8, 0.5, 0],
//               strokeDashoffset: [0, 0, 0, 100, 200]
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               times: [0, 0.2, 0.5, 0.8, 1],
//               delay: i * 1.5
//             }}
//           />
//         ))}
//       </svg>
//     );
//   };

//   // HUD-like interface elements
//   const FuturisticHUD = () => {
//     return (
//       <div className="pointer-events-none">
//         <motion.div
//           className="fixed top-4 left-4 border border-primary/30 bg-black/10 backdrop-blur-sm rounded-md px-3 py-1.5 text-xs font-mono text-primary/70"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//             <span>SYSTEM ONLINE</span>
//           </div>
//         </motion.div>

//         <motion.div
//           className="fixed top-4 right-4 border border-primary/30 bg-black/10 backdrop-blur-sm rounded-md text-xs font-mono text-primary/70"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.7, duration: 0.5 }}
//         >
//           <div className="flex items-center gap-2 px-3 py-1.5">
//             <Cpu className="h-3 w-3" />
//             <span>MEMORY RECOVERY v2.0</span>
//           </div>
//         </motion.div>
//       </div>
//     );
//   };

//   // Sound waveform animation
//   const SoundWaveform = () => {
//     return (
//       <motion.div
//         className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5 h-12 z-10 pointer-events-none"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 0.7, y: 0 }}
//         transition={{ delay: 0.8 }}
//       >
//         {Array.from({ length: 28 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="w-0.5 bg-gradient-to-t from-primary/30 to-primary/80 rounded-full"
//             animate={{
//               height: [
//                 4 + Math.sin(i * 0.3) * 4,
//                 15 + Math.sin((i * 0.3) + 2) * 15,
//                 4 + Math.sin(i * 0.3) * 4
//               ],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "easeInOut",
//               delay: i * 0.02,
//             }}
//           />
//         ))}
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
//       {/* Primary Canvas Background Animation */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full z-0 opacity-40"
//       />

//       {/* Additional futuristic animations */}
//       <DataFlow />
//       <CodeRain />
//       <GlowingOrbs />
//       <CircuitPath />

//       {/* Grid overlay */}
//       <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>

//       {/* Futuristic HUD elements */}
//       <FuturisticHUD />

//       {/* Sound visualization */}
//       <SoundWaveform />

//       <motion.div
//         className="max-w-md w-full space-y-8 relative z-10 px-4"
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//       >
//         <motion.div variants={fadeInUp} className="text-center">
//           <Link href="/" className="inline-block">
//             <motion.div
//               className="flex items-center justify-center mb-4 relative"
//               whileHover={{ scale: 1.05 }}
//             >
//               {/* Animated logo halo */}
//               <motion.div
//                 className="absolute -inset-4 opacity-50"
//                 animate={{
//                   background: [
//                     'radial-gradient(circle, rgba(25,118,210,0.3) 0%, rgba(0,0,0,0) 70%)',
//                     'radial-gradient(circle, rgba(25,118,210,0.6) 0%, rgba(0,0,0,0) 70%)',
//                     'radial-gradient(circle, rgba(25,118,210,0.3) 0%, rgba(0,0,0,0) 70%)'
//                   ]
//                 }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />

//               {/* Pulsing glow */}
//               <motion.div
//                 className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.5, 0.8, 0.5]
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   repeatType: "reverse"
//                 }}
//               />
//             </motion.div>
//           </Link>
//           <div className="flex gap-2 items-center justify-center">
//             <Image
//               src="/zapllo.png"
//               alt="Zapllo AI"
//               width={48}
//               height={48}
//               className="h-8 w-auto relative z-10"
//             />
//             <motion.h1
//               className="text-3xl font-bold tracking-tight relative"
//             >
//               <span className="relative inline-block">
//                 <span className="relative inline-block">
//                   <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-extrabold">
//                     Password Recovery
//                   </span>
//                   <motion.span
//                     className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-blue-400/80 to-indigo-500/80"
//                     initial={{ width: "0%" }}
//                     animate={{ width: "100%" }}
//                     transition={{
//                       duration: 1.2,
//                       delay: 0.5,
//                       ease: "easeInOut"
//                     }}
//                   />
//                   <motion.span
//                     className="absolute -inset-1 rounded-lg blur-sm bg-blue-500/10 z-0"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       repeatType: "reverse"
//                     }}
//                   />
//                 </span>
//               </span>
//             </motion.h1>
//           </div>
//           <p className="text-muted-foreground mt-2">
//             Enter your email to reset your password
//           </p>
//         </motion.div>

//         <motion.div
//           variants={fadeInUp}
//           whileHover={{
//             boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)"
//           }}
//           transition={{ duration: 0.3 }}
//         >
//           <Card className="relative border border-primary/20 shadow-xl backdrop-blur-sm bg-black/30">
//             {/* Animated card border glow */}
//             <motion.div
//               className="absolute -inset-px rounded-lg opacity-0"
//               animate={{
//                 opacity: [0, 0.5, 0],
//                 boxShadow: [
//                   '0 0 0 1px rgba(59, 130, 246, 0.3)',
//                   '0 0 0 2px rgba(59, 130, 246, 0.5)',
//                   '0 0 0 1px rgba(59, 130, 246, 0.3)'
//                 ]
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             />

//             {/* Decorative elements */}
//             <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
//             <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full filter blur-2xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

//             <CardHeader className="space-y-1 pb-4">
//               <CardTitle className="text-2xl font-semibold flex items-center gap-2">
//                 <motion.div
//                   animate={{ rotate: [0, 360] }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 >
//                   <BrainCog className="h-5 w-5 text-primary" />
//                 </motion.div>
//                 <span>Reset Password</span>
//               </CardTitle>
//               <CardDescription>
//                 We'll send you instructions to reset your password
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               {error && (
//                 <Alert variant="destructive" className="mb-6 border-red-500/20 bg-red-500/10">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               {success ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4"
//                 >
//                   <div className="flex flex-col items-center text-center space-y-2">
//                     <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
//                       <Check className="h-6 w-6 text-primary" />
//                     </div>
//                     <h3 className="font-semibold text-lg">Reset Link Sent</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Please check your email for instructions to reset your password.
//                     </p>

//                     {/* Animated indicator */}
//                     <div className="flex space-x-2 mt-2">
//                       {[0, 1, 2].map((i) => (
//                         <motion.div
//                           key={i}
//                           className="h-1.5 w-1.5 rounded-full bg-primary"
//                           animate={{
//                             scale: [1, 1.5, 1],
//                             opacity: [0.5, 1, 0.5]
//                           }}
//                           transition={{
//                             duration: 1,
//                             repeat: Infinity,
//                             delay: i * 0.3
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-foreground/80 flex items-center gap-1.5">
//                             <Mail className="h-3.5 w-3.5 text-primary/80" />
//                             Email Address
//                           </FormLabel>
//                           <FormControl>
//                             <div className="relative">
//                               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                               <Input
//                                 placeholder="you@example.com"
//                                 className="pl-10 bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all"
//                                 {...field}
//                               />
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Button
//                         type="submit"
//                         className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 border-none"
//                         disabled={loading}
//                       >
//                         {/* Animated button effects */}
//                         <motion.span
//                           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                           initial={{ x: '-100%' }}
//                           animate={{ x: ['100%'] }}
//                           transition={{
//                             repeat: Infinity,
//                             duration: 1.5,
//                             ease: "linear",
//                             repeatDelay: 0.5
//                           }}
//                         />

//                         {/* Button inner glow */}
//                         <motion.span
//                           className="absolute inset-0 rounded opacity-0"
//                           animate={{
//                             boxShadow: [
//                               'inset 0 0 10px rgba(59, 130, 246, 0)',
//                               'inset 0 0 20px rgba(59, 130, 246, 0.5)',
//                               'inset 0 0 10px rgba(59, 130, 246, 0)'
//                             ],
//                             opacity: [0, 0.5, 0]
//                           }}
//                           transition={{
//                             duration: 2,
//                             repeat: Infinity
//                           }}
//                         />

//                         {loading ? (
//                           <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             <span className="relative z-10">Processing...</span>
//                           </>
//                         ) : (
//                           <div className="flex items-center text-white relative z-10">
//                             <span>Send Reset Instructions</span>
//                             <motion.div
//                               animate={{
//                                 x: [0, 3, 0]
//                               }}
//                               transition={{
//                                 duration: 1.5,
//                                 repeat: Infinity,
//                                 repeatType: "reverse"
//                               }}
//                             >
//                               <ArrowRight className="ml-2 h-4 w-4" />
//                             </motion.div>
//                           </div>
//                         )}
//                       </Button>
//                     </motion.div>
//                   </form>
//                 </Form>
//               )}
//             </CardContent>
//             <CardFooter className="flex flex-col space-y-4 border-t border-primary/20 p-6 backdrop-blur-sm bg-black/10">
//               <div className="text-center text-sm">
//                 <motion.div
//                   animate={{
//                     opacity: [0.7, 1, 0.7]
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     repeatType: "reverse"
//                   }}
//                 >
//                   <Link href="/login" className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors relative group flex items-center justify-center">
//                     <ArrowLeft className="mr-1 h-3.5 w-3.5" />
//                     <span>Back to login</span>
//                     <motion.span
//                       className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full"
//                       transition={{ duration: 0.3 }}
//                     />
//                   </Link>
//                 </motion.div>
//               </div>
//             </CardFooter>
//           </Card>
//         </motion.div>

//         <motion.div variants={fadeInUp} className="text-center text-sm text-muted-foreground">
//           <motion.div
//             className="flex items-center justify-center gap-1"
//             animate={{
//               y: [0, -3, 0]
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           >
//             <Volume className="h-3 w-3 text-primary/80" />
//             <span>Powered by Zapllo&apos;s advanced AI security</span>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Voice assistant button */}
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <motion.button
//               className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-primary-foreground z-20 shadow-lg overflow-hidden"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1 }}
//               onClick={() => setVoiceAssistActive(!voiceAssistActive)}
//             >
//               {/* Radar effect */}
//               <motion.div
//                 className="absolute inset-0 bg-primary/20"
//                 animate={{
//                   background: [
//                     'radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 70%)',
//                     'radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 20%)',
//                     'radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 70%)',
//                   ]
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   repeatType: "reverse"
//                 }}
//               />

//               {/* Rotating ring and sound waves */}
//               <motion.div
//                 className="absolute -inset-1 rounded-full border-2 border-primary z-0"
//                 animate={{
//                   rotate: 360,
//                   opacity: voiceAssistActive ? 0.8 : 0.3
//                 }}
//                 transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "linear"
//                 }}
//               style={{
//                   borderRadius: '100%',
//                   borderStyle: 'dashed'
//                 }}
//               />

//               {/* Sound waves effect */}
//               {[1, 2, 3].map((i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute inset-0 rounded-full border border-primary/60 z-0"
//                   initial={{ scale: 1, opacity: 0 }}
//                   animate={{
//                     scale: [1, 1 + (i * 0.3)],
//                     opacity: [0.7, 0]
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     delay: i * 0.3,
//                     ease: "easeOut"
//                   }}
//                 />
//               ))}

//               <motion.div
//                 animate={{
//                   scale: voiceAssistActive ? [1, 1.1, 1] : 1
//                 }}
//                 transition={{
//                   duration: 0.8,
//                   repeat: voiceAssistActive ? Infinity : 0
//                 }}
//               >
//                 <Mic className="h-6 w-6 relative z-10" />
//               </motion.div>
//             </motion.button>
//           </TooltipTrigger>
//           <TooltipContent side="left" className="border border-primary/20 bg-black/80 backdrop-blur-md text-primary/80">
//             <p className="flex items-center gap-1">
//               <Waves className="h-3 w-3" />
//               <span>Voice Assistant</span>
//             </p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       {/* AI status indicator */}
//       <motion.div
//         className="fixed bottom-6 left-6 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-primary/20 rounded-full shadow-lg z-20"
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 1.2 }}
//       >
//         <div className="flex items-center gap-2">
//           <motion.div
//             className="w-2 h-2 rounded-full bg-primary"
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [0.5, 1, 0.5]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity
//             }}
//           />
//           <span className="text-xs font-mono text-primary/90">AI SYSTEM ACTIVE</span>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


export default function ForgotPasswordPage(){
  return (
    <div></div>
  )
}
