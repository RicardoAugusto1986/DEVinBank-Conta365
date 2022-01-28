const express = require('express');
const app = express();
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');


app.use(express.json());

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, ()=>{
    console.log('Server working');
});

