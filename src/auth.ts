import { auth as betterAuthInstance } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function auth() {
  const session = await betterAuthInstance.api.getSession({
    headers: await headers(),
  });
  return session;
}

export const handlers = toNextJsHandler(betterAuthInstance);

export const providerMap = [{ id: "google", name: "Google" }];

export async function signIn(providerId: string) {
  const callbackUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
  redirect(`/api/auth/signin/${providerId}?callbackURL=${callbackUrl}`);
}
