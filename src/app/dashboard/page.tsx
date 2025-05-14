"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Pause, Play, Settings, ChevronRight, Users, PhoneCall, Calendar,
  Plus, BarChart3, Wallet, ArrowUp, ArrowDown, Phone, Clock,
  CheckCircle, XCircle, Info, Sparkles
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then(r => r.json());

// badge + icon helpers
const badge = (s: "active" | "paused") =>
  <Badge className={s === "active"
    ? "bg-success/20 text-success border-success/20"
    : "bg-warning/20 text-warning border-warning/20"}>
    {s[0].toUpperCase() + s.slice(1)}
  </Badge>;

const iconFor = (n: string) =>
  n.toLowerCase().includes("support") ? <PhoneCall className="h-5 w-5 text-secondary" /> :
  n.toLowerCase().includes("booking") ? <Calendar  className="h-5 w-5 text-primary" /> :
  n.toLowerCase().includes("sales") ? <Users  className="h-5 w-5 text-primary" /> :
                                      <Users  className="h-5 w-5 text-primary" />;

/* ---------------- Page ---------------- */
export default function Dashboard() {
  const { user } = useAuth();
  const { data: agentsData } = useSWR<{ agents: any[] }>("/api/agents", fetcher);
  const { data: callsData } = useSWR<{ calls: any[], pagination: any }>("/api/calls?limit=5", fetcher);
  const { data: walletData } = useSWR<{ balance: number, transactions: any[] }>("/api/wallet", fetcher);

  const agents = agentsData?.agents ?? [];
  const calls = callsData?.calls ?? [];
  const walletBalance = walletData?.balance ?? 0;

  // Generate stats based on data
  const activeAgents = agents.filter(a => !a.disabled).length;
  const totalCalls = calls.length;
  const completedCalls = calls.filter(c => c.status === 'completed').length;
  const callSuccessRate = totalCalls > 0 ? Math.round((completedCalls / totalCalls) * 100) : 0;

  const toggle = async (id: string, enable: boolean) => {
    await fetch(`/api/agents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disabled: !enable }),
    });
    mutate("/api/agents");          // refresh SWR cache
  };

  // Recent transactions for the dashboard
  const recentTransactions = walletData?.transactions?.slice(0, 3) || [];

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className=" text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 h-fit max-h-screen overflow-y-auto bg-background">
        <DashboardHeader />
        <div className=" mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-muted-foreground mb-8">Here's an overview of your AI voice agents and calling activities.</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div variants={fadeInUpVariant}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <ArrowUp className="h-5 w-5 text-success" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Active Agents</p>
                    <p className="text-2xl font-bold">{activeAgents}</p>
                    <p className="text-xs text-muted-foreground">out of {agents.length} total</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUpVariant}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-success" />
                    </div>
                    <span className="text-xs font-medium bg-success/10 text-success py-1 px-2 rounded-full">
                      {callSuccessRate}% Success
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Calls</p>
                    <p className="text-2xl font-bold">{totalCalls}</p>
                    <p className="text-xs text-muted-foreground">{completedCalls} completed calls</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUpVariant}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                      120 min
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Minutes Used</p>
                    <p className="text-2xl font-bold">2 hrs</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>


          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Agents Section */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariant}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Your Voice Agents</h2>
                <Link href="/dashboard/new-agent">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Agent
                  </Button>
                </Link>
              </div>

              {agents.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Agents Yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Create your first AI voice agent to start making automated calls with natural conversations
                    </p>
                    <Link href="/dashboard/new-agent">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Create Your First Agent
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {agents.map(a => {
                    const enabled = !a.disabled;
                    const status = enabled ? "active" : "paused";
                    const used = a.usage_minutes ?? 0;
                    const pct = Math.min(100, Math.round((used / 2000) * 100));

                    return (
                      <motion.div
                        key={a.agent_id}
                        className="bg-card rounded-xl border overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                {iconFor(a.name)}
                              </div>
                              <div>
                                <h3 className="font-bold">{a.name}</h3>
                                <p className="text-sm text-muted-foreground">{a.description || 'No description'}</p>
                                <p className="text-xs text-muted-foreground mt-1 italic max-w-md truncate">
                                  <span className="text-foreground/70">First msg:</span> {a.conversation_config?.first_message || 'Not set'}
                                </p>
                              </div>
                            </div>
                            {badge(status as any)}
                          </div>

                          <div>
                            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                              <span>Usage this month</span><span>{used} / 2000 min</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                  style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </div>

                        <div className="border-t p-4 flex justify-between items-center bg-muted/30">
                          <span className="text-sm text-muted-foreground">Last used: {a.last_called_at ? format(new Date(a.last_called_at), "MMM d, h:mm a") : "—"}</span>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"
                                          onClick={() => toggle(a.agent_id, !enabled)}>
{enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {enabled ? 'Pause agent' : 'Activate agent'}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link href={`/dashboard/agents/${a.agent_id}`}>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                      <Settings className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Settings
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <Link href={`/dashboard/agents/${a.agent_id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {agents.length > 0 && (
                    <Link href="/dashboard/agents" className="block">
                      <Button variant="outline" className="w-full">
                        View All Agents
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </motion.div>

            {/* Sidebar Content */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariant}
            >
              {/* Recent Calls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Recent Calls
                  </CardTitle>
                  <CardDescription>
                    Your latest call activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {calls.length > 0 ? (
                    <div className="divide-y">
                      {calls.map(call => (
                        <div key={call._id} className="p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              {call.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-success" />
                              ) : call.status === 'failed' ? (
                                <XCircle className="h-5 w-5 text-destructive" />
                              ) : (
                                <Phone className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className="font-medium truncate">{call.contactName || 'Unknown'}</p>
                                <Badge className={cn(
                                  "ml-2 flex-shrink-0",
                                  call.status === 'completed' ? "bg-success/10 text-success border-success/20" :
                                  call.status === 'failed' ? "bg-destructive/10 text-destructive border-destructive/20" :
                                  "bg-primary/10 text-primary border-primary/20"
                                )}>
                                  {call.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{call.phoneNumber}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {call.startTime ? format(new Date(call.startTime), "MMM d, h:mm a") : "Scheduled"}
                                {call.duration ? ` · ${Math.floor(call.duration / 60)}m ${call.duration % 60}s` : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Phone className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Call History</h3>
                      <p className="text-muted-foreground mb-2">
                        Make your first call to see activity here
                      </p>
                    </div>
                  )}

                  <CardFooter className="p-4 border-t">
                    <Link href="/dashboard/calls" className="w-full">
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Go to Calls
                      </Button>
                    </Link>
                  </CardFooter>
                </CardContent>
              </Card>

              {/* Wallet Overview */}


              {/* Pro Tip Card */}
              <Card className="bg-primary/5 border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full h-8 w-8 bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Pro Tip</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Personalize your AI agents' voice tone and conversation style from the agent settings page to improve call engagement.
                  </p>

                  <Link href="/dashboard/guides/agent-personalization">
                    <Button variant="link" className="px-0 h-auto text-primary">
                      Learn how <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
