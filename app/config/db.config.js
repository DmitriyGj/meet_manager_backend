require('dotenv').config()
console.log( process.env.DB_URL,
    process.env.DB_PORT,
    process.env.DB_PASSWORD.toString(),
    process.env.DB_USER,
    process.env.DB)
module.exports = {
    Url: process.env.DB_URL,
    Port: process.env.DB_PORT,
    Pass: process.env.DB_PASSWORD.toString(),
    User: process.env.DB_USER,
    Name: process.env.DB
};