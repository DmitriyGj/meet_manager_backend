const express = require('express');
const fs = require('fs');
const cors = require('cors');
const appConfig =  require('./app/config/app.config.js')

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS реализован так, что мы не получаем ошибок при попытке доступа к серверу из другого местоположения сервера
app.use(cors());
const employesRouter = require('./app/route/employes.routes')

app.use('/api',employesRouter )

const port = appConfig.Port || 8080;
app.listen(port, () => console.log(`Сервер работает на порту ${port}, http://localhost:${port}`));