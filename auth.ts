import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db/db";

const providers: Provider[] = [GitHub, Google];

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers,
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;
			return session;
		},
	},
	pages: {
		signIn: "/signin",
	},
});

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});
