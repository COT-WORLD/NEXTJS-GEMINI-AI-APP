"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-4 md:p-6 shadow-md relative">
      <div className="container mx-auto flex md:flex-row justify-between items-center relative">
        <Link href="/">
          <span className="text-xl font-bold mb-4 md:mb-0 cursor-pointer">
            AnonMessage
          </span>
        </Link>
        {session ? (
          <>
            <div className="absolute left-1/2 -translate-x-1/2 text-center text-sm md:text-base font-medium">
              <span className="">
                Welcome <b>{(user?.username || user?.email)?.toUpperCase()}</b>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="w-full md:w-auto" onClick={() => signOut()}>
                Logout
              </Button>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                <Sun
                  className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    resolvedTheme === "dark"
                      ? "scale-0 rotate-90"
                      : "scale-100 rotate-0"
                  }`}
                />
                <Moon
                  className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    resolvedTheme === "dark"
                      ? "scale-100 rotate-0"
                      : "scale-0 -rotate-90"
                  }`}
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button className="w-full md:w-auto">Login</Button>
              </Link>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                <Sun
                  className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    resolvedTheme === "dark"
                      ? "scale-0 rotate-90"
                      : "scale-100 rotate-0"
                  }`}
                />
                <Moon
                  className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    resolvedTheme === "dark"
                      ? "scale-100 rotate-0"
                      : "scale-0 -rotate-90"
                  }`}
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
