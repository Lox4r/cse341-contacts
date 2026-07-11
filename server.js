const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const mongodb = require("./db/connect");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const routes = require("./routes/index");

console.log("Routes type:", typeof routes);

app.use("/", routes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Swagger available at http://localhost:${port}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });