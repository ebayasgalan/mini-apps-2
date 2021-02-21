const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

// Use a time-series chart and show closing prices only. 
// By default, this will return the previous 31 days' worth of data. This endpoint accepts the following optional parameters: 
// 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05';

const PORT = 3000;

app.listen(PORT, () => console.log(`server is listening on http://localhost:${PORT}`));