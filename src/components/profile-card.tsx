"use client";

import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/glass/dropdown-menu";
import { Button } from "@/components/ui/glass/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/glass/avatar";
import { Skeleton } from "@/components/ui/glass/skeleton";

export function ProfileCard() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 hover:text-white px-3 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
          variant="outline"
        >
          <Avatar>
            <AvatarImage
              src={session?.user.image as string}
              alt={session?.user.name.slice(0, 1)}
            />
            <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          {isPending ? (
            <Skeleton className="h-5 w-20 rounded-md" />
          ) : (
            <span className="text-md">{session?.user?.name}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-56 bg-gray-900 border-gray-700 text-white"
      >
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="hover:cursor-pointer focus:bg-gray-700 focus:text-white"
          onClick={async () => {
            await authClient.signOut();
            window.location.href = "/signin";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
