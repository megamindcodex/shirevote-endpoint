import { getUserData } from "../services/userService.js"


export const get_userData_controller = async (req, res) => {
    try {
        const userId = req.userId
        const sessionId = req.sessionId


        const result = await getUserData(userId)

        res.status(200).json({ user: result })
    } catch (err) {
        console.error("Get User Error:", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message })
    }
}