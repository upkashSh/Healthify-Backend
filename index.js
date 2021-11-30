/**
 * third party libraries
 */

const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const app = express();
const fs = require("fs");
var server = http.createServer(app);
require('module-alias/register')
const { connectDb } = require('@services/db.service');
const { createPemFile, writeGlobalDataConfig } = require('@services/util.service');
const userRoutes = require('@userAPI/index');
//const adminRoutes = require('@adminAPI/index');

const validateJWTService = require('@services/validateJWT.service');
const dotenvJSON = require("dotenv-json");

//set configuration environment variables
dotenvJSON({ path: `config/env_${process.env.ENVIRONMENT}.json` })
const environment = process.env.ENVIRONMENT;

//Models
const UserModel = require("@models/Users");
const VitalModel = require("@models/Vitals");
const BackendUserModel = require("@models/BackendUser");
const GoalsModel = require("@models/Goals");
const AssignGoalModel = require("@models/AssignGoal");
const userUnAuthenticated = mapRoutes(userRoutes.unAuthenticated, 'app/apiControllers/users/controllers/');
const userAuthenticated = mapRoutes(userRoutes.authenticated, 'app/apiControllers/users/controllers/');

//const adminUnAuthenticatedRoutes = mapRoutes(adminRoutes.unAuthenticated, 'app/apiControllers/admin/controllers/');
//const adminAuthenticatedRoutes = mapRoutes(adminRoutes.authenticated, 'app/apiControllers/admin/controllers/');


// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,parameterLimit:50000 })); 
app.use(multer({ dest: '/tmp' }).any()); 

//user routes
app.get('/', function (req, res) {
  res.send('Hello World')
});

app.post('/', function (req, res) {
  res.send('Hello World')
});
app.use('/userUnAuthRoutes', userUnAuthenticated);
app.use('/userAuthRoutes/*', (req, res, next) => validateJWTService(req, res, next));
app.use('/userAuthRoutes', userAuthenticated);

//admin routes
//app.use('/adminUnAuthRoutes', adminUnAuthenticatedRoutes);
//app.use('/adminAuthRoutes/*', (req, res, next) => validateJWTService(req, res, next));
//app.use('/adminAuthRoutes', adminAuthenticatedRoutes);
var port = process.env.PORT || 3000;
server.listen(port, async () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing' 
  ) {
    console.error('Invalid Environment');
    process.exit(1);
  }


  // create secure key for authentication
  createPemFile();

  /**
   * establish db connection
   */
  const dbConnectionObject = await connectDb();
  if (!dbConnectionObject) {
    console.error('Db connection failed');
    process.exit(1);
  }
  await UserModel.sync();
  await VitalModel.sync(); 
  await BackendUserModel.sync();
  await GoalsModel.sync();
  await AssignGoalModel.sync();
  return dbConnectionObject;
});
