import React from "react";
import { auth } from "@/auth";
import SignInButton from "./signin";
import UserDetails from "./UserDetails";
import SignOutButton from "./signout";
const AuthComponent = async ({ children }) => {
	const session = await auth();
	if (!session?.user) {
		return (
			<div>
				<h1>Please Log In.</h1>
				<SignInButton />
			</div>
		);
	}
	return (
		<div className="grow flex flex-col justify-between h-full">
			{children}
			<div className="flex flex-row">
				<UserDetails />
				<SignOutButton />
			</div>
		</div>
	);
};

export default AuthComponent;
