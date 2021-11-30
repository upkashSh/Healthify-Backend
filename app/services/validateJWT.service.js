
const { MESSAGES, CODE_NUMBERS } = require('@constant/apiResponseCode_Messages');
const CryptoJS = require("crypto-js");
const { jwtAuthService } = require('@services/util.service');

module.exports = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(CODE_NUMBERS.CODE_401).json({ error: MESSAGES.INVALID_USER });
  }
  const jwtTokenSection = req.header('Authorization').split(' ');
  if (!jwtTokenSection || jwtTokenSection.length !== 2) {
    return res.status(CODE_NUMBERS.CODE_401).json({ error: MESSAGES.INVALID_USER });
  }

  const scheme = jwtTokenSection[0];
  const token = jwtTokenSection[1];
  if (!/^Bearer$/.test(scheme)) {
    return res.status(CODE_NUMBERS.CODE_401).json({ error: MESSAGES.INVALID_USER });
  }

  return jwtAuthService().verify(token, (err, decoded) => {
    if (err || !decoded.id) return res.status(CODE_NUMBERS.CODE_401).json({ error: MESSAGES.INVALID_USER });

    const dataBytes_UserId = CryptoJS.AES.decrypt(decoded.id, process.env.ZIVOV_SECRET_KEY);
    const userID = dataBytes_UserId.toString(CryptoJS.enc.Utf8);
    req.header["usersId"] = userID;
    return next();
  });
};
