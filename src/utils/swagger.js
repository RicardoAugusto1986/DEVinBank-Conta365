const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'DevInBank',
    description: 'descrição',
  },
  host: 'localhost:3333',
  schemes: ['http'],
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/server.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);