import React from "react";
import { getAllExercises } from "@/lib/actions";
import { Metadata } from "next";
import ExerciseFilter from "@/components/ExerciseFilter";
import ExerciseTable from "@/components/ExerciseTable";
export const metadata: Metadata = {
	title: "Exercise Report",
};
const ExerciseReport = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
	const formatDate = (date: Date) => {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate() + 1).padStart(2, "0")}`;
	};
	const { start = '1950-01-01', end = formatDate(new Date()), min = '0', max = '1440', sort = 'w.date', order = 'DESC' } = await searchParams;
	const startDate = new Date(Array.isArray(start) ? start[0] : start);
	const endDate = new Date(Array.isArray(end) ? end[0] : end);
	const sortCol = Array.isArray(sort) ? sort[0] : sort;
	const sortOrder = Array.isArray(order) ? order[0] : order;
	startDate.setDate(startDate.getDate() + 1);
	endDate.setDate(endDate.getDate() + 1);
	const exercises: any = await getAllExercises(
		startDate,
		endDate,
		Number(min),
		Number(max),
		sortCol,
		sortOrder
	);

	return (
		<ExerciseTable exercises={exercises} />
	);
};

export default ExerciseReport;
