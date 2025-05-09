import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main id="not-found">
      <h1>
        <span id="nf-one" className="no-select">
          404
        </span>
        <span id="nf-two">NOT FOUND</span>
      </h1>
      <Link to="/" className="btn-primary-action">
        <span>RETURN HOME</span>
      </Link>
    </main>
  );
}
