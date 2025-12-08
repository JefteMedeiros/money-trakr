import { auth as betterAuthInstance } from "./lib/auth";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  return betterAuthInstance.handler(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
