const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);



app.listen(port, () => console.log("Server started on port " + port));