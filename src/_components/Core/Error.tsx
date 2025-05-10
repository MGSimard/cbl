import { Link, ErrorComponent } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

export function Error({ error }: ErrorComponentProps) {
  return (
    <main id="not-found">
      <h1>
        <span id="nf-one" className="no-select">
          ERROR
        </span>
        <span id="nf-two">AN ERROR OCCURRED</span>
      </h1>
      <ErrorComponent error={error} />
      <Link to="/" className="btn-primary-action">
        <span>RETURN HOME</span>
      </Link>
    </main>
  );
}
