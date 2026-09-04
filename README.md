# DJL Foundation

The public site for DJL Foundation, an independent project umbrella and archive created by Jack Ruder.

DJL Foundation is not currently a formally incorporated foundation or registered association.

## Stack

- TanStack Start
- React and TypeScript
- Tailwind CSS
- Nitro with a Vercel-compatible configuration

## Local development

```sh
bun install
bun run dev
```

Run `bun run build`, `bun run typecheck`, and `bun run lint` before publishing.

## Editing the catalogue

Project records live in [src/content/projects.ts](src/content/projects.ts). Add a typed entry there. Keep unknown dates, statuses, and links explicit instead of guessing.
