import React from "react";
import { signIn } from "next-auth/react";
const SignInButton = () => {
	return (
		<button className="btn btn-primary" onClick={() => signIn()}>
			Sign In
		</button>
	);
};

export default SignInButton;
