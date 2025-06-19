"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
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
import { Loader2 } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const debouncedUsername= useDebouncevalue(username, 300)
  const [debouncedUsername] = useDebounceValue(username, 500);

  const { toast } = useToast();

  const router = useRouter();

  //zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.replace(`/sign-in`);
      }
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow grid place-items-center px-4">
      <Card className="relative w-[480px] overflow-hidden">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join AnonMessage
            </h1>
          </CardTitle>
          <CardDescription>
            Sign up to start your AnonMessage advanture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    <p
                      className={`text-sm ${usernameMessage === "Username is unique and available" ? "text-green-500" : "text-red-500"}`}
                    >
                      {usernameMessage}
                    </p>
                    <FormMessage />
                  </FormItem>

                  //TODo: video time 5:59:17
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
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
  );
};

export default Page;
