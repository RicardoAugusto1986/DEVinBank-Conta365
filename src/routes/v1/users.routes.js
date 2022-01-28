const express = require('express');
const useRoutes = express.Router();
const userController = require('../../controllers/userController');
const multer = require('multer')
const uploadUserFinanciall = multer()


///ENDPOINT USUARIOS
// a. Criar endpoint do tipo POST, com todos os campos obrigatórios. Realizar a
// validação caso falte algo dos campos de acordo com o JSON solicitado;
useRoutes.post('/userCreate', userController.create);


//b. Criar endpoint do tipo PATCH
useRoutes.patch('/userUpdate/:id', userController.updateOne);//MODULO USUARIO b) SEGUNDO ENDPOINT porem não altera o email


//c. Criar endpoint do tipo GET
useRoutes.get('/user/:id', userController.indexOne);


useRoutes.get('/allUser', userController.allUser);
/////// fim do metodos usuarios//////





module.exports =  useRoutes;