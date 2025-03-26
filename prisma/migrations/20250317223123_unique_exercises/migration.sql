/*
  Warnings:

  - A unique constraint covering the columns `[exercise]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_exercise_key" ON "Exercise"("exercise");
