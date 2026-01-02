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
    <main className="w-screen h-screen flex flex-col justify-center items-center relative">
      {/* Background with blur */}
      <div className="fixed inset-0 -z-10 bg-[url('/bg-shape-light.png')] dark:bg-[url('/bg-shape.png')] bg-cover bg-center bg-no-repeat blur-3xl" />

      <div className="max-w-80 w-full">
        <div className="flex flex-col items-center gap-3 mb-5">
          <Logo />
          <p className="text-center">
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
