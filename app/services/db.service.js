const Sequelize = require('sequelize');
const { logger } = require('./util.service');

/**
* @desc Make database connect .
* @param none
* @returns none
*/
const connectDb = async () => {
  try {
    const dbConfig = JSON.parse(process.env.DB_CONFIG.replace(/'/g, '"'));
    const dbConnection = new Sequelize(dbConfig);
    await dbConnection.authenticate();
    await dbConnection.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    logger.logMesage("connection to the database has been established successfully");
    return dbConnection;
  } catch (err) {
    logger.logError("unable to connect to the database:", err);
  }
};

/**
* @desc get instance of Sequelize DB connection instance.
* @param none
* @returns Sequelize DB instance
*/
const getDBInstance = () => {
  const dbConfig = JSON.parse(process.env.DB_CONFIG.replace(/'/g, '"'));
  const dbConnection = new Sequelize(dbConfig);
  return dbConnection;
}

module.exports = { connectDb, getDBInstance };