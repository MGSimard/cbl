"use client";
import { authClient } from "@/server/auth/auth-client";
export function SignOut() {
  return (
    <button type="button" onClick={() => authClient.signOut()}>
      SignOut
    </button>
  );
}
