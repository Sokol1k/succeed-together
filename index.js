const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors')

//Import Routes
const middlewares = require("./middlewares");
const routes = require("./routes"); //it will open its index.js

dotenv.config();
app.use(cors());

//Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));

//Route Middlewares
app.use("/api", middlewares);
app.use("/api", routes);

app.use(function(req, res) {
  res.status(404).send({ message: "Page not found" });
});

app.listen(process.env.PORT, () => console.log("Server up and running"));
