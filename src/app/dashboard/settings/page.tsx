"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Bell,
  Globe,
  Palette,
  Phone,
  Volume2,
  UserCog,
  BellRing,
  Moon,
  Sun,
  CheckCircle,
  Loader2,
  Database,
  Play,
  Radio,
  Languages,
  Check,
  RefreshCw,
} from "lucide-react";

// Notification settings schema
const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  callCompletions: z.boolean(),
  callFailures: z.boolean(),
  marketingEmails: z.boolean(),
  weeklyReports: z.boolean(),
});

// Appearance settings schema
const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  density: z.enum(["compact", "default", "comfortable"]),
  animations: z.boolean(),
});

// Voice settings schema
const voiceSettingsSchema = z.object({
  defaultVoiceId: z.string(),
  defaultAgent: z.string(),
  speakingRate: z.string(),
  defaultMessage: z.string().max(500, {
    message: "Default message cannot exceed 500 characters",
  }),
});

export default function SettingsPage() {
  const { user } = useAuth();
  const [settingsTab, setSettingsTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form hooks for different settings tabs
  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      callCompletions: true,
      callFailures: true,
      marketingEmails: false,
      weeklyReports: true,
    },
  });

  const appearanceForm = useForm<z.infer<typeof appearanceSchema>>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: "system",
      density: "default",
      animations: true,
    },
  });

  const voiceSettingsForm = useForm<z.infer<typeof voiceSettingsSchema>>({
    resolver: zodResolver(voiceSettingsSchema),
    defaultValues: {
      defaultVoiceId: "",
      defaultAgent: "",
      speakingRate: "medium",
      defaultMessage: "Hello, this is an automated call from {company}. I'm calling about...",
    },
  });

  const onSaveNotifications = async (data: z.infer<typeof notificationSchema>) => {
    try {
      setIsSaving(true);
      // Mock API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Notification settings saved:", data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving notification settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveAppearance = async (data: z.infer<typeof appearanceSchema>) => {
    try {
      setIsSaving(true);
      // Mock API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Appearance settings saved:", data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving appearance settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const onSaveVoiceSettings = async (data: z.infer<typeof voiceSettingsSchema>) => {
    try {
      setIsSaving(true);
      // Mock API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Voice settings saved:", data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving voice settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto h-fit max-h-screen bg-background">
        <DashboardHeader />

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your application preferences
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
          >
            <Tabs value={settingsTab} onValueChange={setSettingsTab} className="w-full">
              <TabsList className="grid grid-cols-4 max-w-[600px] mb-6">
                <TabsTrigger value="general">
                  <Settings className="h-4 w-4 mr-2" /> General
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Palette className="h-4 w-4 mr-2" /> Appearance
                </TabsTrigger>
                <TabsTrigger value="voice">
                  <Volume2 className="h-4 w-4 mr-2" /> Voice
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Language & Region
                      </CardTitle>
                      <CardDescription>
                        Configure language and regional preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en-US">
                          <SelectTrigger id="language" className="mt-1">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="en-GB">English (UK)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select defaultValue="America/New_York">
                          <SelectTrigger id="timezone" className="mt-1">
                            <SelectValue placeholder="Select time zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                            <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select defaultValue="MM/DD/YYYY">
                          <SelectTrigger id="dateFormat" className="mt-1">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button size="sm">Save Changes</Button>
                    </CardFooter>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <UserCog className="h-5 w-5 text-primary" />
                          Account Preferences
                        </CardTitle>
                        <CardDescription>
                          General account settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Session Timeout</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically log out after inactivity
                            </p>
                          </div>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-refresh dashboard</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically update dashboard data
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-muted-foreground" />
                            <Select defaultValue="60">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select interval" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 seconds</SelectItem>
                                <SelectItem value="60">1 minute</SelectItem>
                                <SelectItem value="300">5 minutes</SelectItem>
                                <SelectItem value="never">Never</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Database className="h-5 w-5 text-primary" />
                          Data Management
                        </CardTitle>
                        <CardDescription>
                          Manage your data and exports
                        </CardDescription>
</CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Automatic Backups</Label>
                            <p className="text-sm text-muted-foreground">
                              Regularly backup your contacts and calls
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Retention</Label>
                            <p className="text-sm text-muted-foreground">
                              How long to keep call recordings
                            </p>
                          </div>
                          <Select defaultValue="90">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">6 months</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                              <SelectItem value="forever">Forever</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            Export All Data
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BellRing className="h-5 w-5 text-primary" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form onSubmit={notificationForm.handleSubmit(onSaveNotifications)} className="space-y-6">
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base font-medium">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="ml-6 space-y-4">
                          <FormField
                            control={notificationForm.control}
                            name="callCompletions"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel>Call Completions</FormLabel>
                                  <FormDescription>
                                    Notifications when calls are completed
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={!notificationForm.watch("emailNotifications")}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={notificationForm.control}
                            name="callFailures"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel>Call Failures</FormLabel>
                                  <FormDescription>
                                    Notifications when calls fail
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={!notificationForm.watch("emailNotifications")}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <Separator />

                        <FormField
                          control={notificationForm.control}
                          name="marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base font-medium">Marketing Emails</FormLabel>
                                <FormDescription>
                                  Receive product updates and marketing material
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationForm.control}
                          name="weeklyReports"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base font-medium">Weekly Reports</FormLabel>
                                <FormDescription>
                                  Receive weekly summary of your activity
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center justify-between pt-4">
                          {saveSuccess && (
                            <p className="text-sm text-success flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Settings saved successfully
                            </p>
                          )}
                          <Button
                            type="submit"
                            className="ml-auto"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Interface Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize the look and feel of the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...appearanceForm}>
                      <form onSubmit={appearanceForm.handleSubmit(onSaveAppearance)} className="space-y-6">
                        <FormField
                          control={appearanceForm.control}
                          name="theme"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Theme</FormLabel>
                              <FormDescription>
                                Select your preferred color theme
                              </FormDescription>
                              <div className="grid grid-cols-3 gap-4 pt-2">
                                <FormControl>
                                  <div className="space-y-2">
                                    <button
                                      type="button"
                                      className={cn(
                                        "w-full rounded-lg border-2 p-4 flex flex-col items-center gap-2",
                                        field.value === "light"
                                          ? "border-primary"
                                          : "border-border"
                                      )}
                                      onClick={() => field.onChange("light")}
                                    >
                                      <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center border">
                                        <Sun className="h-8 w-8 text-primary" />
                                      </div>
                                      <span className="text-sm font-medium">Light</span>
                                      {field.value === "light" && (
                                        <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>

                                <FormControl>
                                  <div className="space-y-2">
                                    <button
                                      type="button"
                                      className={cn(
                                        "w-full rounded-lg border-2 p-4 flex flex-col items-center gap-2",
                                        field.value === "dark"
                                          ? "border-primary"
                                          : "border-border"
                                      )}
                                      onClick={() => field.onChange("dark")}
                                    >
                                      <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center border">
                                        <Moon className="h-8 w-8 text-primary" />
                                      </div>
                                      <span className="text-sm font-medium">Dark</span>
                                      {field.value === "dark" && (
                                        <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>

                                <FormControl>
                                  <div className="space-y-2">
                                    <button
                                      type="button"
                                      className={cn(
                                        "w-full rounded-lg border-2 p-4 flex flex-col items-center gap-2",
                                        field.value === "system"
                                          ? "border-primary"
                                          : "border-border"
                                      )}
                                      onClick={() => field.onChange("system")}
                                    >
                                      <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center border">
                                        <div className="flex">
                                          <Sun className="h-8 w-8 text-primary" />
                                          <Moon className="h-8 w-8 text-primary -ml-4" />
                                        </div>
                                      </div>
                                      <span className="text-sm font-medium">System</span>
                                      {field.value === "system" && (
                                        <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Separator />

                        <FormField
                          control={appearanceForm.control}
                          name="density"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Density</FormLabel>
                              <FormDescription>
                                Change the density of the user interface
                              </FormDescription>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select interface density" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="compact">Compact</SelectItem>
                                  <SelectItem value="default">Default</SelectItem>
                                  <SelectItem value="comfortable">Comfortable</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={appearanceForm.control}
                          name="animations"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base font-medium">Animations</FormLabel>
                                <FormDescription>
                                  Enable interface animations and transitions
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center justify-between pt-4">
                          {saveSuccess && (
                            <p className="text-sm text-success flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Settings saved successfully
                            </p>
                          )}
                          <Button
                            type="submit"
                            className="ml-auto"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Voice Settings */}
              <TabsContent value="voice">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-primary" />
                      Voice Call Settings
                    </CardTitle>
                    <CardDescription>
                      Configure default voice preferences and call settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...voiceSettingsForm}>
                      <form onSubmit={voiceSettingsForm.handleSubmit(onSaveVoiceSettings)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={voiceSettingsForm.control}
                            name="defaultVoiceId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Default Voice</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a default voice" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="voice-1">Rachel (Female, US)</SelectItem>
                                    <SelectItem value="voice-2">Michael (Male, US)</SelectItem>
                                    <SelectItem value="voice-3">Emma (Female, UK)</SelectItem>
                                    <SelectItem value="voice-4">John (Male, UK)</SelectItem>
                                    <SelectItem value="voice-5">Sophie (Female, AU)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  The default voice to use when creating new agents
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={voiceSettingsForm.control}
                            name="defaultAgent"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Default Agent</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a default agent" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="NONE">No default agent</SelectItem>
                                    <SelectItem value="agent-1">Sales Assistant</SelectItem>
                                    <SelectItem value="agent-2">Lead Qualifier</SelectItem>
                                    <SelectItem value="agent-3">Appointment Scheduler</SelectItem>
                                    <SelectItem value="agent-4">Customer Support</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  The default agent to pre-select for new calls
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={voiceSettingsForm.control}
                          name="speakingRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Speaking Rate</FormLabel>
                              <div className="space-y-4">
                                <FormControl>
                                  <div className="grid grid-cols-3 gap-4">
                                    <button
                                      type="button"
                                      className={cn(
                                        "rounded-lg border-2 p-3 flex flex-col items-center",
                                        field.value === "slow"
                                          ? "border-primary"
                                          : "border-border"
                                      )}
                                      onClick={() => field.onChange("slow")}
                                    >
                                      <Play className="h-5 w-5 mb-1" />
                                      <span className="text-sm font-medium">Slow</span>
                                    </button>
                                    <button
                                      type="button"
                                      className={cn(
                                        "rounded-lg border-2 p-3 flex flex-col items-center",
                                        field.value === "medium"
                                          ? "border-primary"
                                          : "border-border"
                                      )}
                                      onClick={() => field.onChange("medium")}
                                    >
                                      <Play className="h-5 w-5 mb-1" />
                                      <span className="text-sm font-medium">Medium</span>
                                    </button>
                                    <button
                                      type="button"
                                      className={cn(
                                        "rounded-lg border-2 p-3 flex flex-col items-center",
                                        field.value === "fast"
                                          ? "border-primary"
                                          : "border-border"
                                      )}
                                      onClick={() => field.onChange("fast")}
                                    >
                                      <Play className="h-5 w-5 mb-1" />
                                      <span className="text-sm font-medium">Fast</span>
                                    </button>
                                  </div>
                                </FormControl>
                              </div>
                              <FormDescription>
                                Default speaking rate for AI voice agents
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={voiceSettingsForm.control}
                          name="defaultMessage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Introduction</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="min-h-[120px]"
                                  placeholder="Hello, this is an automated call from {company}. I'm calling about..."
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Default introduction message that agents will use. Use {'{company}'} as placeholder for company name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-base font-medium">Other Voice Settings</h3>

                          <div className="flex items-center justify-between border rounded-lg p-4">
                            <div className="space-y-0.5">
                              <Label>Call Recording</Label>
                              <p className="text-sm text-muted-foreground">
                                Automatically record all AI voice calls
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between border rounded-lg p-4">
                            <div className="space-y-0.5">
                              <Label>Call Transcription</Label>
                              <p className="text-sm text-muted-foreground">
                                Generate text transcripts of calls
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between border rounded-lg p-4">
                            <div className="space-y-0.5">
                              <Label>Voice Quality</Label>
                              <p className="text-sm text-muted-foreground">
                                Use higher quality voice synthesis (uses more credits)
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          {saveSuccess && (
                            <p className="text-sm text-success flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Settings saved successfully
                            </p>
                          )}
                          <Button
                            type="submit"
                            className="ml-auto"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Label component
function Label({ children, htmlFor }: { children: React.ReactNode, htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}
