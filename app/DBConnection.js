const db_config = require('./config/db.config');
const knex = require('knex');

const params = db_config.Url.split(':')
const connection = {}
params.forEach(item)
const db = knex({
    client: 'pg',
    connection:`${db_config.Url}useSSL=false`
    // {
    //     host: db_config.Url,
    //     user: db_config.User,
    //     port: db_config.Port,
    //     password: db_config.Pass,
    //     database: db_config.Name,
    //     ssl: {
    //         rejectUnauthorized: false,
    //     }
    // }
});


module.exports = db;