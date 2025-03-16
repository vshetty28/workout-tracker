
import Image from "next/image";
import SignInButton from "@/components/signin";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/signout";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { auth } from "@/auth";
export default async function Home() {
	const session = await auth();
	return (
		<div className="text-center">
			<Link href="/log-workout" className="btn btn-primary">Log Workout</Link>
		</div>
	);
}
