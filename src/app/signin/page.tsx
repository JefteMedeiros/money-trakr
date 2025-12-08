import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, providerMap, signIn } from "@/auth";
import { Logo } from "@/components/logo";

export default async function SignIn(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (session) return redirect("/");

  const queryParams = new URLSearchParams(searchParams as any).toString();

  const oauthAccountNotLinked = queryParams.includes("OAuthAccountNotLinked");

  return (
    <main className="bg-gray-900 w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col items-center text-white max-w-96 mt-32 mx-6">
        <Logo />
        <p className="mt-12 text-center">
          Para continuar, faça login com uma das opções abaixo.
        </p>
        <div className="flex flex-col w-full gap-2 bg-gray-800 p-4 rounded-md mt-6">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                await signIn(provider.id);
              }}
            >
              <button
                className="flex w-full items-center gap-4 justify-start bg-gray-900 px-4 h-12 rounded-md hover:bg-gray-700 hover:cursor-pointer transition-colors"
                type="submit"
              >
                <Image
                  src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                  alt={`${provider.name}`}
                  width={24}
                  height={24}
                />
                <span>Entrar com {provider.name}</span>
              </button>
            </form>
          ))}
        </div>
        {oauthAccountNotLinked && (
          <p className="mt-6 text-center text-red-400">
            O e-mail utilizado nesta opção já foi associado a uma conta
          </p>
        )}
      </div>
    </main>
  );
}
