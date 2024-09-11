-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "due_date" TEXT NOT NULL,
    "created_at" TEXT,
    "updated_at" TEXT,
    "priority" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);
