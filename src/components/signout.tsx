import React from 'react'
import { signOut } from 'next-auth/react';
const SignOutButton = () => {
  return (
		<button className="btn btn-primary" onClick={() => signOut()}>
			Sign Out
		</button>
	);
}

export default SignOutButton