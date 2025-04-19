// import { createClient } from "../../../../utils/supabase/client";
// import { NextResponse } from "next/server";

// const supabase = createClient();

// export async function GET(request: Request) {
//   try {
//     const authHeader = request.headers.get("Authorization");
//     const token = authHeader?.split(" ")[1]; 

//     if (!token) {
//       return NextResponse.json(
//         { message: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     // Validate token and fetch user
//     const { data, error } = await supabase.auth.getUser(token);

//     if (error || !data?.user) {
//       return NextResponse.json(
//         { message: "Unauthorized: Invalid token" },
//         { status: 401 }
//       );
//     }

//     const supabase_id = data.user.id; 
//     console.log("Supabase ID:", supabase_id);

//     const { data: userPermission, error: userPermissionError } = await supabase
//       .from("service_center_user_permission_map")
//       .select("service_center_permissions(name)")
//       .eq("auth_id", supabase_id);

//     if (userPermissionError || !userPermission) {
//       return NextResponse.json(
//         { message: "Failed to fetch permissions" },
//         { status: 500 }
//       );
//     }

//     // Extract only permission names into an array
//     const permissions = userPermission.map((item:any) => item.service_center_permissions.name);

//     return NextResponse.json({ permissions });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { createClient } from "../../../../utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Validate token and fetch user
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const supabase_id = data.user.id;
    // console.log("Supabase ID:", supabase_id);

    // Fetch permissions for the user
    const { data: userPermission, error: userPermissionError } = await supabase
      .from("service_center_users_permissions")
      .select("*")
      .eq("auth_id", supabase_id)
      .single();

    if (userPermissionError || !userPermission) {
      return NextResponse.json(
        { message: "Failed to fetch permissions" },
        { status: 500 }
      );
    }

    // Extract only keys where value is 'YES'
    const permissions = Object.entries(userPermission)
      .filter(([key, value]) => value === "YES" && key !== "id" && key !== "auth_id" && key !== "created_at")
      .map(([key]) => key);

    return NextResponse.json({ permissions });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
