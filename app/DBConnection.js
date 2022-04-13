const db_config = require('./config/db.config');
const knex = require('knex');

const params = db_config.Url.split(':')
console.log(params)
const connection = {}
Object.keys(params).forEach(item =>connection[key] = params[key] )
connection[ssl] = false
const db = knex({
    client: 'pg',
    connection
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