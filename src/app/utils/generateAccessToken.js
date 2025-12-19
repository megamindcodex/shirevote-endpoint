import jwt from "jsonwebtoken"

const generateAccessToken = (userId, sessionId) => {
    try {
        const payload = {
            userId: userId,
            sessionId: sessionId
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
        return accessToken
    } catch (err) {
        console.error("Error generate Access Token:", err)
        throw err
    }
}

export default generateAccessToken