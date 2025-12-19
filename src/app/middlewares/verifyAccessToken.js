
const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization")
        if (!authHeader) {
            return res.status(400).json({ message: "missing Authorization header" })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: no access token" })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" })
            }

            if (!user) {
                return res.status(403).json({ message: "Forbidden: invalid token payload" })
            }

            if (!user.userId) {
                return res.status(403).json({ message: "Forbidden: invalid token payload" })
            }

            req.userId = user.userId
            next()
        })
    } catch (err) {
        console.error("Verify Access Token Error:", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message })
    }
}


export default verifyAccessToken