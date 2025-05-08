"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Error",
};

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="not-found">
      <h1>
        <span id="nf-one" className="no-select">
          ERROR
        </span>
        <span id="nf-two">AN ERROR OCCURRED</span>
      </h1>
      <p id="error-message">{error.message}</p>
      <Link href="/" className="btn-primary-action">
        <span>RETURN HOME</span>
      </Link>
    </main>
  );
}
