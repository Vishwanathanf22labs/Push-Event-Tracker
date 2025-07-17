const dotenv = require('dotenv');
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Push Event Tracker API',
      version: '1.0.0',
      description: 'API for tracking GitHub push events',
    },
    servers: [
      {
        url: process.env.SWAGGER_BACKEND_URL,
        description: 'Local or public URL for Swagger',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

module.exports = { options };
