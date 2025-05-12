import { authClient } from "@/server/auth/auth-client";
import { IconSignOut } from "@/_components/Icons";

export function SignOut() {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <button type="button" onClick={handleSignOut} title="Sign out" aria-label="Sign out">
      <IconSignOut />
    </button>
  );
}
