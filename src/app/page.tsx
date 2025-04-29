"use client";
import { authClient } from "@/server/auth/auth-client";
import { useRouter } from "next/navigation";

export default function PageHome() {
  const router = useRouter();

  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const signInDiscord = async () => {
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/",
    });
  };

  const signout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button type="button" onClick={signInGoogle}>
        Test Google OAuth
      </button>
      <button type="button" onClick={signInDiscord}>
        Test Discord OAuth
      </button>
      <button type="button" onClick={signout}>
        Sign Out
      </button>
    </div>
  );
}
