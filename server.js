import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

//assumed to be used later
import response from 'express';
import fetch from 'node-fetch';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	
	let sql = 'SELECT * FROM movies';

	connection.query(sql, (error, results) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		console.log(obj)
		res.send(obj);
	});

	connection.end();
	
});


app.post('/api/getSearchedMovie', (req, res) => {
	let connection = mysql.createConnection(config);

	const {movieTitle} = req.body;
	console.log("Search by:", movieTitle);

	let sql = `SELECT * FROM movies WHERE name LIKE ?`;
	
	let data = [`%${movieTitle}%`]

	  connection.query(sql, data, (error, results) => {
		if (error) {
		  console.error(error);
		  res.status(500).send('Internal Server Error');
		  return;
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
		
	});

	connection.end();
	
});

app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
	
	  const reqData = req.body;
  
	  let insertReviewSQL = `INSERT INTO Review (reviewScore, userId, reviewTitle, reviewContent, id) VALUES (?, ?, ?, ?, ?)`;
	  let insertReviewData = [reqData.reviewScore, reqData.userId, reqData.reviewTitle, reqData.reviewContent, reqData.id];
  
	  connection.query(insertReviewSQL, insertReviewData, (error, results, fields) => {
		if (error) {
		  console.log("error with query connection");
		}
		res.send('done');
	  });
	  connection.end()
	});


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server