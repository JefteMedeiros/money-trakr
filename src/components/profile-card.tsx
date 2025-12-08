"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

interface Props {
	session: Session | null;
}

export function ProfileCard({ session }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 hover:text-white px-3 text-white h-12 border-none focus-visible:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-gray-800  focus-visible:ring-purple-400"
					variant="outline"
				>
					<div className="w-8 h-8 md:w-10 md:h-10 relative">
						<Image
							className="rounded-full"
							referrerPolicy="no-referrer"
							src={session?.user.image as string}
							fill
							alt="User"
						/>
					</div>
					<span className="text-md">{session?.user?.name}</span>
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
					onClick={() => signOut()}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
