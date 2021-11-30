const moment = require("moment");
const CryptoJS = require("crypto-js");
const { MESSAGES, CODE_NUMBERS } = require('@constant/apiResponseCode_Messages');
const { logger, validatePhoneNumber, validateEmail } = require("@services/util.service");
const UserModel = require("@models/Users");


const LoginController = () => {

    const login = async (req, res) => {
        try {
            let { emailId = null, password = null } = req.body;
            if (!emailId || !password) {
                return res.status(CODE_NUMBERS.CODE_422).json({ error: MESSAGES.MISSING_PARAM });
            }

            if (emailId) {
                emailId = validateEmail(emailId);
                if (!emailId) {
                    return res.status(CODE_NUMBERS.CODE_400).json({ error: MESSAGES.INVALID_EMAIL_ADDRESS });
                }
            }

            return res.status(CODE_NUMBERS.CODE_200).json({ isSuccessful: true, response: {} });
        } catch (err) {
            logger.logError("send_otp api throw error:" + err);
            return res.status(CODE_NUMBERS.CODE_500).json({ error: MESSAGES.SERVER_ERROR });
        }
    };



    const register = async (req, res) => {
        try {
            let { emailId = null, password = null, contact_number = null, name = null } = req.body;
            if (!emailId || !password || !contact_number || (!name || name.length <= 2)) {
                return res.status(CODE_NUMBERS.CODE_422).json({ error: MESSAGES.MISSING_PARAM });
            }

            if (contact_number) {
                contact_number = validatePhoneNumber(contact_number);
                if (!contact_number) {
                    return res.status(CODE_NUMBERS.CODE_400).json({ error: MESSAGES.INVALID_PHONE_NUMBER });
                }
            }
            name = name.trim();
            password = password.trim();
            if (!name) {
                return res.status(CODE_NUMBERS.CODE_400).json({ error: MESSAGES.INVALID_NAME });
            }

            if (!password) {
                return res.status(CODE_NUMBERS.CODE_400).json({ error: MESSAGES.INVALID_PASSWORD });
            }


            const checkUSers = await UserModel.findOne({
                where: {
                    email_adddress: emailId,
                    contact_number:contact_number
                }
            });

            if(checkUSers){
                return res.status(CODE_NUMBERS.CODE_400).json({ error: MESSAGES.USER_ALREADY_REGISTERED });
            }
            await UserModel.create(
                {
                    email_adddress: emailId,
                    contact_number: contact_number,
                    name: name,
                    password: password,
                    created_on: moment.utc().toDate(),
                },
                { fields: ['email_adddress', 'contact_number', 'name', 'password', 'created_on'] }
            );

            return res.status(CODE_NUMBERS.CODE_200).json({ isSuccessful: true });
        } catch (err) {
            logger.logError("user registration error" + err);
            return res.status(CODE_NUMBERS.CODE_500).json({ error: MESSAGES.SERVER_ERROR });
        }
    };

    return {
        login,
        register
    };
}


module.exports = LoginController;