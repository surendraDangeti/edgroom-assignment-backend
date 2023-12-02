const express = require('express');
const cors = require('cors')
const sequelize = require('./database/db');
const authRouter = require('./routes/authRouter');
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }).catch(error => {
    console.error(error);
  });
  
