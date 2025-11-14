"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // First, check if email exists in the system
      const checkResponse = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const checkData = await checkResponse.json();

      if (!checkData.exists) {
        setError(
          "This email is not registered. Please sign up first to create an account."
        );
        setIsLoading(false);
        return;
      }

      // Email exists, proceed with sending magic link
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        // Redirect to verify page with email parameter
        window.location.href = `/auth/verify?email=${encodeURIComponent(email)}`;
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a magic link to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive space-y-2">
                <p>{error}</p>
                {error.includes("not registered") && (
                  <p>
                    <Link
                      href="/auth/signup"
                      className="font-medium underline hover:no-underline"
                    >
                      Sign up here
                    </Link>
                  </p>
                )}
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                Check your email for a sign-in link!
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send magic link"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
