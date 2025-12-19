
import { User } from "../models/userModel.js"

export const getUserData = async (userId) => {
    try {
        const user = await User.findById(userId)

        return user
    } catch (err) {
        console.error("Get User Data Error:", err)
        throw err
    }
}