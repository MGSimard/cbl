import { authClient } from "@/server/auth/auth-client";
import { IconSignIn } from "@/_components/Icons";

export function SignIn() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <button type="button" onClick={handleSignIn} title="Sign in with Google" aria-label="Sign in with Google">
      <IconSignIn />
    </button>
  );
}
