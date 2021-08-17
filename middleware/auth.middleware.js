const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    // 'method' validation open server
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]   // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({message: "Not authorization"})
        }

        // decoding token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        // чтобы продолжать выполнять запрос
        next()

    } catch (e) {
        res.status(401).json({message: "Not authorization"})
    }


}