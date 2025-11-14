import { setSignupName } from "@/lib/signup-helper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    if (name && typeof name === "string") {
      await setSignupName(name);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to store signup name" },
      { status: 500 }
    );
  }
}

