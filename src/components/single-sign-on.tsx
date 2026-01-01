"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

interface Props {
  provider: {
    id: string;
    name: string;
  };
}

export function SingleSignOn({ provider }: Props) {
  return (
    <Button
      className="gap-2 hover:cursor-pointer"
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
  );
}
