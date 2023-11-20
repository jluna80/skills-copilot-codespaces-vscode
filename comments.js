//create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql');

//create connection to mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});

//connect to mysql database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//use body-parser middleware
app.use(bodyParser.json());

//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE comments';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created');
    });
});

//create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE comments(id int AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created');
    });
});

//insert comment
app.post('/comment', (req, res) => {
    let comment = { name: req.body.name, comment: req.body.comment };
    let sql = 'INSERT INTO comments SET ?';
    let query = db.query(sql, comment, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Comment added');
    });
});

//select comments
app.get('/comments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Comments fetched');
    });
});

//select single comment
app.get('/comment/:id', (req, res) => {
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Comment fetched');
    });
});

//update comment
app.put('/comment/:id', (req, res) => {
    let newComment = { name: req.body.name, comment: req.body.comment };
    let sql = `UPDATE comments SET name = '${newComment.name}', comment = '${newComment.comment}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Comment updated');
    });
}
