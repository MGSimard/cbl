"use client";
import { authClient } from "@/server/auth/auth-client";

export function SignIn() {
  return (
    <button
      type="button"
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
        })
      }>
      SignIn
    </button>
  );
}
