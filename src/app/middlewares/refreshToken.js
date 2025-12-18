import { Session } from "../models/sessionModel.js"

export const verifyRefreshToken = async (req, res, next) => {
    try {
        const  refreshToken  = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" })
        }
        // below Here would typically verify the refresh token against your database //
        const session = await Session.findOne({ refreshToken: refreshToken })
        if (!session) {
            return res.status(401).json({ message: "session not found or expired" })
        }

        // Attach user info to request object for further processing
        req.user = {
            userId: session.userId,
            sessionId: session._id
        }
        next()
    } catch (err) {
        console.error("Verify Refresh Token Error:", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message })
    }
}