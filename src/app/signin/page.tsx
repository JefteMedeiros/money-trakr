import { Logo } from "@/components/logo";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SingleSignOn } from "@/components/single-sign-on";
import { Separator } from "@/components/ui/glass/separator";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return redirect("/");

  return (
    <main className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center">
      <div className="max-w-80 w-full">
        <div className="flex flex-col items-center gap-3 mb-5">
          <Logo />
          <p className="text-center text-white">
            Para continuar, faça login com uma das opções abaixo
          </p>
        </div>
        <Separator />
        <div className="space-y-3 w-full mt-5">
          <SingleSignOn
            provider={{
              id: "google",
              name: "Google",
            }}
          />
          <SingleSignOn
            provider={{
              id: "github",
              name: "Github",
            }}
          />
        </div>
      </div>
    </main>
  );
}
