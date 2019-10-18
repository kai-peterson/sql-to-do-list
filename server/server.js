const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// const router = require('./routes/THISrouter')

const config = {
    database: 'weekend_to_do_app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
// app.use('/THIS', router)

app.get('/task', (req, res) => {
    const queryText = `SELECT * FROM "tasks";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log(result);
            
        })
        .catch((error) => {
            res.sendStatus(400);
            console.log(error);
            
        })
})

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});