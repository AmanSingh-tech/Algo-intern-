-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'Easy';

-- CreateTable
CREATE TABLE "ProblemToTags" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "tid" TEXT NOT NULL,

    CONSTRAINT "ProblemToTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem_Tags" (
    "id" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Problem_Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemToTags_pid_tid_key" ON "ProblemToTags"("pid", "tid");

-- AddForeignKey
ALTER TABLE "ProblemToTags" ADD CONSTRAINT "ProblemToTags_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemToTags" ADD CONSTRAINT "ProblemToTags_tid_fkey" FOREIGN KEY ("tid") REFERENCES "Problem_Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
