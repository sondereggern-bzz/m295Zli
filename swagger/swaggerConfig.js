const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API documentation for the Library project',
        },
    },
    apis: ['./path/userRoutes.js', './path/bookRoutes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
