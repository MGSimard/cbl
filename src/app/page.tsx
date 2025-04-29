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
    <main id="hero">
      <section>
        <h1>Test</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </section>
    </main>
  );
}
