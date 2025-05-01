"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ExerciseFilter = () => {
	const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Other"];
	const today = new Date();
	// filter state
	const [filter, setFilter] = useState({
		start_date: "1950-01-01",
		end_date: today.toLocaleDateString("en-CA"),
		min_reps: 0,
		max_reps: 2000,
	});
	// update filter
	const handleChange = ({ target }) => {
		setFilter((values) => ({ ...values, [target.name]: target.value }));
	};
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	// submit
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const params = new URLSearchParams(searchParams.toString());
		const startDate = new Date(filter.start_date);
		const endDate = new Date(filter.end_date);
		startDate.setDate(startDate.getDate() + 1);
		endDate.setDate(endDate.getDate() + 1);

		params.set("start", startDate.toLocaleDateString());
		params.set("end", endDate.toLocaleDateString());
		params.set("min", "" + filter.min_reps);
		params.set("max", "" + filter.max_reps);
		router.push(pathname + "?" + params.toString());
	};
	// clear
	const handleClear = () => {
		setFilter({
			start_date: "1950-01-01",
			end_date: today.toLocaleDateString("en-CA"),
			min_reps: 0,
			max_reps: 2000,
		});
		const params = new URLSearchParams(searchParams.toString());
		params.delete("start");
		params.delete("end");
		params.delete("min");
		params.delete("max");
		router.push(pathname + "?" + params.toString());
	};

	return (
		<div className="">
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="flex flex-row w-full gap-2">
					<fieldset className="grow fieldset">
						<legend className="fieldset-legend">Start Date</legend>
						<input type="date" name="start_date" className="input w-full" min="1950-01-01" max={today.toLocaleDateString("en-CA")} value={filter.start_date} onChange={handleChange} required />
					</fieldset>
					<fieldset className="grow fieldset">
						<legend className="fieldset-legend">End Date</legend>
						<input type="date" name="end_date" className="input w-full" min="1950-01-01" max={today.toLocaleDateString("en-CA")} value={filter.end_date} onChange={handleChange} required />
					</fieldset>
				</div>
				<fieldset className="fieldset flex flex-row ">
					<legend className="fieldset-legend">Rep Range</legend>
					<label className="input">
						Minimum
						<input type="number" name="min_reps" className="text-center" min="0" max="2000" value={filter.min_reps} onChange={handleChange} />
					</label>
					<label className="input">
						Maximum
						<input type="number" name="max_reps" className="text-center" min="0" max="2000" value={filter.max_reps} onChange={handleChange} />
					</label>
				</fieldset>

				<fieldset hidden className="fieldset">
					<legend className="fieldset-legend">Target</legend>
					<div className="filter justify-center w-full">
						<input className="btn btn-xs filter-reset mb-1" type="radio" name="metaframeworks" aria-label="All" />
						{muscleGroups.map((muscle) => (
							<input key={muscle} className="btn btn-xs mb-1" type="radio" name="metaframeworks" aria-label={muscle} />
						))}
					</div>
				</fieldset>

				<button className="btn btn-primary" type="submit">
					Filter
				</button>
				<button className="btn btn-outline" type="button" onClick={handleClear}>
					Clear
				</button>
			</form>
		</div>
	);
};

export default ExerciseFilter;
