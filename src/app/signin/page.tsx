import Image from "next/image";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const providers = [
  {
    id: "google",
    name: "Google",
  },
];

export default async function SignIn(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { data: session } = await authClient.getSession();

  if (session) return redirect("/");

  const error = searchParams?.error as string | undefined;

  return (
    <main className="bg-gray-900 w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col items-center text-white max-w-96 mt-32 mx-6">
        <Logo />
        <p className="mt-12 text-center">
          Para continuar, faça login com uma das opções abaixo.
        </p>
        <div className="flex flex-col w-full gap-2 bg-gray-800 p-4 rounded-md mt-6">
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href={`/api/auth/signin/${provider.id}`}
              className="flex w-full items-center gap-4 justify-start bg-gray-900 px-4 h-12 rounded-md hover:bg-gray-700 hover:cursor-pointer transition-colors"
            >
              <Image
                src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                alt={`${provider.name}`}
                width={24}
                height={24}
              />
              <span>Entrar com {provider.name}</span>
            </Link>
          ))}
        </div>
        {error && (
          <p className="mt-6 text-center text-red-400">
            {error === "OAuthAccountNotLinked"
              ? "O e-mail utilizado nesta opção já foi associado a uma conta"
              : "Ocorreu um erro ao tentar fazer login"}
          </p>
        )}
      </div>
    </main>
  );
}
