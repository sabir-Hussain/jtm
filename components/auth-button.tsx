"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Signed in as {session.user.email}
        </span>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button asChild>
      <Link href="/auth/login">Sign in</Link>
    </Button>
  );
}

