require('dotenv').config();

const express = require('express');
const sequelize = require('./config/db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🏡 Real Estate CRM API is running');
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch('Database not connected');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
