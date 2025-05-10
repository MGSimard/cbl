import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/server/auth/auth-client";

export const Route = createFileRoute("/testauth/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();

  return (
    <main>
      <h1>Hello "/testauth/"!</h1>

      <h2>User Email: {session?.user.email ?? "GUEST"}</h2>
      {session ? <SignOutButton /> : <SignInButton />}
    </main>
  );
}

function SignInButton() {
  const signIn = async () => {
    const data = await authClient.signIn.social({ provider: "google" });
  };

  return <button onClick={signIn}>Sign In Google Test</button>;
}

function SignOutButton() {
  const signOut = async () => {
    await authClient.signOut();
  };

  return <button onClick={signOut}>Sign Out</button>;
}
