const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CSE 341 Contacts API documentation"
  },
  host: "cse341-contacts-1-p9ly.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log("Swagger documentation generated successfully.");
  })
  .catch((error) => {
    console.error("Swagger generation error:", error);
  });