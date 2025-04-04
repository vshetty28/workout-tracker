"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ExerciseFilter from "./ExerciseFilter";
import SortButton from "./SortButton";
const ExerciseTable = ({ exercises }) => {
	const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("DESC");
	const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Other"];

    const searchParams = useSearchParams();
	const handleChangeSort = ({ target }) => {
        setSort(target.name);
		setOrder(order === "DESC" ? "ASC" : "DESC");
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', target.name);
        params.set("order", order);
        router.push(pathname + '?' + params.toString())
    };

	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="flex flex-col items-center w-1/3 max-w-screen">
			<div className="flex flex-col gap-2 items-center">
				<div className="text-pretty rounded-box border border-base-content/5 bg-base-200">
					<table className="table table-xs lg:table-md">
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
									<SortButton name="duration" text="Duration" sort={sort} handleChangeSort={handleChangeSort} order={order} />
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
									<td className="text-right shrink">{exercise.duration}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div tabIndex={0} className="collapse collapse-arrow border-primary border">
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
