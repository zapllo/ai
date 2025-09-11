
"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Play, Pause, Settings, ChevronRight, Users, PhoneCall, Calendar,
  Plus, BarChart3, Wallet, TrendingUp, TrendingDown, Phone, Clock,
  CheckCircle, XCircle, AlertCircle, Sparkles, Mic, Radio,
  Activity, Zap, Target, ArrowUpRight, MoreHorizontal,
  MessageCircle, Star, Shield, Gauge
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
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then(r => r.json());

// Helper functions
const getAgentIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("support") || n.includes("customer")) return PhoneCall;
  if (n.includes("booking") || n.includes("appointment")) return Calendar;
  if (n.includes("sales") || n.includes("lead")) return Target;
  return Radio;
};

const getCallStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-500 bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20';
    case 'failed': return 'text-red-500 bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20';
    case 'in-progress': return 'text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20';
    default: return 'text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-500/10 dark:border-gray-500/20';
  }
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatMinutes = (mins: number) => {
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  }
  return `${mins}m`;
};

export default function Dashboard() {
  const { user } = useAuth();

  // Data fetching
  const { data: agentsData, isLoading: isLoadingAgents } = useSWR<{ agents: any[] }>("/api/agents", fetcher);
  const { data: callsData, isLoading: isLoadingCalls } = useSWR<{ calls: any[], pagination: any }>("/api/calls?limit=6", fetcher);
  const { data: analyticsData } = useSWR<{ totalCalls: number, successRate: number, avgDuration: number }>("/api/analytics/overview", fetcher);

  const agents = agentsData?.agents ?? [];
  const calls = callsData?.calls ?? [];

  // Calculate metrics
  const activeAgents = agents.filter(a => !a.disabled).length;
  const totalAgents = agents.length;
  const totalCalls = analyticsData?.totalCalls ?? calls.length;
  const successRate = analyticsData?.successRate ?? 0;
  const avgCallDuration = analyticsData?.avgDuration ?? 0;

  // Usage calculations
  const minutesUsed = user?.minutesUsed || 0;
  const totalMinutes = user?.totalMinutes || 1000;
  const usagePercentage = Math.min(100, (minutesUsed / totalMinutes) * 100);

  // Agent toggle function
  const toggleAgent = async (agentId: string, currentlyEnabled: boolean) => {
    try {
      await fetch(`/api/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: currentlyEnabled }),
      });
      mutate("/api/agents");
    } catch (error) {
      console.error('Error toggling agent:', error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-hidden">
        <DashboardHeader />

        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className=" mx-auto p-6 space-y-8">

            {/* Welcome Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-sidebar-foreground mb-2">
                  Welcome back, {user?.name?.split(' ')[0] || 'User'}
                </h1>
                <p className="text-sidebar-foreground/70 text-lg">
                  Manage your AI voice agents and track performance metrics
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/dashboard/calls/new">
                  <Button variant="outline" className="gap-2 h-11">
                    <Phone className="h-4 w-4" />
                    Make Call
                  </Button>
                </Link>
                <Link href="/dashboard/new-agent">
                  <Button className="gap-2 h-11 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
                    <Plus className="h-4 w-4" />
                    Create Agent
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Metrics Overview */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-card border-sidebar-border hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                        <Radio className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sidebar-foreground">{activeAgents}</h3>
                      <p className="text-sidebar-foreground/60 text-sm mt-1">
                        of {totalAgents} agents
                      </p>
                      <div className="mt-3">
                        <Progress
                          value={(activeAgents / Math.max(1, totalAgents)) * 100}
                          className="h-2 bg-sidebar/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-card border-sidebar-border hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-green-500/10 ring-1 ring-green-500/20">
                        <PhoneCall className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600">
                          <span className="text-sm font-medium">{successRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sidebar-foreground">{totalCalls}</h3>
                      <p className="text-sidebar-foreground/60 text-sm mt-1">
                        total calls made
                      </p>
                      <div className="mt-3">
                        <Progress
                          value={successRate}
                          className="h-2 bg-sidebar/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-card border-sidebar-border hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-sidebar-primary/10 text-sidebar-primary border-sidebar-primary/20">
                          {usagePercentage.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sidebar-foreground">{formatMinutes(minutesUsed)}</h3>
                      <p className="text-sidebar-foreground/60 text-sm mt-1">
                        of {formatMinutes(totalMinutes)} used
                      </p>
                      <div className="mt-3">
                        <Progress
                          value={usagePercentage}
                          className="h-2 bg-sidebar/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-card border-sidebar-border hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-sidebar-foreground/60">avg</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sidebar-foreground">
                        {avgCallDuration > 0 ? formatDuration(avgCallDuration) : '0:00'}
                      </h3>
                      <p className="text-sidebar-foreground/60 text-sm mt-1">
                        call duration
                      </p>
                      <div className="mt-3">
                        <div className="h-2 bg-sidebar/50 rounded-full overflow-hidden">
                          <div className="h-full bg-transparent rounded-full animate-" style={{ width: '75%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Quick Actions Banner */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-gradient-to-r from-sidebar-primary/10 via-sidebar-primary/5 to-transparent border-sidebar-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-sidebar-primary/20 ring-1 ring-sidebar-primary/30">
                        <Sparkles className="h-6 w-6 text-sidebar-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-sidebar-foreground mb-1">
                          AI Voice Agents Ready
                        </h3>
                        <p className="text-sidebar-foreground/70">
                          Your agents are configured and ready to make natural, human-like calls
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href="/dashboard/analytics">
                        <Button variant="outline" className="gap-2">
                          <BarChart3 className="h-4 w-4" />
                          View Analytics
                        </Button>
                      </Link>
                      <Link href="/dashboard/calls/new">
                        <Button className="gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
                          <Phone className="h-4 w-4" />
                          Start Calling
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Agents Section */}
              <motion.div
                className="lg:col-span-2"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-sidebar-foreground">Voice Agents</h2>
                    <p className="text-sidebar-foreground/60 text-sm mt-1">Manage and monitor your AI agents</p>
                  </div>
                  <Link href="/dashboard/agents">
                    <Button variant="outline" className="gap-2">
                      <ArrowUpRight className="h-4 w-4" />
                      View All
                    </Button>
                  </Link>
                </div>

                {isLoadingAgents ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="border-sidebar-border">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-5 w-32" />
                              <Skeleton className="h-4 w-48" />
                            </div>
                            <Skeleton className="h-8 w-16" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : agents.length === 0 ? (
                  <Card className="border-dashed border-2 border-sidebar-border/50">
                    <CardContent className="p-12 text-center">
                      <div className="mx-auto w-20 h-20 bg-sidebar/50 rounded-full flex items-center justify-center mb-6">
                        <Radio className="h-10 w-10 text-sidebar-foreground/40" />
                      </div>
                      <h3 className="text-xl font-semibold text-sidebar-foreground mb-2">
                        No Voice Agents Yet
                      </h3>
                      <p className="text-sidebar-foreground/60 mb-8 max-w-md mx-auto">
                        Create your first AI voice agent to start making automated calls with natural conversations and intelligent responses.
                      </p>
                      <Link href="/dashboard/new-agent">
                        <Button className="gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
                          <Plus className="h-4 w-4" />
                          Create Your First Agent
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {agents.slice(0, 3).map((agent, index) => {
                      const IconComponent = getAgentIcon(agent.name);
                      const isActive = !agent.disabled;
                      const usageMinutes = agent.usage_minutes || 0;
                      const usagePercentage = Math.min(100, (usageMinutes / 1000) * 100);

                      return (
                        <motion.div
                          key={agent.agent_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card className="group border-sidebar-border hover:shadow-lg transition-all duration-300 overflow-hidden">
                            <CardContent className="p-0">
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-4">
                                    <div className={cn(
                                      "p-3 rounded-xl ring-1",
                                      isActive
                                        ? "bg-sidebar-primary/10 ring-sidebar-primary/20"
                                        : "bg-sidebar/50 ring-sidebar-border"
                                    )}>
                                      <IconComponent className={cn(
                                        "h-6 w-6",
                                        isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40"
                                      )} />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold text-lg text-sidebar-foreground">
                                          {agent.name}
                                        </h3>
                                        <Badge
                                          variant="outline"
                                          className={cn(
                                            "text-xs font-medium",
                                            isActive
                                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                                              : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20"
                                          )}
                                        >
                                          {isActive ? 'Active' : 'Paused'}
                                        </Badge>
                                      </div>
                                      <p className="text-sidebar-foreground/60 text-sm">
                                        {agent.description || 'No description provided'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => toggleAgent(agent.agent_id, isActive)}
                                          >
                                            {isActive ?
                                              <Pause className="h-4 w-4" /> :
                                              <Play className="h-4 w-4" />
                                            }
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {isActive ? 'Pause Agent' : 'Activate Agent'}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <Link href={`/dashboard/agents/${agent.agent_id}`}>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Settings className="h-4 w-4" />
                                      </Button>
                                    </Link>
                                  </div>
                                </div>

                                {agent.conversation_config?.first_message && (
                                  <div className="mb-4 p-3 bg-sidebar/30 rounded-lg border border-sidebar-border/50">
                                    <p className="text-xs font-medium text-sidebar-foreground/60 mb-1">First Message:</p>
                                    <p className="text-sm text-sidebar-foreground/80 line-clamp-2">
                                      "{agent.conversation_config.first_message}"
                                    </p>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-sidebar-foreground/60">Usage this month</span>
                                    <span className="font-medium text-sidebar-foreground">
                                      {usageMinutes} / 1000 min
                                    </span>
                                  </div>
                                  <Progress value={usagePercentage} className="h-2 bg-sidebar/50" />
                                </div>
                              </div>

                              <div className="px-6 py-4 bg-sidebar/20 border-t border-sidebar-border flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {agent.last_called_at
                                      ? `Last used ${format(new Date(agent.last_called_at), "MMM d, h:mm a")}`
                                      : 'Never used'
                                    }
                                  </span>
                                </div>
                                <Link href={`/dashboard/agents/${agent.agent_id}`}>
                                  <Button variant="ghost" size="sm" className="gap-2 text-sidebar-primary hover:bg-sidebar-primary/10">
                                    Configure
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}

                    {agents.length > 3 && (
                      <Link href="/dashboard/agents">
                        <Button variant="outline" className="w-full gap-2">
                          View All {agents.length} Agents
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Side Panel */}
              <motion.div
                className="space-y-8"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Recent Calls */}
                <Card className="border-sidebar-border h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Phone className="h-5 w-5 text-sidebar-primary" />
                      Recent Calls
                    </CardTitle>
                    <CardDescription>Latest calling activity</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {isLoadingCalls ? (
                      <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : calls.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-sidebar/50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Phone className="h-8 w-8 text-sidebar-foreground/40" />
                        </div>
                        <h3 className="font-medium text-sidebar-foreground mb-2">No Calls Yet</h3>
                        <p className="text-sidebar-foreground/60 text-sm mb-4">
                          Start making calls to see activity here
                        </p>
                        <Link href="/dashboard/calls/new">
                          <Button size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            Make First Call
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <div className="divide-y divide-sidebar-border">
                          {calls.slice(0, 5).map((call, index) => (
                            <motion.div
                              key={call._id}
                              className="p-4 hover:bg-sidebar/20 transition-colors"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div className="flex items-start gap-3">
                                <Avatar className="h-9 w-9 border border-sidebar-border">
                                  <AvatarFallback className="text-xs bg-sidebar/50">
                                    {call.contactName?.charAt(0) || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium text-sm text-sidebar-foreground truncate">
                                      {call.contactName || 'Unknown Contact'}
                                    </p>
                                    <Badge className={cn("text-xs", getCallStatusColor(call.status))}>
                                      {call.status}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-sidebar-foreground/60 truncate mb-1">
                                    {call.phoneNumber}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
                                    <span>
                                      {call.startTime ? format(new Date(call.startTime), "MMM d, h:mm a") : "Scheduled"}
                                    </span>
                                    {call.duration && (
                                      <>
                                        <span>•</span>
                                        <span>{formatDuration(call.duration)}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="p-4 border-t border-sidebar-border">
                          <Link href="/dashboard/calls">
                            <Button variant="ghost" className="w-full gap-2">
                              View All Calls
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>


              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Pro Tips */}
              <Card className="border-sidebar-primary/20 bg-gradient-to-br from-sidebar-primary/5 to-sidebar-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-sidebar-primary" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="h-3 w-3 text-sidebar-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground">
                          Optimize Voice Settings
                        </p>
                        <p className="text-xs text-sidebar-foreground/60 mt-1">
                          Adjust speaking speed and tone for better engagement rates
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MessageCircle className="h-3 w-3 text-sidebar-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground">
                          Personalize Scripts
                        </p>
                        <p className="text-xs text-sidebar-foreground/60 mt-1">
                          Use contact data to customize your conversation flow
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Target className="h-3 w-3 text-sidebar-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground">
                          Track Performance
                        </p>
                        <p className="text-xs text-sidebar-foreground/60 mt-1">
                          Monitor success rates and optimize your calling strategy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sidebar-border/50">
                    <Link href="/dashboard/guides">
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sidebar-primary hover:bg-sidebar-primary/10">
                        <Sparkles className="h-4 w-4" />
                        View More Tips
                        <ArrowUpRight className="h-3 w-3 ml-auto" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card className="border-sidebar-border">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-sidebar-primary" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-sidebar/30 rounded-lg border border-sidebar-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                        <Gauge className="h-4 w-4 text-sidebar-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground">
                          {user?.plan || 'Free'} Plan
                        </p>
                        <p className="text-xs text-sidebar-foreground/60">
                          {formatMinutes(totalMinutes - minutesUsed)} minutes remaining
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-sidebar-primary/10 text-sidebar-primary border-sidebar-primary/20">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sidebar-foreground/60">Usage this month</span>
                      <span className="font-medium text-sidebar-foreground">
                        {usagePercentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={usagePercentage} className="h-2 bg-sidebar/50" />
                    <p className="text-xs text-sidebar-foreground/50">
                      Resets on the 1st of each month
                    </p>
                  </div>

                  {usagePercentage > 80 && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/20">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Usage Alert
                          </p>
                          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                            You've used {usagePercentage.toFixed(0)}% of your monthly minutes. Consider upgrading your plan.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <Link href="/dashboard/billing">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <ArrowUpRight className="h-4 w-4" />
                        Manage Plan
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Bottom CTA Section */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="pt-8"
            >
              <Card className="bg-gradient-to-r from-sidebar-primary/5 via-sidebar-primary/10 to-sidebar-primary/5 border-sidebar-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-sidebar-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="h-8 w-8 text-sidebar-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-sidebar-foreground mb-3">
                      Ready to Scale Your Voice Operations?
                    </h3>
                    <p className="text-sidebar-foreground/70 mb-8 text-lg">
                      Create intelligent voice agents that handle calls with natural conversations,
                      human-like responses, and seamless integrations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href="/dashboard/new-agent">
                        <Button className="gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground px-8">
                          <Plus className="h-4 w-4" />
                          Create New Agent
                        </Button>
                      </Link>
                      <Link href="/dashboard/calls/new">
                        <Button variant="outline" className="gap-2 px-8">
                          <Phone className="h-4 w-4" />
                          Start Calling Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
