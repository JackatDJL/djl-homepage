import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "~/server/flags";

// This function handles the authorization check for you
export const GET = createFlagsDiscoveryEndpoint(async (_request) => {
  const apiData = getProviderData(flags);

  // return the ApiData directly, without a NextResponse.json object.
  return apiData;
});
