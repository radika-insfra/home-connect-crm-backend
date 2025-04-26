const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Real Estate CRM API',
    description: 'API documentation for Real Estate CRM',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const outputFile = './swagger_output.json'; // <- Output file
const endpointsFiles = ['./app.js']; // <- Entry points

swaggerAutogen(outputFile, endpointsFiles, doc);
