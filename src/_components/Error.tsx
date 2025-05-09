import { Link } from "@tanstack/react-router";

export function Error({ error }: { error: Error }) {
  return (
    <main id="not-found">
      <h1>
        <span id="nf-one" className="no-select">
          ERROR
        </span>
        <span id="nf-two">AN ERROR OCCURRED</span>
      </h1>
      <p id="error-message">{error.message}</p>
      <Link to="/" className="btn-primary-action">
        <span>RETURN HOME</span>
      </Link>
    </main>
  );
}
