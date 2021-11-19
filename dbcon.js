const express = require('express');
const mysql = require('mysql');
const app = express();

const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapi'
})
dbCon.connect();

module.exports = dbCon;