
export const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization")
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Access token missing" })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired access token" })
            }
            req.user = {
                userId: user.userId,
                sessionId: user.sessionId
            }
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