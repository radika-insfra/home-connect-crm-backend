require('dotenv').config();

const express = require('express');
const sequelize = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();
app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/api', (req, res) => {
  res.send('🏡 Real Estate CRM API is running');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
    // Sync all models
    sequelize.sync().then(() => console.log('Models synced'));
  })
  .catch('Database not connected');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
