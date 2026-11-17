import { NextResponse } from "next/server";
import { getMutualMatches } from "@/lib/discover-store";

export async function GET() {
  const matches = await getMutualMatches();
  return NextResponse.json({ matches });
}
