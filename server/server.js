const express = require('express');
const app = express();
const pg = require('pg');
const pool = require('/modules/pool.js')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// const router = require('./routes/THISrouter')


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
// app.use('/THIS', router)

app.get('/task', (req, res) => {
    const queryText = `SELECT * FROM "tasks" ORDER BY "id";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(result);
            
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log(error);
            
        })
})

app.post('/task', (req, res) => {
    const queryText = `INSERT INTO "tasks"("task", "is_completed", "category")
                        VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.task, req.body.is_completed, req.body.category])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

app.delete('/task/:id', (req, res) => {
    const queryText = `DELETE FROM "tasks" WHERE "id"=$1`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

app.put('/task/complete/:id', (req, res) => {
    const queryText = `UPDATE "tasks" SET "is_completed"=true WHERE "id"=$1`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

app.put('/task/incomplete/:id', (req, res) => {
    const queryText = `UPDATE "tasks" SET "is_completed"=false WHERE "id"=$1`
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});