import React from "react";
import { auth } from "@/auth";
import SignInButton from "./signin";
import UserDetails from "./UserDetails";
import SignOutButton from "./signout";
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
		<div className="grow flex flex-col justify-between h-full">
			{children}
			<div className="flex flex-row justify-center">
				<UserDetails />
				<SignOutButton />
			</div>
		</div>
	);
};

export default AuthComponent;
