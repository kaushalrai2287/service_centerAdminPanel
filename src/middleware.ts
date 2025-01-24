// // import { type NextRequest } from "next/server";
// // ;
// // import { updateSession } from "../utils/supabase/middleware";

// // export async function middleware(request: NextRequest) {
// //   if (request.nextUrl.pathname === "/forgot-password" || request.nextUrl.pathname === "/update-password") {
// //     return; 
// //   }
  

// //   return await updateSession(request);
// // }


// // export const config = {
// //   matcher: [
// //     "/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
// //     "/"
   
// //   ],
// // };
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "../utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Allow password reset & confirmation pages to be accessed
  if (pathname === "/forgot-password" || pathname === "/update-password" || pathname.startsWith("/auth/confirm")) {
    return NextResponse.next(); // Let the request pass
  }

  // ✅ Apply session update for all other routes
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
  ],
};
