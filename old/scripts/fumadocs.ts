import { Effect, Logger } from "effect";

import { Command } from "@effect/platform";

const fumadocsCommand = Command.make("fumadocs-mdx");

const main = Effect.gen(function* (_) {
  // Run the FumaDocs cli command fumadocs-mdx
  const logger = yield* _(Logger);
});
