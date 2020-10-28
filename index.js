const express = require('express');
const app = express();

app.use(express.json());

require('./src/app/controllers/index')(app);

app.listen(3000, () => console.log('serverStarted'));