"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Radio,
  Volume2,
  Search,
  Save,
  ArrowLeft,
  PlayCircle,
  PauseCircle,
  Bot,
  MessageSquare,
  LucideIcon,
  User,
  UserRoundCheck,
  HelpCircle,
  Star,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const agentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  voice_id: z.string().min(1, "Please select a voice"),
  first_message: z.string().min(3, "First message is required"),
  system_prompt: z.string().min(10, "System prompt must be at least 10 characters"),
  template_id: z.string().optional(),
});

// Templates for agent prompts
const agentTemplates = [
  {
    id: "sales-assistant",
    title: "Sales Assistant",
    icon: UserRoundCheck,
    description: "A friendly agent that helps qualify leads and schedule sales meetings",
    prompt: "You are a professional and friendly sales assistant. Your task is to engage with potential customers, understand their needs, answer product questions, and help schedule meetings with our sales team if they're interested. Be conversational but efficient. Avoid making promises about pricing or features you're unsure about - instead, acknowledge the question and offer to connect them with a sales representative who can provide accurate information. Always maintain a helpful, understanding tone.",
    firstMessage: "Hi there! I'm your sales assistant from [Company]. I'd be happy to tell you about our products and services. What brings you here today?"
  },
  {
    id: "customer-support",
    title: "Customer Support",
    icon: HelpCircle,
    description: "An empathetic agent that handles customer inquiries and resolves issues",
    prompt: "You are a patient and empathetic customer support agent. Your goal is to help users resolve their issues efficiently while showing genuine concern for their problems. Listen carefully to their issues, ask clarifying questions, and provide clear step-by-step solutions when possible. If you don't know the answer, don't make one up - instead, acknowledge the complexity of their issue and offer to escalate it to a specialist. Use a reassuring and professional tone throughout the conversation.",
    firstMessage: "Hello! I'm your customer support assistant. I'm here to help resolve any issues you're experiencing. Could you please describe what's happening?"
  },
  {
    id: "appointment-scheduler",
    title: "Appointment Scheduler",
    icon: Clock,
    description: "An efficient agent that helps book and manage appointments",
    prompt: "You are an efficient appointment scheduling assistant. Your primary role is to help callers book, reschedule, or cancel appointments. Maintain a professional and friendly demeanor while being direct and efficient with the caller's time. Ask for essential information needed for appointments, such as name, preferred date and time, contact information, and reason for the appointment. Confirm details before finalizing, and clearly communicate next steps. If the requested time is not available, offer alternatives.",
    firstMessage: "Hello! I'm the appointment scheduling assistant. I'd be happy to help you book, reschedule, or cancel an appointment. How can I assist you today?"
  },
];

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function NewAgent() {
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useSWR<{ voices: { id: string, name: string, tags: string, demo: string, gender: string, accent: string }[] }>("/api/voices", fetcher);
  const allVoices = data?.voices ?? [];
  const [creatingAgent, setCreatingAgent] = useState(false);
  const [voiceSearch, setVoiceSearch] = useState("");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("custom");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [voiceFilter, setVoiceFilter] = useState<{gender?: string, accent?: string}>({});

  // Filter voices based on search and filters
  const filteredVoices = allVoices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(voiceSearch.toLowerCase()) ||
                        voice.tags.toLowerCase().includes(voiceSearch.toLowerCase());
    const matchesGender = !voiceFilter.gender || voice.gender === voiceFilter.gender;
    const matchesAccent = !voiceFilter.accent || voice.accent === voiceFilter.accent;

    return matchesSearch && matchesGender && matchesAccent;
  });

  // Get unique genders and accents for filters
  const genders = Array.from(new Set(allVoices.map(voice => voice.gender)));
  const accents = Array.from(new Set(allVoices.map(voice => voice.accent)));

  const form = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      description: "",
      voice_id: "",
      first_message: "Hello! I'm here to assist you today. How can I help you?",
      system_prompt: "You are a friendly and professional AI assistant. Your goal is to provide helpful, accurate information and assist users with their queries in a conversational manner.",
      template_id: "",
    }
  });

  const selectedVoiceId = form.watch("voice_id");

  const handlePlayVoice = (voiceId: string, demoUrl: string) => {
    if (playingVoice === voiceId) {
      // Stop playing
      const audioElements = document.getElementsByTagName('audio');
      for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
      }
      setPlayingVoice(null);
    } else {
      // Stop any currently playing audio
      const audioElements = document.getElementsByTagName('audio');
      for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
      }

      // Play the selected voice
      const audio = new Audio(demoUrl);
      audio.onended = () => setPlayingVoice(null);
      audio.play();
      setPlayingVoice(voiceId);
    }
  };

  const applyTemplate = (templateId: string) => {
    const template = agentTemplates.find(t => t.id === templateId);
    if (template) {
      form.setValue("system_prompt", template.prompt);
      form.setValue("first_message", template.firstMessage);
      form.setValue("template_id", templateId);
      setSelectedTemplate(templateId);
    }
  };

  const onSubmit = async (payload: z.infer<typeof agentSchema>) => {
    try {
      setCreatingAgent(true);
      const { template_id, ...submitData } = payload;

      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create agent");
      }

      const data = await response.json();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating agent:", error);
      // Would handle error state/notification in real app
    } finally {
      setCreatingAgent(false);
    }
  };

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 h-fit max-h-screen overflow-y-auto bg-background">
        <DashboardHeader />

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-1">

              <h1 className="text-2xl sm:text-3xl font-bold">Create AI Voice Agent</h1>
            </div>
            <p className="text-muted-foreground mb-8 ">
              Design your AI voice agent with personality and voice to represent your brand
            </p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariant}
            >
              <Tabs defaultValue="custom" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="custom" className="gap-2">
                      <Bot className="h-4 w-4" />
                      Custom Agent
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="gap-2">
                      <Star className="h-4 w-4" />
                      Templates
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="templates" className="space-y-6">
                  <motion.div variants={fadeInUpVariant}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          Agent Templates
                        </CardTitle>
                        <CardDescription>
                          Choose a pre-configured template as a starting point for your AI voice agent
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {agentTemplates.map((template) => {
                            const Icon = template.icon;
                            return (
                              <Card
                                key={template.id}
                                className={cn(
                                  "cursor-pointer transition-all hover:shadow-md",
                                  selectedTemplate === template.id && "border-primary"
                                )}
                                onClick={() => {
                                  applyTemplate(template.id);
                                  setSelectedTab("custom");
                                }}
                              >
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-base flex items-center gap-2">
                                    <Icon className="h-5 w-5 text-primary" />
                                    {template.title}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4">
                                  <p className="text-sm text-muted-foreground">{template.description}</p>
                                </CardContent>
                                <CardFooter className="pt-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs w-full"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      applyTemplate(template.id);
                                      setSelectedTab("custom");
                                    }}
                                  >
                                    Use Template
                                  </Button>
                                </CardFooter>
                              </Card>
                            );
                          })}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-6 flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Select a template and customize it, or continue with a blank agent
                        </p>
                        <Button
                          variant="default"
                          onClick={() => setSelectedTab("custom")}
                        >
                          Continue to Customize
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Agent Identity */}
                      <motion.div variants={fadeInUpVariant}>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Bot className="h-5 w-5 text-primary" />
                              Agent Identity
                            </CardTitle>
                            <CardDescription>
                              Basic information about your AI voice agent
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Agent Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Sales Assistant, Support Agent" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    A recognizable name that reflects this agent's purpose
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description (optional)</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={2}
                                      placeholder="A brief description of this agent's role and purpose"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Helps you identify this agent's purpose in your dashboard
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Voice Selection */}
                      <motion.div variants={fadeInUpVariant}>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Volume2 className="h-5 w-5 text-primary" />
                              Voice Selection
                            </CardTitle>
                            <CardDescription>
                              Choose the perfect voice for your AI agent
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Search voices by name or tags..."
                                  className="pl-10"
                                  value={voiceSearch}
                                  onChange={(e) => setVoiceSearch(e.target.value)}
                                />
                              </div>

                              {/* <div className="flex gap-2">
                                <select
                                  className="bg-background border rounded-md px-2 py-2 text-sm"
                                  value={voiceFilter.gender || ""}
                                  onChange={(e) => setVoiceFilter(prev => ({
                                    ...prev,
                                    gender: e.target.value || undefined
                                  }))}
                                >
                                  <option value="">All Genders</option>
                                  {genders.map(gender => (
                                    <option key={gender} value={gender}>{gender}</option>
                                  ))}
                                </select>

                                <select
                                  className="bg-background border rounded-md px-2 py-2 text-sm"
                                  value={voiceFilter.accent || ""}
                                  onChange={(e) => setVoiceFilter(prev => ({
                                    ...prev,
                                    accent: e.target.value || undefined
                                  }))}
                                >
                                  <option value="">All Accents</option>
                                  {accents.map(accent => (
                                    <option key={accent} value={accent}>{accent}</option>
                                  ))}
                                </select>
                              </div> */}
                            </div>

                            {filteredVoices.length === 0 && (
                              <div className="text-center py-10 border border-dashed rounded-lg">
                                <Volume2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                {allVoices.length === 0 ? (
                                  <p className="text-muted-foreground">Loading available voices...</p>
                                ) : (
                                  <p className="text-muted-foreground">No voices match your search criteria</p>
                                )}
                              </div>
                            )}

                            <FormField
                              control={form.control}
                              name="voice_id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <ScrollArea className="h-[340px] pr-3 rounded-lg">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {filteredVoices.map(voice => (
                                          <div
                                            key={voice.id}
                                            className={cn(
                                              "border rounded-lg p-4 cursor-pointer transition-colors",
                                              field.value === voice.id
                                                ? "border-primary bg-primary/5"
                                                : "hover:bg-muted/50"
                                            )}
                                            onClick={() => field.onChange(voice.id)}
                                          >
                                            <div className="flex justify-between items-start mb-3">
                                              <div className="flex items-center gap-3">
                                                <div className={cn(
                                                  "h-4 w-4 rounded-full border flex items-center justify-center",
                                                  field.value === voice.id
                                                    ? "border-primary bg-primary"
                                                    : "border-muted-foreground"
                                                )}>
                                                  {field.value === voice.id && (
                                                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                                                  )}
                                                </div>
                                                <div>
                                                  <p className="font-medium">{voice.name}</p>
                                                  <div className="flex gap-2 mt-1">
                                                    <Badge variant="outline" className="text-xs">
                                                      {voice.gender}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                      {voice.accent}
                                                    </Badge>
                                                  </div>
                                                </div>
                                              </div>

                                              <TooltipProvider>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <Button
                                                      type="button"
                                                      variant="ghost"
                                                      size="icon"
                                                      className="rounded-full h-8 w-8"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePlayVoice(voice.id, voice.demo);
                                                      }}
                                                    >
                                                      {playingVoice === voice.id ? (
                                                        <PauseCircle className="h-5 w-5 text-primary" />
                                                      ) : (
                                                        <PlayCircle className="h-5 w-5" />
                                                      )}
                                                    </Button>
                                                  </TooltipTrigger>
                                                  <TooltipContent>
                                                    {playingVoice === voice.id ? "Pause" : "Play sample"}
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                              {voice.tags}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </ScrollArea>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Agent Behavior */}
                      <motion.div variants={fadeInUpVariant}>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MessageSquare className="h-5 w-5 text-primary" />
                              Agent Personality & Behavior
                            </CardTitle>
                            <CardDescription>
                              Define how your agent communicates and responds
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <FormField
                              control={form.control}
                              name="first_message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Message</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={2}
                                      placeholder="The greeting your agent will use when starting conversations"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    This is how your agent will begin each conversation
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="system_prompt"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>System Prompt</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={6}
                                      placeholder="Detailed instructions that define your agent's personality, knowledge, and how it should respond"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Define your agent's behavior, knowledge, tone, and how it handles different scenarios
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="bg-muted/40 p-4 rounded-lg">
                              <Accordion type="single" collapsible>
                                <AccordionItem value="tips">
                                  <AccordionTrigger className="text-sm font-medium">
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    Tips for effective system prompts
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="space-y-2 text-sm text-muted-foreground ml-6 list-disc">
                                      <li>Define the agent's personality traits (friendly, professional, empathetic)</li>
                                      <li>Specify knowledge limits and how to handle unknown questions</li>
                                      <li>Provide industry-specific terminology the agent should use</li>
                                      <li>Include examples of good responses for common scenarios</li>
                                      <li>Set conversational style (concise vs detailed, formal vs casual)</li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-6 flex justify-end gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => router.push('/dashboard')}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              disabled={creatingAgent}
                              className="gap-2"
                            >
                              {creatingAgent ? (
                                <>Creating...</>
                              ) : (
                                <>
                                  <Save className="h-4 w-4" />
                                  Create Agent
                                </>
                              )}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
