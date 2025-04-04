import { signInAction } from "@/lib/actions";
import React from "react";
const SignInButton = async () => {
	return (
		<form action={signInAction}>
			<button className="btn btn-primary" type="submit">
				Sign In
			</button>
		</form>
	);
};

export default SignInButton;
