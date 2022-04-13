const db_config = require('./config/db.config');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: db_config.Url,
        user: db_config.User,
        port: db_config.Port,
        password: db_config.Pass,
        database: db_config.Name,
        ssl: {
            rejectUnauthorized: false,
        }
    }
});


module.exports = db;