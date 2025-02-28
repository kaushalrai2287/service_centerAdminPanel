import { NextResponse } from "next/server";
// import { createClient } from "../../../../utils/supabase/client";
import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

export async function POST(request:any) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .select("user_type")
      .eq("auth_id", userId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user_type: data.user_type }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

