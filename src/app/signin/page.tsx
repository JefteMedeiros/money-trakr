import { Logo } from "@/components/logo";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SingleSignOn } from "@/components/single-sign-on";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return redirect("/");

  return (
    <main className="bg-gray-900 w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col items-center text-white max-w-96 mt-32 mx-6">
        <Logo />
        <p className="mt-12 text-center">
          Para continuar, faça login com uma das opções abaixo.
        </p>
        <div className="flex flex-col w-full gap-2 bg-gray-800 p-4 rounded-md mt-6">
          <SingleSignOn
            provider={{
              id: "google",
              name: "Google",
            }}
          />
        </div>
      </div>
    </main>
  );
}
