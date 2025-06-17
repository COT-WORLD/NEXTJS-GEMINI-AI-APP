"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Message() {
  const [suggestedMessages, setSuggestedMessages] = useState([]);
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post(`/api/send-message`, {
        username: params.username,
        content: data.content,
      });
      if (response.data.success) {
        toast({
          title: "Message sent succesfully",
          variant: "default",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error in sending message to user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "Message send to user failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const fecthAIMessage = async () => {
    try {
      const response = await axios.get(`/api/suggest-messages`);
      if (response.data.success) {
        setSuggestedMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error while retriving messages from AI", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "Retriving messages from AI failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="flex-grow grid place-items-center px-4">
        <Card className="relative w-[800px] overflow-hidden">
          <CardHeader>
            <CardTitle>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Public Profile Link
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Send Anonymous Message to @{params.username}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous message here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Send It</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <Button onClick={fecthAIMessage}>Suggest Messages</Button>
            <h1>Click on any message below to select it.</h1>

            <div className="w-full p-2 space-y-4 shadow-md">
              <h1 className="text-xl font-extrabold tracking-tight mb-6">
                Messages
              </h1>
              {suggestedMessages.length > 0 ? (
                suggestedMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    onClick={() =>
                      form.setValue("content", message, {
                        shouldValidate: true,
                      })
                    }
                  >
                    {message}
                  </Button>
                ))
              ) : (
                <p>No messages to display</p>
              )}
            </div>
          </CardFooter>
          <BorderBeam
            duration={6}
            size={400}
            className="from-transparent via-red-500 to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            size={400}
            className="from-transparent via-blue-500 to-transparent"
          />
        </Card>
      </div>
    </>
  );
}

export default Message;
