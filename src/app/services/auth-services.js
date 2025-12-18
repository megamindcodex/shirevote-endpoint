import { User } from "../models/userModel.js"
import {Session} from "../models/sessionModel.js"
import {generateRefreshToken} from "../utils/refreshToken.js"

export const register = async (formData) => {
  try {
    const {username, email, password} = formData
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      throw new Error("User already exists")
    }
    
    if (existingUser && existingUser.username === usernamer) {
      throw new Error("Username not available")
    }

    const user = await User.create(formData)
    
    const newRefreshToken = generateRefreshToken()
    const newSession = {
      userId: user._id,
      refreshToken: newRefreshToken,
      device: "samsung",
      ip: "192.168.0.1"
    }
    const session = await Session.create(newSession)
    
    
    return {
      success: true,
      message: "Registration successful",
      userId: user._id
      sessionId: session._id
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
    const {email, password} = formData 
    const user = await User.findOne({ email: email })
    
    if (!user) {
      throw new Error("No user found")
    }
    if (user.password !== password) {
      throw new Error("Invalid password")
    }
    
   const newRefreshToken = generateRefreshToken()
   
    const newSession = {
      userId: user._id,
      refreshToken: newRefreshToken,
      device: "samsung",
      ip: "192.168.0.1"
    }
    await Session.create(newSession)
    

    return {
      success: true,
      message: "Login successful",
      userId: user._id
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