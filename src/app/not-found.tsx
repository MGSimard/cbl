import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main id="not-found">
      <section>
        <h1>NOT FOUND</h1>
        <h2 className="no-select">404</h2>
        <Link href="/" className="link">
          RETURN HOME
        </Link>
      </section>
    </main>
  );
}
