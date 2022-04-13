require('dotenv').config()

module.exports = {
    Url: process.env.DB_URL,
    Port: process.env.DB_PORT,
    Pass: process.env.DB_PASSWORD.toString(),
    User: process.env.DB_USER,
    Name: process.env.DB
};