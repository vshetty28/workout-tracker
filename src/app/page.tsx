import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Workout Tracker",
};
export default async function Home() {
	return (
		<div className="lg:w-1/4">
			<div className="text-center flex flex-col gap-5 mt-10">
				<Link href="/log-workout" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
					Log Workout
				</Link>
				<Link href="/workouts" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
					Workouts
				</Link>
				<Link href="/exercise-report" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
					Exercise Report
				</Link>
			</div>
		</div>
	);
}
