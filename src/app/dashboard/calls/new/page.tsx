export const dynamic = 'force-dynamic';   // skip any static prerender

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Bot, Phone, User, Upload, DownloadCloud } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const callSchema = z.object({
  agentId: z.string().min(1, "Please select an agent"),
  callType: z.enum(["direct", "contact", "bulk"]),
  phoneNumber: z.string().optional(),
  contactName: z.string().optional(),
  contactId: z.string().optional(),
  customMessage: z.string().optional(),
});

export default function NewCallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedAgentId = searchParams.get("agent");

  const [agents, setAgents] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [initiatingCall, setInitiatingCall] = useState(false);
  const [callResult, setCallResult] = useState<any>(null);
  const [callError, setCallError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof callSchema>>({
    resolver: zodResolver(callSchema),
    defaultValues: {
      agentId: preselectedAgentId || "",
      callType: "direct",
      phoneNumber: "",
      contactName: "",
      customMessage: "",
    },
  });

  const selectedCallType = form.watch("callType");
  const selectedAgentId = form.watch("agentId");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoadingAgents(true);
        const response = await fetch("/api/agents");

        if (!response.ok) {
          throw new Error("Failed to fetch agents");
        }

        const data = await response.json();
        const availableAgents = data.agents.filter((agent: any) => !agent.disabled);
        setAgents(availableAgents);
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoadingAgents(false);
      }
    };

    const fetchContacts = async () => {
      try {
        setLoadingContacts(true);
        const response = await fetch("/api/contacts");

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();
        setContacts(data.contacts || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoadingContacts(false);
      }
    };

    fetchAgents();
    fetchContacts();
  }, []);

  const onSubmit = async (values: z.infer<typeof callSchema>) => {
    try {
      setInitiatingCall(true);
      setCallResult(null);
      setCallError(null);

      const payload: any = {
        agentId: values.agentId,
      };

      if (values.callType === "direct") {
        payload.phoneNumber = values.phoneNumber;
        payload.contactName = values.contactName || "Customer";
        payload.customMessage = values.customMessage;
      } else if (values.callType === "contact") {
        if (!selectedContact) {
          throw new Error("No contact selected");
        }
        payload.phoneNumber = selectedContact.phoneNumber;
        payload.contactName = selectedContact.name;
        payload.contactId = selectedContact._id;
        payload.customMessage = values.customMessage;
      }

      const response = await fetch("/api/calls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to initiate call");
      }

      const result = await response.json();
      setCallResult(result);

      // Redirect to calls list after a short delay
      setTimeout(() => {
        router.push("/dashboard/calls");
      }, 3000);
    } catch (err: any) {
      console.error("Error initiating call:", err);
      setCallError(err.message);
    } finally {
      setInitiatingCall(false);
    }
  };

  const handleContactSelect = (contactId: string) => {
    const contact = contacts.find(c => c._id === contactId);
    setSelectedContact(contact);
    form.setValue("contactId", contactId);
  };

  const handleBulkUpload = async () => {
    if (!uploadFile || !selectedAgentId) return;

    try {
      setUploadLoading(true);
      setUploadResult(null);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("agentId", selectedAgentId);

      const response = await fetch("/api/calls", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to process CSV file");
      }

      const result = await response.json();
      setUploadResult(result);

      // Redirect to calls list after a short delay
      setTimeout(() => {
        router.push("/dashboard/calls");
      }, 3000);
    } catch (err: any) {
      console.error("Error uploading CSV:", err);
      setUploadError(err.message);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 h-fit max-h-screen overflow-y-auto bg-background">
        <DashboardHeader />

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Make a Call</h1>
            <p className="text-muted-foreground mb-8">
              Use your AI voice agent to make phone calls
            </p>

            {callResult ? (
              <Card className="border-green-600">
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call Initiated Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Your call has been queued and will begin shortly.</p>
                  <div className="bg-muted p-4 rounded-md mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Call ID:</div>
                      <div>{callResult.id || callResult.callId}</div>
                      <div className="font-medium">Status:</div>
                      <div>{callResult.status}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to call history...
                  </p>
                </CardContent>
              </Card>
            ) : uploadResult ? (
              <Card className="border-green-600">
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <DownloadCloud className="h-5 w-5" />
                    Bulk Upload Processed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{uploadResult.message}</p>
              <div className="bg-muted p-4 rounded-md mb-4">
                    <div className="text-sm mb-2">
                      <span className="font-medium">Processed:</span> {uploadResult.results.length} contacts
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Success:</span> {uploadResult.results.filter((r: any) => r.status !== 'failed').length} calls
                    </div>
                    {uploadResult.results.some((r: any) => r.status === 'failed') && (
                      <div className="text-sm text-destructive">
                        <span className="font-medium">Failed:</span> {uploadResult.results.filter((r: any) => r.status === 'failed').length} calls
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to call history...
                  </p>
                </CardContent>
              </Card>
            ) : callError ? (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error initiating call</AlertTitle>
                <AlertDescription>{callError}</AlertDescription>
              </Alert>
            ) : uploadError ? (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error processing CSV</AlertTitle>
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        Select Voice Agent
                      </CardTitle>
                      <CardDescription>
                        Choose which AI agent will handle this call
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loadingAgents ? (
                        <div className="space-y-2">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ) : agents.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground mb-2">You don't have any enabled agents</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push("/dashboard/agents")}
                          >
                            Manage Agents
                          </Button>
                        </div>
                      ) : (
                        <FormField
                          control={form.control}
                          name="agentId"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an agent" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {agents.map((agent) => (
                                      <SelectItem key={agent.agent_id} value={agent.agent_id}>
                                        {agent.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </CardContent>
                  </Card>

                  {selectedAgentId && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          Call Details
                        </CardTitle>
                        <CardDescription>
                          Specify who you want to call
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="callType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="direct" id="direct" />
                                    <label htmlFor="direct" className="font-medium cursor-pointer">
                                      Direct call to a phone number
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="contact" id="contact" />
                                    <label htmlFor="contact" className="font-medium cursor-pointer">
                                      Call an existing contact
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bulk" id="bulk" />
                                    <label htmlFor="bulk" className="font-medium cursor-pointer">
                                      Bulk upload (CSV)
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {selectedCallType === "direct" && (
                          <div className="mt-4 space-y-4">
                            <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="+1 (555) 123-4567"
                                      {...field}
                                      required
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Enter the full phone number including country code
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Name (optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="John Doe"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Name will be available to the AI agent
                                  </FormDescription>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customMessage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Custom Message (optional)</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Any specific instructions for the AI to follow during this call"
                                      rows={3}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Additional context or instructions for this specific call
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        {selectedCallType === "contact" && (
                          <div className="mt-4 space-y-4">
                            {loadingContacts ? (
                              <div className="space-y-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                              </div>
                            ) : contacts.length === 0 ? (
                              <div className="text-center py-4">
                                <p className="text-muted-foreground mb-2">You don't have any contacts</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push("/dashboard/contacts/new")}
                                >
                                  Add Contact
                                </Button>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <FormLabel className="mb-2 block">Select Contact</FormLabel>
                                  <Select onValueChange={handleContactSelect}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a contact" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {contacts.map((contact) => (
                                        <SelectItem key={contact._id} value={contact._id}>
                                          {contact.name} ({contact.phoneNumber})
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                {selectedContact && (
                                  <div className="p-4 bg-muted rounded-md">
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <div className="font-medium">{selectedContact.name}</div>
                                        <div className="text-sm text-muted-foreground">{selectedContact.phoneNumber}</div>
                                      </div>
                                    </div>
                                    {selectedContact.company && (
                                      <div className="text-sm mb-1">
                                        <span className="font-medium">Company:</span> {selectedContact.company}
                                      </div>
                                    )}
                                    {selectedContact.email && (
                                      <div className="text-sm mb-1">
                                        <span className="font-medium">Email:</span> {selectedContact.email}
                                      </div>
                                    )}
                                    {selectedContact.tags && selectedContact.tags.length > 0 && (
                                      <div className="flex items-center gap-2 mt-2">
                                        {selectedContact.tags.map((tag: string) => (
                                          <Badge key={tag} variant="outline">{tag}</Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}

                                <FormField
                                  control={form.control}
                                  name="customMessage"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Custom Message (optional)</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Any specific instructions for the AI to follow during this call"
                                          rows={3}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Additional context or instructions for this specific call
                                      </FormDescription>
                                    </FormItem>
                                  )}
                                />
                              </>
                            )}
                          </div>
                        )}

                        {selectedCallType === "bulk" && (
                          <div className="mt-6">
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                              <Upload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
                              <h3 className="font-medium mb-2">Upload CSV File</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Your CSV should include columns for name and phone_number
                              </p>

                              <div className="flex justify-center">
                                <Input
                                  type="file"
                                  accept=".csv"
                                  className="max-w-xs"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setUploadFile(e.target.files[0]);
                                    }
                                  }}
                                />
                              </div>

                              {uploadFile && (
                                <div className="mt-4 bg-muted/50 rounded-md p-2 text-sm">
                                  <div className="font-medium">{uploadFile.name}</div>
                                  <div className="text-muted-foreground">
                                    {(uploadFile.size / 1024).toFixed(2)} KB
                                  </div>
                                </div>
                              )}

                              <Separator className="my-6" />

                              <Button
                                type="button"
                                disabled={!uploadFile || uploadLoading}
                                onClick={handleBulkUpload}
                                className="gap-2"
                              >
                                {uploadLoading ? (
                                  "Processing..."
                                ) : (
                                  <>
                                    <DownloadCloud className="h-4 w-4" />
                                    Upload and Process
                                  </>
                                )}
                              </Button>
                            </div>

                            <div className="mt-4 p-4 border rounded-md bg-amber-50 text-amber-800 text-sm">
                              <p className="font-medium mb-1">CSV Format Requirements:</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Must include columns: name, phone_number</li>
                                <li>Optional columns: email, company, notes, tags</li>
                                <li>Phone numbers should include country code</li>
                                <li>For tags, use comma-separated values</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </CardContent>

                      {(selectedCallType === "direct" || selectedCallType === "contact") && (
                        <CardFooter className="border-t pt-6 flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/calls")}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={
                              initiatingCall ||
                              (selectedCallType === "contact" && !selectedContact) ||
                              (selectedCallType === "direct" && !form.watch("phoneNumber"))
                            }
                            className="gap-2"
                          >
                            {initiatingCall ? (
                              "Initiating Call..."
                            ) : (
                              <>
                                <Phone className="h-4 w-4" />
                                Make Call
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  )}
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
