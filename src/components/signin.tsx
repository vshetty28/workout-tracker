import { signInAction } from "@/lib/actions";

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
