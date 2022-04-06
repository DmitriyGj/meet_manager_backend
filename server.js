const express = require('express');
const cors = require('cors');
const appConfig =  require('./app/config/app.config.js')

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const employesRouter = require('./app/route/employes.routes');
const departamentRouter = require('./app/route/departament.routes');
const postsRouter = require('./app/route/post.routes');

app.use('/api',employesRouter );
app.use('/api',departamentRouter);
app.use('/api',postsRouter);

const port = appConfig.Port || 8080;
app.listen(port, () => console.log(`Сервер работает на порту ${port}, http://localhost:${port}`));