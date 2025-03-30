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
			<div className="flex flex-row justify-center items-center gap-3">
				<Image src={session?.user?.image} alt="user image" className="rounded-full size-10" width={200} height={200} />
				<h1>{session?.user?.name}</h1>
			</div>
		);
	}
};

export default UserDetails;
