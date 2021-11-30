const unAuthenticated = require("./Routes/unAuthenticated"); 
const authenticated = require("./Routes/authenticated");

const adminRoutes = {
    unAuthenticated,
    authenticated
};

module.exports = adminRoutes;