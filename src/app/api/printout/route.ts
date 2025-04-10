import { NextResponse } from "next/server";
import { devModeFlag } from "~/server/flags";
import { getCurrentPath, getHeaders } from "~/server/foundation-router";

export async function GET() {
  // Check if development mode is enabled
  const dev = await devModeFlag();

  // Only allow access in development mode
  if (!dev) {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 },
    );
  }

  const headersObject = await getHeaders();
  const current = await getCurrentPath();
  return NextResponse.json({
    headers: headersObject,
    currentPath: current,
    timestamp: new Date().toISOString(),
  });
}
