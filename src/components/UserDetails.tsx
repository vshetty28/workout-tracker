import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/auth";
const UserDetails = async () => {
	const session = await auth();
	if (!session?.user) {
		return <div className="m-5">Not Logged In.</div>;
	} else {
		return (
			<div className="flex flex-row justify-center items-center m-5 gap-4">
				<img src={session?.user?.image} alt="user image" className="rounded-full size-10"/>
				<h1>{session?.user?.name}</h1>
			</div>
		);
	}
};

export default UserDetails;
