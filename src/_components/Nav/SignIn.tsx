import { authClient } from "@/server/auth/auth-client";
import { IconSignIn } from "@/_components/Icons";
import { useLocation } from "@tanstack/react-router";

export function SignIn() {
  const location = useLocation();

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: location.pathname,
    });
  };

  return (
    <button type="button" onClick={handleSignIn} title="Sign in with Google" aria-label="Sign in with Google">
      <IconSignIn />
    </button>
  );
}
