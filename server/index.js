const express = require("express");
const db_connect = require("./db_conn/db_connect");
require("../models/models");
const routes = require("../routes/routes");
const cors = require('cors');

let port = process.env.PORT || 3001;
let corOptions = {
  origin : ['http://localhost:3000'],
  methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

(async () => {//bootstrap express application.
  const app = express();

  //parse incoming requests data;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/illustriousfood", routes);
  app.use(cors(corOptions));

app.options("/illustriousfood", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
});

  try {
    await db_connect.sequelize.sync({ alter: true, force: false})
      .then(function() {
        console.log("Database has been synced")
      })
      .catch((err) => {
        console.log(`Unable to sync database: ${err}`)
      })
  }
  catch (error) {
    console.error(error);
  }

  //default catch-all route that sends a JSON response.
  app.get("/", (req, res) =>
    res
      .status(200)
      .send({ success: true, message: "This is where it all starts!!!" })
  );

  app.listen(port, () => {
    console.log(
      `Express listening at http://localhost:${port}`
    );
  });

})();   