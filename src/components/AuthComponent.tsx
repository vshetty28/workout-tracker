import React from "react";
import { auth } from "@/lib/auth";
import SignInButton from "./signin";
import UserDetails from "./UserDetails";
import SignOutButton from "./signout";
import Link from "next/link";

const AuthComponent = async ({ children }) => {
	const session = await auth();
	if (!session?.user) {
		return (
			<div className="flex flex-col justify-center items-center text-2xl h-screen">
				<h1 className="font-bold m-5">Please sign in to use the Workout Tracker!</h1>
				<SignInButton />
			</div>
		);
	}
	return (
		<div className="grow flex flex-col h-full w-full items-center bg-background">
			<div className=" sticky top-0 bg-base-300 shadow-sm z-50 flex flex-col lg:flex-row w-screen justify-between items-center lg:px-5 m-2 mb-6">
				<div className="flex-1 invisible"></div>
				<Link href="/" className="flex-1 p-2">
					<h1 className="text-4xl lg:text-6xl text-center text-nowrap text-primary font-bold my-2 lg:my-5">Workout Tracker</h1>
				</Link>
				<div className="flex-1 flex flex-row justify-end gap-2 lg:gap-4">
					<UserDetails />
					<SignOutButton />
				</div>
			</div>
			{children}
		</div>
	);
};

export default AuthComponent;
