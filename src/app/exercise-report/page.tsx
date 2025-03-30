import React from "react";
import { getAllExercises } from "@/actions";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Exercise Report",
};
const ExerciseReport = async () => {
	const exercises: any = await getAllExercises();
	return (
		<div>
			<div className="overflow-x-auto text-pretty rounded-box border border-base-content/5 bg-base-100">
				<table className="table">
					<thead>
						<tr>
							<th>Exercise</th>
							<th>Target</th>
							<th>Workout</th>
							<th>Date</th>
							<th>Duration</th>
						</tr>
					</thead>
					<tbody>
						{exercises.map((exercise) => (
							<tr key={exercise.exercise_id}>
								<th>{exercise.exercise}</th>
								<td>{exercise.target}</td>
								<td>{exercise.workout}</td>
								<td>{exercise.date.toLocaleDateString()}</td>
								<td>{exercise.duration}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ExerciseReport;
