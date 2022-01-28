const express = require('express');
const financiallRoutes = express.Router();
const financiallController = require('../../controllers/financialController');
const multer = require('multer')
const uploadUserFinanciall = multer()


financiallRoutes.delete('/deleteFinance/:userId/:financialId', financiallController.deleteOne);


financiallRoutes.get('/FinanciallData',  financiallController.getAllAccounts);


financiallRoutes.post('/userFinanciallData/:userId', uploadUserFinanciall.single('file'), financiallController.importUserfinanciall)



module.exports = financiallRoutes;