const psql = require("pg-promise")();
const { Pool }= require('pg');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const db = psql(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

mongoose.connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true
})
.then(db => console.log("DB Conected!!"))
.catch(error => console.log(error))

module.exports = {
    db,
    pool,
    bcrypt
}