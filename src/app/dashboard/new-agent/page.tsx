"use client";

import { useState, useRef } from "react";
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
import {
  Search,
  Save,
  ArrowLeft,
  PlayCircle,
  PauseCircle,
  Bot,
  UserRoundCheck,
  HelpCircle,
  Clock,
  Lightbulb,
  Sparkles,
  Mic,
  Settings,
  ChevronRight,
  Volume2,
  Wand2,
  User,
  Globe,
  CalendarCheck,
  Calendar
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
// Add these new templates to the agentTemplates array:

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
  {
    id: "lead-qualification",
    title: "Lead Qualification",
    icon: User,
    description: "A strategic agent that qualifies leads based on specific criteria",
    prompt: "You are a lead qualification specialist. Your goal is to determine if the person you're speaking with is a good fit for our products/services based on specific qualification criteria. Ask thoughtful, strategic questions to understand their needs, budget, timeline, decision-making authority, and current pain points. Be conversational rather than interrogative. Look for signals that indicate whether they're a high-quality lead worth pursuing. When appropriate, explain how our solution addresses their specific needs. Remain professional and avoid being pushy. For qualified leads, offer to connect them with a sales representative for more detailed information.",
    firstMessage: "Hi there! Thanks for your interest in [Company]. I'd like to learn a bit about your needs to see how we might be able to help. Could you tell me what brought you to us today?"
  },
  {
    id: "followup-scheduler",
    title: "Followup Scheduler",
    icon: Calendar,
    description: "A persistent agent that schedules follow-up calls and nurtures leads",
    prompt: "You are a follow-up scheduling specialist. Your role is to re-engage with prospects who have previously shown interest but haven't converted yet. Be friendly but persistent, reminding them of previous interactions without being pushy. Your main objective is to schedule a follow-up call or meeting with the appropriate team member. Ask about any changes in their situation or needs since the last contact. Address any concerns or objections tactfully. If they're not ready to schedule, identify when it would be appropriate to follow up again. Be helpful and professional throughout, focusing on providing value rather than just making a sale.",
    firstMessage: "Hello! I'm following up regarding your previous interest in [Company/Product]. I wanted to check in and see if you'd like to schedule some time to discuss how we can help you achieve your goals. How have things progressed since we last spoke?"
  },
  {
    id: "booking-agent",
    title: "Booking Agent",
    icon: CalendarCheck,
    description: "A specialized agent focused on seamless booking experiences",
    prompt: "You are a booking agent specializing in seamless reservation experiences. Your primary responsibility is to help customers make, modify, or cancel bookings efficiently. Guide callers through the booking process step by step, asking for all necessary information in a logical order. Clearly explain all options, availability, pricing, and policies. Suggest appropriate alternatives if first choices aren't available. Confirm all details before finalizing any booking. When dealing with changes or cancellations, be sympathetic yet clear about any applicable policies or fees. Maintain a professional, helpful attitude throughout the conversation, ensuring the customer feels valued regardless of the complexity of their request.",
    firstMessage: "Hello! I'm your booking assistant at [Company]. Whether you're looking to make a new reservation, modify an existing one, or have questions about our availability, I'm here to help. What type of booking would you like to discuss today?"
  },
];


