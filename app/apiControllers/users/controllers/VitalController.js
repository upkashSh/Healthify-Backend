const { MESSAGES, CODE_NUMBERS } = require('@constant/apiResponseCode_Messages');
const { logger } = require("@services/util.service"); 
const moment = require("moment"); 

const VitalController = () => { 
    const getVital = async (req, res) => {
        try {
            let {} = req.body;
            const { usersId } = req.header;

             
            return res.status(CODE_NUMBERS.CODE_200).json({ isSuccessful: true, response: {} });
        } catch (err) {
            logger.logError("Get vital api throw error:" + err);
            return res
                .status(CODE_NUMBERS.CODE_500)
                .json({ error: MESSAGES.SERVER_ERROR });
        }
    };

    

    return {
        getVital
    }
}

module.exports = VitalController;