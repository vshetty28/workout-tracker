import React from "react";
import { getAllExercises } from "@/actions";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Exercise Report",
};
const ExerciseReport = async () => {
	const exercises: any = await getAllExercises();
	const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Other"];
	const formatDate = (date: Date) => {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	};

	return (
		<div className="flex flex-col gap-2">
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
							<tr key={exercise.exercise_id + "_" + exercise.workout_id}>
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
			<div tabIndex={0} className="collapse collapse-arrow border-primary border">
				<input type="checkbox" />
				<div className="collapse-title font-semibold text-center">Filter Options</div>
				<div className="collapse-content">
					<form className="flex flex-col gap-4">
						<div className="flex flex-row w-full gap-2">
							<fieldset className="grow fieldset">
								<legend className="fieldset-legend">Start Date</legend>
								<input type="date" name="date" className="input validator w-full" min="1950-01-01" max={formatDate(new Date())} defaultValue={"1950-01-01"} required />
							</fieldset>
							<fieldset className="grow fieldset">
								<legend className="fieldset-legend">End Date</legend>
								<input type="date" name="date" className="input validator w-full" min="1950-01-01" max={formatDate(new Date())} defaultValue={formatDate(new Date())} required />
							</fieldset>
						</div>
						<fieldset className="fieldset flex flex-row ">
							<legend className="fieldset-legend">Duration</legend>
							<label className="input validator">
								Minimum
								<input type="number" name="hours" className="text-center" min="0" max="1440" defaultValue={0} />
							</label>
							<label className="input validator">
								Maximum
								<input type="number" name="minutes" className="text-center" min="0" max="1440" defaultValue={1440} />
							</label>
						</fieldset>
						<fieldset className="grow fieldset">
							<legend className="fieldset-legend">Target</legend>
							<select name="target" className="select w-full" defaultValue={"Pick a muscle group"}>
								<option disabled={true}>Pick a muscle group</option>
								{muscleGroups.map((muscle) => (
									<option key={muscle}>{muscle}</option>
								))}
							</select>
						</fieldset>
						<button className="btn btn-primary" type="submit">
							Filter
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ExerciseReport;
