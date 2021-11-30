const fs = require("fs");
const jwt = require('jsonwebtoken');
const appRoot = require('app-root-path');
const moment = require("moment");
/**
 * @desc common logger object having different logger functions to set logs
 * @param logMsg: string
 * @returns none
 */
const logger = {
  logMesage: (logMsg) => {
    console.log(logMsg);
  },
  logError: (logMsg) => {
    console.error(logMsg);
  },
  logInfo: (logMsg) => {
    console.info(logMsg);
  },
};
 

const validatePhoneNumber = (phoneNumber) => {
  if (!/^(\+91[\-\s]?)?[0]?(91)?[456789]\d{9}$/.test(phoneNumber)) {
    return null;
  } else {
    return phoneNumber;
  }
};

const validateEmail = (email) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return null;
  return email.trim();
};

const createPemFile = () => {

//console.log("======"+process.env.CONFIG)

  const { generateKeyPair, getCiphers } = require('crypto');
  const ciphers = getCiphers();
  const configKeys = JSON.parse(process.env.CONFIG.replace(/'/g, '"'));
  if (!fs.existsSync(configKeys.public_pem)) {
    generateKeyPair('rsa', {
      modulusLength: 512,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: ciphers[0],
        passphrase: process.env.SECRET_KEY
      }
    }, (err, publicKey, privateKey) => {
      fs.writeFile(configKeys.public_pem, publicKey, (er) => {
        if (er) {
          console.error('An error occured while creating public pem file: ', er);
        } else {
          console.log('public pem created');
        }
      });

      fs.writeFile(configKeys.private_pem, privateKey, (er) => {
        if (er) {
          console.error('An error occured while creating private pem file: ', er);
        } else {
          console.log('private pem created');
        }
      });
    });
  }
}

const jwtAuthService = () => {
  const config = JSON.parse(process.env.CONFIG.replace(/'/g, '"'));
  const issue = (userID) => {
    let privateKey = fs.readFileSync(config.private_pem, 'utf8');
    return jwt.sign(
      { id: userID },
      {
        key: privateKey,
        passphrase: process.env.ZIVOV_SECRET_KEY
      }, {
      algorithm: "RS256",
      expiresIn: "15d"
    })
  };
  const verify = (token, cb) => {
    let publicKey = fs.readFileSync(config.public_pem, 'utf8');
    jwt.verify(token, publicKey, { algorithm: ["RS256"] }, cb)
  };

  return { issue, verify, };
};

const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? 0 + '' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

 
 
module.exports = {
  logger, 
  validatePhoneNumber,
  validateEmail,
  createPemFile,
  jwtAuthService,
};
