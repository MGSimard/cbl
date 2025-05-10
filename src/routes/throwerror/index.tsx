import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/throwerror/")({
  component: RouteComponent,
});

function RouteComponent() {
  throw new Error("Test Error");
  return <main>Hello "/throwerror/"!</main>;
}
