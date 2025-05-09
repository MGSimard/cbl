# Community Ban List (CBL)

## Task List

- [x] Scaffolding
- [x] Basic OAuth
- [x] Identity (Color Palette, Logos, Metadata, Fonts, etc)
- [x] Utility Routes (404, Error Page)
- [x] Datasets
- [ ] Homepage
  - [x] Summoner Search (Riot ID)
  - [ ] Search by PUUID
- [x] Summoner Profiles
  - [x] Sidebar
  - [x] Match History (Match data, Cards, etc)
  - [x] Copy identifer functionality
  - [ ] Account status
  - [ ] Refresh button
  - [ ] Potentially other stats
  - [ ] Evidence panel (Approved Reports)
  - [ ] Appeal system
- [x] Ratelimiting
- [x] Migrate to TanStack Start
- [ ] Report feature
  - [ ] Dialog Form (PUUID, Current Username, Offense, Evidence, Message, Report Author)
  - [ ] Server Function (Auth, Rate limit, Validation, DB write, Stale Cache)
  - [ ] .ROFL file sanitation
- [ ] Admin Dashboard
  - [ ] RBAC
  - [ ] Table of offenders
  - [ ] Reports panel, stats, etc
  - [ ] Approve/Deny reports, cancel evidence, ban false reporters
- [ ] ...
- [ ] Check React Compiler compatibility with TanStack Start
- [ ] ...
- [ ] Animation pass
- [ ] Reserve domain
- [ ] Twitter OAuth
- [ ] Microsoft OAuth
- [ ] Metadata pass
- [ ] Adjust OAuth vars & callback URLs
- [ ] Deploy
- [ ] ...
- [ ] Download old clients to view old replays (https://replays.xyz/old-clients)
- [ ] Download ReplayBook (https://www.fraxiinus.dev/ReplayBook/)

## Tech Stack

- TanStack Start (TSRouter, TSQuery)
- React (Compiler Enabled)
- TypeScript
- Neon (PostgreSQL)
- Redis (Sessions, Ratelimit)
- Drizzle ORM
- Better Auth
- Zod
- ESLint (Flat Config)
- t3-oss/env
- Node
- pnpm
- Netlify (Hosting)
