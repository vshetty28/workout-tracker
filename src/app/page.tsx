"use client";

import Image from "next/image";
import SignInButton from "@/components/signin";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/signout";
import { signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	return (
		<div className="text-center">
			{session ? <SignOutButton /> : <SignInButton />}
			<h1 className="">{session?.user ? session.user.email : "Signed out."}</h1>
		</div>
	);
}
