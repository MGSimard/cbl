import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main id="not-found">
      <h1>
        <span id="nf-one" className="no-select">
          404
        </span>
        <span id="nf-two">NOT FOUND</span>
      </h1>
      <Link href="/" className="btn-primary-action">
        <span>RETURN HOME</span>
      </Link>
    </main>
  );
}
