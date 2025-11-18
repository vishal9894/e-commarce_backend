const jwt = require("jsonwebtoken");

const secret = "vishal@1234";

const setUser = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, secret)
}

const getUser = (token) => {

    if (!token) return null;

    try {
        return jwt.verify(token, secret)
    } catch (error) {
        console.log(error);
        return null;

    }

}

module.exports = { setUser, getUser };