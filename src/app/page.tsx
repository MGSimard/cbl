"use client";
import SumSearch from "@/components/SumSearch";
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
          router.push("/");
        },
      },
    });
  };

  return (
    <main id="hero" className="dot-pattern-overlay">
      <section>
        <h1>COMMUNITY BAN LIST</h1>
        <img className="decorator-hr-lg" src="/assets/decorator-hr-lg.png" alt="" />
        <SumSearch />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Amet consectetur adipisicing elit.
          Quisquam, quos.
        </p>
      </section>
    </main>
  );
}
