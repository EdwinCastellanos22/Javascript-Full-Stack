require("dotenv").config();
const express = require("express");
const routerApi= require("./urls/apiBooks");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors")
require("../backend/database/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use(morgan("combined"));
app.use("/mongo", routerApi);


app.listen(process.env.APP_PORT, () => {
  console.log(`Server listen port ${process.env.APP_PORT}`);
});
