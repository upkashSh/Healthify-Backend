const unAuthenticated = require("./Routes/unAuthenticated"); 
const authenticated = require("./Routes/authenticated");

const userRoutes = {
    unAuthenticated,
    authenticated
};

module.exports = userRoutes;