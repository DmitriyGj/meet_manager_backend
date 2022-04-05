const Router = require('express');
const router = new Router();


const EmplyoesCotroller = require('../controller/employes.controller');

router.get('/employes', EmplyoesCotroller.getEmployes);
router.get('/employes/:id', EmplyoesCotroller.getEmployeById);

module.exports = router;