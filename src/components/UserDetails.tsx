import React from "react";
import Image from "next/image";
import { auth } from "@/lib/auth";
const UserDetails = async ({session}) => {
	//const session = await auth();
	if (!session?.user) {
		return <div className="m-5">Not Logged In.</div>;
	} else {
		return (
			<div className="flex flex-row justify-center items-center gap-1 lg:gap-3">
				<Image src={session?.user?.image} alt="user image" className="rounded-full size-6 lg:size-10" width={200} height={200} />
				<h1 className="text-xs lg:text-base">{session?.user?.name}</h1>
			</div>
		);
	}
};

export default UserDetails;
