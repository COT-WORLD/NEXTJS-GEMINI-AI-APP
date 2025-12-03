"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
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
  const { toast } = useToast();
  const router = useRouter();

  //zod implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.email,
      password: data.password,
    });
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect email or password",
        variant: "destructive",
      });
    } else if (result?.ok) {
      router.push("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex-grow grid place-items-center px-4">
        <Card className="relative w-[480px] overflow-hidden">
          <CardHeader>
            <CardTitle>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Join AnonMessage
              </h1>
            </CardTitle>
            <CardDescription>
              Sign in to start your AnonMessage advanture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email/Username</FormLabel>
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

                <Button type="submit">Login</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-center mt-4">
              <p>
                Wants to register?{" "}
                <Link
                  href={"/sign-up"}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign up
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
    </>
  );
};

export default Page;
