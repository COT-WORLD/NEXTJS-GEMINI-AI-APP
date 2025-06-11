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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function VerifyCode() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  //zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Error in verifying user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "User verified failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex-grow grid place-items-center px-4">
        <Card className="relative w-[510px] overflow-hidden">
          <CardHeader>
            <CardTitle>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Verify Your Account
              </h1>
            </CardTitle>
            <CardDescription>
              Enter the verification code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input placeholder="code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
            <div className="text-center mt-4">
              <p>
                Already a member?{" "}
                <Link
                  href={"/sign-in"}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardFooter> */}
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

export default VerifyCode;
