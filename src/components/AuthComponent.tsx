import React from "react";
import { auth } from "@/auth";
import SignInButton from "./signin";
import UserDetails from "./UserDetails";
import SignOutButton from "./signout";
import Link from "next/link";

const AuthComponent = async ({ children }) => {
	const session = await auth();
	if (!session?.user) {
		return (
			<div className="flex flex-col mt-2 text-2xl ">
				<h1 className="font-bold m-5">Please sign in to use the Workout Tracker!</h1>
				<SignInButton />
			</div>
		);
	}
	return (
		<div className="grow flex flex-col h-full w-full items-center">
			<div className="sticky top-0 bg-base-100 z-50 flex flex-row w-screen justify-between items-center px-5">
				<div className="flex-1 invisible"></div>
				<Link href="/" className="flex-1 p-2">
					<h1 className="lg:text-6xl text-center text-primary font-bold transition duration-200 ease-in-out hover:scale-105 my-5">Workout Tracker</h1>
				</Link>
				<div className="flex-1 flex flex-row justify-end gap-4">
					<UserDetails />
					<SignOutButton />
				</div>
			</div>
			{children}
		</div>
	);
};

export default AuthComponent;
