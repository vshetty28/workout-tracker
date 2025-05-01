"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ExerciseFilter from "./ExerciseFilter";
import SortButton from "./SortButton";
const ExerciseTable = ({ exercises, averages, topTargets, topExercises }) => {
	const [sort, setSort] = useState("date");
	const [order, setOrder] = useState("DESC");
	const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Other"];

	const searchParams = useSearchParams();
	const handleChangeSort = ({ target }) => {
		setSort(target.name);
		setOrder(order === "DESC" ? "ASC" : "DESC");
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", target.name);
		params.set("order", order);
		router.push(pathname + "?" + params.toString());
	};

	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="flex flex-col items-center w-1/3 max-w-screen">
			<div className="flex flex-col gap-2 items-center">
				<div className="text-pretty rounded-box border border-base-content/5 bg-base-200">
					<table className="table table-xs lg:table-md ">
						<thead>
							<tr>
								<th>
									<SortButton name="exercise" text="Exercise" sort={sort} handleChangeSort={handleChangeSort} order={order} />
								</th>
								<th>
									<SortButton name="target" text="Target" sort={sort} handleChangeSort={handleChangeSort} order={order} />
								</th>
								<th>
									<SortButton name="workout" text="Workout" sort={sort} handleChangeSort={handleChangeSort} order={order} />
								</th>
								<th>
									<SortButton name="date" text="Date" sort={sort} handleChangeSort={handleChangeSort} order={order} />
								</th>
								<th>
									<SortButton name="sets" text="Sets" sort={sort} handleChangeSort={handleChangeSort} order={order} />
								</th>
								<th>
									<SortButton name="reps" text="Reps" sort={sort} handleChangeSort={handleChangeSort} order={order} />
								</th>
							</tr>
						</thead>
						<tbody>
							{exercises.map((exercise) => (
								<tr key={exercise.exercise_id + "_" + exercise.workout_id}>
									<th className="text-nowrap">{exercise.exercise}</th>
									<td>{exercise.target}</td>
									<td>{exercise.workout}</td>
									<td>{exercise.date.toLocaleDateString()}</td>
									<td className="text-right font-bold">{exercise.sets}</td>
									<td className="text-right">{exercise.reps}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="text-sm size-full text-nowrap px-10 flex flex-row justify-around">
					<h1>Average Sets</h1>
					<p className="text-accent">{averages.avg_sets.toFixed(2)}</p>
					<h1>Average Reps</h1>
					<p className="text-accent">{averages.avg_reps.toFixed(2)}</p>
				</div>

				<div className="flex flex-row py-5 gap-4">
					<div className="flex flex-col">
						<h1 className="font-bold text-primary">Top Muscle Targets</h1>
						<table className="table table-xs text-nowrap text-right">
							<thead className="text-xs">
								<tr>
									<th>Target</th>
									<th>Count</th>
									<th>Sets</th>
									<th>Reps</th>
								</tr>
							</thead>
							<tbody>
								{topTargets.map((target) => (
									<tr key={target.target}>
										<td>{target.target}</td>
										<td>{target.count}</td>
										<td>{target.total_sets}</td>
										<td>{target.total_reps}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex flex-col">
						<h1 className="font-bold text-primary">Top Exercises</h1>
						<table className="table table-xs text-nowrap text-right">
							<thead className="text-xs">
								<tr>
									<th>Exercise</th>
									<th>Count</th>
									<th>Sets</th>
									<th>Reps</th>
								</tr>
							</thead>

							<tbody>
								{topExercises.map((exercise) => (
									<tr key={exercise.exercise}>
										<td>{exercise.exercise}</td>
										<td>{exercise.count}</td>
										<td>{exercise.total_sets}</td>
										<td>{exercise.total_reps}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div tabIndex={0} className="collapse collapse-arrow border-primary border flex-none">
					<input type="checkbox" />
					<div className="collapse-title font-semibold text-center">Filter</div>
					<div className="collapse-content">
						<ExerciseFilter />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExerciseTable;
