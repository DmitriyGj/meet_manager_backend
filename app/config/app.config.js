require('dotenv').config()

module.exports = {
    Url: process.env.APP_URL,
    Port: process.env.PORT,
    secret: "SECRET_KEY_RANDOM"
};