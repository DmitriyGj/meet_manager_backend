const express = require('express');
const cors = require('cors');
const knex = require('knex');
const appConfig =  require('./app/config/app.config.js')
const db_config = require('./app/config/db.config.js');
require('dotenv').config();

console.log(db_config.Url, db_config.User, db_config.Pass, db_config.Name)

const db = knex({
  client: 'pg',
  connection: {
    host: db_config.Url,
    user: db_config.User,
    password: db_config.Pass,
    database: db_config.Name
  }
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS реализован так, что мы не получаем ошибок при попытке доступа к серверу из другого местоположения сервера
app.use(cors());

app.get('/employes', (req, res) => {
  db.select('*').from('EMPLOYES')
  .then((data) => {
    console.log(data.map(data => data));
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  })
});
const port = appConfig.Port || 8080;
app.listen(port, () => console.log(`Сервер работает на порту ${port}, http://localhost:${port}`));