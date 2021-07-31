const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send('Root element.');
});


app.listen(port, () => console.log("[index] server started on port " + port));