const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function NewAgent() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR<{ voices: { id: string, name: string, tags: string, demo: string }[] }>("/api/voices", fetcher);
  const allVoices = data?.voices || [];

  const [creatingAgent, setCreatingAgent] = useState(false);
  const [voiceSearch, setVoiceSearch] = useState("");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Filter voices based on search
  const filteredVoices = allVoices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(voiceSearch.toLowerCase()) ||
      voice.tags.toLowerCase().includes(voiceSearch.toLowerCase());
    return matchesSearch;
  });

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

  // Update the handlePlayVoice function to properly handle pausing:

  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const handlePlayVoice = (voiceId: string, demoUrl: string) => {
    if (playingVoice === voiceId) {
      // Currently playing - pause it
      if (audioRef) {
        audioRef.pause();
      }
      setPlayingVoice(null);
    } else {
      // Stop any currently playing audio
      if (audioRef) {
        audioRef.pause();
      }

      // Play the selected voice
      const audio = new Audio(demoUrl);
      audio.onended = () => setPlayingVoice(null);
      audio.play().catch(err => console.error("Error playing audio:", err));
      setAudioRef(audio);
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

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating agent:", error);
    } finally {
      setCreatingAgent(false);
    }
  };

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardHoverVariant = {
    hover: {
      y: -5,
      boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 h-screen overflow-y-auto bg-background">
        <DashboardHeader />

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                  onClick={() => router.push('/dashboard')}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                </Button>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Create AI Voice Agent</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Design your conversational AI assistant with a natural voice
                </p>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariant}
            >
              {/* Template Selection Section */}
              <motion.div variants={fadeInUpVariant} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Start with a Template</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {agentTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <motion.div
                        key={template.id}
                        whileHover="hover"
                        variants={cardHoverVariant}
                      >
                        <Card
                          className={cn(
                            "cursor-pointer transition-all border h-full",
                            selectedTemplate === template.id && "ring-2 ring-primary"
                          )}
                          onClick={() => applyTemplate(template.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>{template.title}</CardTitle>
                            <CardDescription className="text-sm">
                              {template.description}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                applyTemplate(template.id);
                              }}
                            >
                              <Wand2 className="h-3.5 w-3.5" />
                              Use this template
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-2 mt-6 mb-4">
                  <Separator className="flex-1" />
                  <span className="text-xs font-medium text-muted-foreground px-2">OR CREATE CUSTOM AGENT</span>
                  <Separator className="flex-1" />
                </div>
              </motion.div>

              {/* Main Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Applied Template Alert */}
                  {selectedTemplate && (
                    <motion.div
                      variants={fadeInUpVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      <Card className="bg-primary/5 border /20">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Using "{agentTemplates.find(t => t.id === selectedTemplate)?.title}" template</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Template settings applied. Continue customizing below.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Agent Identity */}
                  <motion.div variants={fadeInUpVariant}>
                    <Card className="border shadow-sm pt-0 overflow-hidden">
                      <CardHeader className="border-b bg-muted/30 pt-6">
                        <div className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-primary" />
                          <CardTitle>Agent Identity</CardTitle>
                        </div>
                        <CardDescription>
                          Define your AI assistant's name and purpose
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Agent Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Sales Assistant, Support Agent"
                                  className="border-muted"
                                  {...field}
                                />
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
                              <FormLabel>Description (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={2}
                                  placeholder="A brief description of this agent's role and purpose"
                                  className="resize-none border-muted"
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
                    <Card className="border shadow-sm pt-0 overflow-hidden">
                      <CardHeader className="border-b bg-muted/30 pt-6">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-5 w-5 text-primary" />
                          <CardTitle>Voice Selection</CardTitle>
                        </div>
                        <CardDescription>
                          Choose the perfect voice for your AI agent
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search voices by name or attributes..."
                            className="pl-10 border-muted"
                            value={voiceSearch}
                            onChange={(e) => setVoiceSearch(e.target.value)}
                          />
                        </div>

                        {selectedVoiceId && (
                          <div className="bg-primary/5 rounded-md p-3 flex items-center justify-between border border /20">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Mic className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{allVoices.find(v => v.id === selectedVoiceId)?.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {allVoices.find(v => v.id === selectedVoiceId)?.tags}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="h-8"
                              onClick={() => {
                                const voice = allVoices.find(v => v.id === selectedVoiceId);
                                if (voice) {
                                  handlePlayVoice(voice.id, voice.demo);
                                }
                              }}
                            >
                              {playingVoice === selectedVoiceId ? (
                                <>
                                  <PauseCircle className="h-4 w-4 mr-1" /> Pause
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="h-4 w-4 mr-1" /> Preview
                                </>
                              )}
                            </Button>
                          </div>
                        )}

                        {isLoading ? (
                          <div className="text-center py-12 border border-dashed rounded-lg">
                            <Volume2 className="h-8 w-8 mx-auto text-muted-foreground mb-3 animate-pulse" />
                            <p className="text-muted-foreground">Loading available voices...</p>
                          </div>
                        ) : filteredVoices.length === 0 ? (
                          <div className="text-center py-12 border border-dashed rounded-lg">
                            <Volume2 className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                            <p className="text-muted-foreground">No voices match your search criteria</p>
                          </div>
                        ) : (
                          // For the voice selection portion:

                          <FormField
                            control={form.control}
                            name="voice_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="grid grid-cols-1 md:grid-cols-1 h-full overflow-y-scroll scrollbar-hidden max-h-[250px] w-full gap-3">
                                    {filteredVoices
                                      .sort((a, b) => {
                                        // Sort function to prioritize standard and indian voices
                                        const aIsStandard = a.tags.toLowerCase().includes('standard');
                                        const bIsStandard = b.tags.toLowerCase().includes('standard');
                                        const aIsIndian = a.tags.toLowerCase().includes('indian');
                                        const bIsIndian = b.tags.toLowerCase().includes('indian');

                                        // Priority order: Standard first, then Indian, then others
                                        if (aIsStandard && !bIsStandard) return -1;
                                        if (!aIsStandard && bIsStandard) return 1;
                                        if (aIsIndian && !bIsIndian) return -1;
                                        if (!aIsIndian && bIsIndian) return 1;
                                        return 0;
                                      })
                                      .map(voice => (
                                        <motion.div
                                          key={voice.id}
                                          whileHover={{ scale: 1.02 }}
                                          transition={{ duration: 0.2 }}
                                          className={cn(
                                            "border scale-[98%]  rounded-lg p-4 cursor-pointer transition-colors",
                                            field.value === voice.id
                                              ? "border  bg-primary/5"
                                              : "hover:bg-muted/50"
                                          )}
                                          onClick={() => field.onChange(voice.id)}
                                        >
                                          <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                              <div className={cn(
                                                "h-4 w-4 rounded-full flex items-center justify-center",
                                                field.value === voice.id
                                                  ? "border-2 border "
                                                  : "border-2 border-muted"
                                              )}>
                                                {field.value === voice.id && (
                                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                                )}
                                              </div>
                                              <div>
                                                <p className="font-medium">{voice.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                  {voice.tags}
                                                </p>
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
                                                  {playingVoice === voice.id ? "Pause" : "Preview voice"}
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </div>
                                        </motion.div>
                                      ))}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Agent Behavior */}
                  <motion.div variants={fadeInUpVariant}>
                    <Card className="border shadow-sm pt-0 overflow-hidden">
                      <CardHeader className="border-b bg-muted/30 pt-6">
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5 text-primary" />
                          <CardTitle>Agent Behavior</CardTitle>
                        </div>
                        <CardDescription>
                          Define how your agent communicates and responds
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-5">
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
                                  className="resize-none border-muted"
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
                                  rows={8}
                                  placeholder="Detailed instructions that define your agent's personality, knowledge, and how it should respond"
                                  className="resize-none border-muted"
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

                        <div className="mt-2">
                          <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                            <AccordionItem value="tips" className="border-none">
                              <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:bg-muted/30 hover:no-underline">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Lightbulb className="h-4 w-4 text-primary" />
                                  Tips for creating effective prompts
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4 bg-muted/10">
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
                    </Card>
                  </motion.div>

                  {/* Submit Section */}
                  <motion.div variants={fadeInUpVariant} className="flex justify-end space-x-4 mt-8">
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
                      className="gap-2 min-w-[160px]"
                    >
                      {creatingAgent ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 border-2 border-foreground/20 border-t-foreground/100 rounded-full"
                          />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Create Voice Agent
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
