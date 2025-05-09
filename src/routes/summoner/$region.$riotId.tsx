import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/summoner/$region/$riotId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/summoner/$region/$riotId"!</div>
}
