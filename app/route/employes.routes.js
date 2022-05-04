const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddlware');

const EmployesCotroller = require('../controller/employes.controller');

router.get('/employes',authMiddleware, EmployesCotroller.getEmployes);
router.get('/employes/:id', EmployesCotroller.getEmployeById);
router.post('/employes', authMiddleware , EmployesCotroller.postEmploye);
router.put('/employes/:id', EmployesCotroller.putEmploye);
router.delete('/employes/:id', authMiddleware  ,EmployesCotroller.deleteEmploye);
router.get('/employes_chart', EmployesCotroller.getChartInfo);
router.get('/employes/:id/member_cards', EmployesCotroller.getMemberCards)

module.exports = router;
