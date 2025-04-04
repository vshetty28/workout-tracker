import React from "react";
import { signOutAction } from "@/lib/actions";
import { auth } from "@/lib/auth";

const SignOutButton = async () => {
	const session = await auth();
	if (!session?.user) {
		return <></>;
	}
	return (
		<form action={signOutAction}>
			<button className="btn btn-primary btn-xs lg:btn-md text-xs lg:text-base text-nowrap" type="submit">
				Sign Out
			</button>
		</form>
	);
};

export default SignOutButton;
