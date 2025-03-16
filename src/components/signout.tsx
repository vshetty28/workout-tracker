import React from "react";
import { signOutAction } from "@/actions";
import { auth } from "@/auth";

const SignOutButton = async () => {
	const session = await auth();
	if (!session?.user) {
		return <></>;
	}
	return (
		<form action={signOutAction} className="m-5">
			<button className="btn btn-primary" type="submit">
				Sign Out
			</button>
		</form>
	);
};

export default SignOutButton;
