const express = require('express');
const routes = express.Router();


const userRoutes = require('./v1/users.routes');
const financiallRoutes = require('./v1/financiall.routes');


routes.use('/v1',[ userRoutes, financiallRoutes ]);


module.exports = routes;
