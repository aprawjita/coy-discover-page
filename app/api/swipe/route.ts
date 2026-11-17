import { NextResponse } from "next/server";
import { recordSwipe } from "@/lib/discover-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profileId, direction } = body ?? {};

    if (typeof profileId !== "string" || (direction !== "like" && direction !== "pass")) {
      return NextResponse.json(
        { error: "profileId and direction are required." },
        { status: 400 }
      );
    }

    const result = await recordSwipe(profileId, direction);

    return NextResponse.json({
      createdMatch: Boolean(result.matched),
      matched: Boolean(result.matched),
      profile: result.profile,
    });
  } catch {
    return NextResponse.json({ error: "Unable to process swipe." }, { status: 500 });
  }
}
