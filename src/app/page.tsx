
import Image from "next/image";
import SignInButton from "@/components/signin";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/signout";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { auth } from "@/auth";
export default async function Home() {
	return (
		<div className="text-center flex flex-col gap-5 mt-10">
			<Link href="/log-workout" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
				Log Workout
			</Link>
			<Link href="/workouts" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
				Workouts
			</Link>
		</div>
	);
}
