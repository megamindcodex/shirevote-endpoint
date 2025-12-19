import { User } from "../models/userModel.js"
import { Session } from "../models/sessionModel.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"




const createSession = async (userId, refreshToken) => {
  try {

    //this is a 5 minute duration expiration calculation
    const FIVE_MINUTES_MS = 1 * 60 * 1000
    const now = Date.now()
    const expiresAt = new Date(now + FIVE_MINUTES_MS)
    // console.log("Now is:", new Date(now))
    // console.log("Session will expire at:", expiresAt)

    const newSession = {
      userId,
      refreshToken: refreshToken,
      device: "samsung",
      ip: "192.168.0.1",
      expiresAt: expiresAt
    }

    const session = await Session.create(newSession)
    // console.log("expiresAt in create session:", session.expiresAt)

    // console.log("Session created:", session)


    return session

  } catch (err) {
    console.error("Create Session Error:", err)
    throw err
  }
}

export const register = async (formData) => {
  try {
    const { username, email, password } = formData
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return {
        success: false,
        message: "This email is in use"
      }
    }

    if (existingUser && existingUser.username === username) {
      throw new Error("Username not available")
    }

    const user = await User.create(formData)


    const newRefreshToken = generateRefreshToken()
    const session = await createSession(user._id, newRefreshToken) // Create a new session with a refresh token from here


    return {
      success: true,
      message: "Registration successful",
      userId: user._id,
      sessionId: session._id,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
    }

  } catch (err) {
    console.error("Register Error:", err.message, err)
    return {
      success: false,
      message: err.message
    }
  }
}



export const login = async (formData) => {
  try {
    const { email, password } = formData



    const user = await User.findOne({ email: email })

    if (!user) {
      throw new Error("No user found")
    }
    if (user.password !== password) {
      throw new Error("Invalid password")
    }

    const newRefreshToken = generateRefreshToken()
    const session = await createSession(user._id, newRefreshToken)  // Create a new session with a refresh token from here 


    return {
      success: true,
      message: "Registration successful",
      userId: user._id,
      sessionId: session._id,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
    }

  } catch (err) {
    console.error("Login Error:", err.message, err)
    return {
      success: false,
      message: err.message
    }
  }
}



export const logout = async (sessionId, refreshToken) => {
  try {
    const deleted = await Session.findOneAndDelete({
      _id: sessionId,
      refreshToken
    });

    if (!deleted) {
      console.warn("Logout with non-existent session", { sessionId });
    }

    return {
      success: true,
      message: "Logged out successfully"
    };

  } catch (err) {
    console.error("Logout Error:", err);
    return {
      success: false,
      message: "Logout failed"
    };
  }
};