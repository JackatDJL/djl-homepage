import { auth } from "@clerk/nextjs/server";
import { dedupe, flag } from "flags/next";
import posthog from "posthog-js";

const identify = dedupe(() => {
  const user = auth();
  return user;
});

export const earlyAccessFlag = flag({
  key: "early-access",
  description: "Idk yet",
  identify,
  defaultValue: false,
  decide() {
    return !!posthog.isFeatureEnabled("early-access");
  },
});

export const dropdownHeaderFlag = flag({
  key: "dropdown-header",
  description: "Shows a Dropdown with the Featured Blogposts and Projects",
  defaultValue: false,
  identify,
  decide() {
    return !!posthog.isFeatureEnabled("dropdown-header");
  },
});

export const devModeFlag = flag({
  key: "dev-mode",
  description: "Overwrites some difficult Stuff",
  defaultValue: false,
  decide() {
    return process.env.NODE_ENV === "development";
  },
});
