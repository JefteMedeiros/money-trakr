"use client";

import Image from "next/image";
import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const providers = [
  {
    id: "google",
    name: "Google",
  },
];

export default function SignIn() {
  const router = useRouter();

  const { data: session, isPending, error } = authClient.useSession();

  if (session) {
    router.push("/");
  }

  return (
    <main className="bg-gray-900 w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col items-center text-white max-w-96 mt-32 mx-6">
        <Logo />
        <p className="mt-12 text-center">
          Para continuar, faça login com uma das opções abaixo.
        </p>
        <div className="flex flex-col w-full gap-2 bg-gray-800 p-4 rounded-md mt-6">
          {providers.map((provider) => (
            <Button
              className="gap-2 hover:cursor-pointer"
              disabled={isPending}
              key={provider.id}
              onClick={async () => {
                await authClient.signIn.social({ provider: provider.id });
              }}
            >
              <Image
                src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                alt={`${provider.name}`}
                width={24}
                height={24}
              />
              <span>Entrar com {provider.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
