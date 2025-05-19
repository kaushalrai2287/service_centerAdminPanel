// import { createClient } from "../../../../utils/supabase/client";
// import { NextResponse } from "next/server";

// const supabase = createClient();

// export async function POST(req: Request) {
//   const { token, user_id } = await req.json();

//   if (!token || !user_id) {
//     return NextResponse.json({ error: "Token and user ID are required" }, { status: 400 });
//   }

//   const { data, error } = await supabase
//     .from("fcm_token")
//     .upsert([{ user_id, token }], { onConflict: "user_id" });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ message: "Token saved successfully", data });
// }
// import { createClient } from "../../../../utils/supabase/client";
// import { NextResponse } from "next/server";

// const supabase = createClient();

// export async function POST(req: Request) {
//   const { token, user_id } = await req.json();

//   if (!token || !user_id) {
//     return NextResponse.json({ error: "Token and user ID are required" }, { status: 400 });
//   }

//   // Log the request data to debug
//   console.log('Received token and user_id:', { token, user_id });

//   const { data, error } = await supabase
//     .from("fcm_tokens")
//     .upsert([{ user_id, token }], { onConflict: "user_id" });

//   if (error) {
//     console.error('Supabase error:', error);  // Log the full error object
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ message: "Token saved successfully", data });
// }
// import { createClient } from "../../../../utils/supabase/client";
// import { NextResponse } from "next/server";

// const supabase = createClient();

// export async function POST(req: Request) {
//   const { token, user_id } = await req.json();

//   if (!token || !user_id) {
//     return NextResponse.json({ error: "Token and user ID are required" }, { status: 400 });
//   }

//   console.log("Received token:", token, "User ID:", user_id);

//   // Check if token already exists
//   const { data: existingToken } = await supabase
//     .from("fcm_tokens")
//     .select("token")
//     .eq("user_id", user_id)
//     .eq("token", token)
//     .single();

//   if (!existingToken) {
//     const { error } = await supabase.from("fcm_tokens").insert([{ user_id, token }]);
//     if (error) {
//       console.error("Supabase error:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//   }

//   return NextResponse.json({ message: "Token saved successfully" });
// }
// import { createClient } from "../../../../utils/supabase/client";
// import { NextResponse } from "next/server";

// const supabase = createClient();

// export async function POST(req: Request) {
//   const { token, user_id } = await req.json();

//   if (!token || !user_id) {
//     return NextResponse.json(
//       { error: "Token and user ID are required" },
//       { status: 400 }
//     );
//   }

//   console.log("Received token:", token, "User ID:", user_id);

//   // Save or update token using upsert
//   const { error } = await supabase
//   .from("service_centers")
//   .upsert(
//     { auth_id: user_id, token }, 
//     { onConflict: "auth_id" }
//   );
//   if (error) {
//     console.error("Supabase error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ message: "Token saved/updated successfully" });
// }
import { createClient } from "../../../../utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function POST(req: Request) {
  const { token, user_id } = await req.json();

  if (!token || !user_id) {
    return NextResponse.json(
      { error: "Token and user ID are required" },
      { status: 400 }
    );
  }

  console.log("Received token:", token, "User ID:", user_id);

  // First, check if the auth_id exists in the service_centers table
  const { data: existing, error: selectError } = await supabase
    .from("service_centers")
    .select("service_center_id")
    .eq("auth_id", user_id)
    .maybeSingle();

  if (selectError) {
    console.error("Supabase select error:", selectError);
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }

  if (!existing) {
    return NextResponse.json(
      { error: "Service center not found for the given auth_id" },
      { status: 404 }
    );
  }

  // Update the token
  // const { error: updateError } = await supabase
  //   .from("service_centers")
  //   .update({ token })
  //   .eq("auth_id", user_id);
  const { error: updateError } = await supabase
    .from("fcm_tokens")
    .update({ token })
    .eq("user_id", user_id);
  if (updateError) {
    console.error("Supabase update error:", updateError);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Token updated successfully" });
}
