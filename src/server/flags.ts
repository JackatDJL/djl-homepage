import { flag } from "flags/next";

export const devModeFlag = flag({
  key: "dev-mode",
  description: "Overwrites some difficult Stuff",
  defaultValue: false,
  decide() {
    return process.env.NODE_ENV === "development";
  },
});
