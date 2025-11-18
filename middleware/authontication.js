
const cookies = require("cookies");
const { getUser } = require("../services/auth");
const authmiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const user = getUser(token)

        req.user = user;
        next()
    } catch (error) {
        console.log(error);

    }
}

module.exports = authmiddleware;