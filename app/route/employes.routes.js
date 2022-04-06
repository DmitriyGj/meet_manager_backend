const Router = require('express');
const router = new Router();


const EmployesCotroller = require('../controller/employes.controller');

router.get('/employes', EmployesCotroller.getEmployes);
router.get('/employes/:id', EmployesCotroller.getEmployeById);
router.post('/employes', EmployesCotroller.postEmploye);
router.put('/employes/:id', EmployesCotroller.putEmploye);
router.delete('/employes/:id', EmployesCotroller.deleteEmploye);

module.exports = router;
