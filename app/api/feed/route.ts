import { NextResponse } from "next/server";
import { getFeedProfiles } from "@/lib/discover-store";

export async function GET() {
  const profiles = await getFeedProfiles();
  return NextResponse.json({ profiles });
}
