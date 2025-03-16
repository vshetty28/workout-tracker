"use client";
import React from "react";
import { useState } from "react";
import Exercise from "@/components/Exercise";

const LogWorkout = () => {
	const [exercises, setExercises] = useState([]);
	const [currExerciseName, setCurrExerciseName] = useState("");
	const [currExerciseTarget, setCurrExerciseTarget] = useState("Pick a muscle group");
	const [currExerciseDesc, setCurrExerciseDesc] = useState("");

	const today = new Date();
	const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	const addExercise = () => {
		if (currExerciseName && currExerciseTarget !== "Pick a muscle group") {
			setExercises((prev) => [...prev, { name: currExerciseName, target: currExerciseTarget, description: currExerciseDesc }]);
		}
		setCurrExerciseDesc("");
		setCurrExerciseName("");
		setCurrExerciseTarget("Pick a muscle group");
	};
	return (
		<div className="mt-2">
			<form className="flex flex-col gap-4">
				<h1 className="text-xl font-bold">New Workout</h1>
				<input type="text" placeholder="Workout Name..." className="input input-primary text-center" required />
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Date</legend>
					<input type="date" className="input validator" min="1950-01-01" max={formattedDate} required />
				</fieldset>
				<fieldset className="fieldset flex flex-row ">
					<legend className="fieldset-legend">Duration</legend>
					<label className="input validator">
						Hours
						<input type="number" className="text-center" min="0" max="24" defaultValue={0} />
					</label>
					<label className="input validator">
						Minutes
						<input type="number" className="text-center" min="0" max="60" defaultValue={0} />
					</label>
				</fieldset>
				<h1 className="text-xl font-bold text-center">Exercises</h1>
				{exercises.length ? exercises.map((exercise) => <Exercise key={exercise.name} name={exercise.name} target={exercise.target} setExercises={setExercises} />) : <p className="text-sm">No Exercises yet.</p>}
				<div tabIndex={0} className="collapse collapse-plus border-primary border">
					<input type="checkbox" />
					<div className="collapse-title font-bold text-left">Create New Exercise</div>
					<div className="collapse-content text-sm">
						<div className="flex flex-col gap-2">
							<fieldset className="fieldset">
								<legend className="fieldset-legend">Exercise Details</legend>
								<div className="flex flex-row gap-2">
									<input type="text" className="input input-sm" value={currExerciseName} onChange={({ target }) => setCurrExerciseName(target.value)} placeholder="Exercise name..." />
									<select className="select select-sm" value={currExerciseTarget} onChange={({ target }) => setCurrExerciseTarget(target.value)}>
										<option disabled={true}>Pick a muscle group</option>
										<option>Chest</option>
										<option>Back</option>
										<option>Shoulders</option>
										<option>Biceps</option>
										<option>Triceps</option>
										<option>Quadriceps</option>
										<option>Hamstrings</option>
										<option>Glutes</option>
										<option>Calves</option>
										<option>Abs</option>
										<option>Other</option>
									</select>
								</div>
							</fieldset>
							<fieldset className="fieldset">
								<legend className="fieldset-legend">Description</legend>
								<textarea className="textarea textarea-sm" value={currExerciseDesc} placeholder="Optional" onChange={({ target }) => setCurrExerciseDesc(target.value)}></textarea>
							</fieldset>
							<button className="btn btn-primary btn-sm" onClick={addExercise} type="button">
								Add Exercise
							</button>
						</div>
					</div>
				</div>
				<button className="btn btn-primary" type="submit">
					Save Workout
				</button>
			</form>
		</div>
	);
};

export default LogWorkout;
