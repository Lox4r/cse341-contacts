const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  console.log("DNS servers:", dns.getServers());

  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  database = client.db("contactsDB");

  console.log("Connected to MongoDB");

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};