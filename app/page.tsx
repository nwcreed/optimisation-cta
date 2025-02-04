"use client";
import { signIn } from "next-auth/react";
import {Button} from "@/components/ui/button"

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
