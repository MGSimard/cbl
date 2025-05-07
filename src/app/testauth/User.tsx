"use client";
import { authClient } from "@/server/auth/auth-client";

export function User() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        <li>Email:{session?.user?.email}</li>
        <li>
          Image: <img src={`${session?.user?.image}`} alt="User" />
        </li>
      </ul>
    </div>
  );
}
