CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (80) NOT NULL,
	"is_completed" VARCHAR (1) NOT NULL,
    "category" VARCHAR (30) NOT NULL
);

-- test tasks to insert initially
INSERT INTO "tasks"("task", "is_completed", "category")
VALUES ('coding task one', 'false', 'coding'), ('coding task two', 'false', 'coding'), ('coding task long text i have a lot to do', 'false', 'coding'), 
('home life task one', 'false', 'home life'), ('home life task two', 'false', 'home life'), ('home life task long text i have a lot of things to do', 'false', 'home life'), 
('random task one', 'false', 'random'), ('random task two', 'false', 'random'), ('random task long text i have a lot of really time-consuming things to do', 'false', 'random');

SELECT * FROM "tasks" ORDER BY "id";

UPDATE "tasks" SET "is_completed"=true WHERE "id"=$1;