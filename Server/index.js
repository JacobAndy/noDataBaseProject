require("dotenv").config();
const { json } = require("body-parser");
const express = require("express");
const app = express();
const axios = require("axios");
const port = 3001;

const astroid = require("./controllers/astroid_controller");

app.use(json());
app.get("/api/astroids", astroid.getAstroid);
app.post("/api/astroids", astroid.createAstroid);
app.put("/api/astroids/:id", astroid.updateAstroid);
app.delete("/api/astroids/:id", astroid.deleteAstroid);

app.listen(port, () => {
  console.log(`hello daddy! Im listening to port ${port}`);
});
