import Link from "next/link";
export default async function Home() {
	return (
		<div className="text-center flex flex-col gap-5 mt-10">
			<Link href="/log-workout" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
				Log Workout
			</Link>
			<Link href="/workouts" className="btn btn-primary transition duration-200 ease-in-out hover:scale-105">
				Workouts
			</Link>
		</div>
	);
}
