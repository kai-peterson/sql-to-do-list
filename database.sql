CREATE TABLE koalas(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (80) NOT NULL,
	"is_completed" VARCHAR (1) NOT NULL
);

-- test tasks to insert initially
INSERT INTO "tasks"("task", "is_completed")
VALUES ('test-task1', 'Y'), ('test-task2', 'N'), ('test-task3', 'Y');

SELECT * FROM "tasks"