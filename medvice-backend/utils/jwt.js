const jwt = require("jsonwebtoken");

module.exports = {
    getJWT: (user) => {
        return jwt.sign(user, process.env.JWT_SECRET_KEY);
    },
    verifyJWT: (req) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return {
                status: 401,
                user: null
            }
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return {
                status: 200,
                user: user
            }
        } catch (err) {
            console.log(err)
            return {
                status: 403,
                user: null
            }
        }
    }
}