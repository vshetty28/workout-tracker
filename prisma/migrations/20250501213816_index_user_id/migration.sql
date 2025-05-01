-- DropIndex
DROP INDEX "Workout_date_duration_idx";

-- CreateIndex
CREATE INDEX "Workout_user_id_date_idx" ON "Workout"("user_id", "date");
