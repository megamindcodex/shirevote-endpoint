
import { register, login } from "../services/auth-services.js"
import { generateAccessToken } from "../utils/jwt-sign.js"



// controller function to handle access token refresh requests
export const refresh_request_controller = (req, res) => {
  try {
    const { userId, sessionId } = req.user

    const result = generateAccessToken(userId, sessionId)
    res.status(200).json({
      accessToken: result.accessToken
    })
  } catch (err) {
    console.error("Refresh Token Error:", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message })
  }
}


export const register_controller = async (req, res) => {
  try {
    const formData = req.body
    console.log(formData)

    const result = await register(formData)
    const accessToken = generateAccessToken(result.userId, result.sessionId)
    
    const cookieConfig = {
      httpOnly = true,
      maxAge: 
    }
    
    console.log(result.message)
    res.status(201).json({
      message: result.message
    })


  } catch (err) {
    console.error("Register error:", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message })
  }
}



export const login_controller = async (req, res) => {
  try {
    const formData = req.body
    const result = await login(formData)
    console.log(result.message)
    res.status(200).json({ message: result.message })
  } catch (err) {
    console.error("Login error:", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message })
  }
}


export const request_reset_code_controller = (req, res) => {
  try { } catch (err) { }
}


export const verify_reset_code_controller = (req, res) => {
  try { } catch (err) { }
}


export const reset_password_controller = (req, res) => {
  try { } catch (err) { }
}


export const logout_controller = async (req, res) => {
  try {
    const { sessionId } = req.params
    const { refreshToken } = req.body
    await logout(sessionId, refreshToken)

    res.status(200).json({ message: "logout successfull" })
  } catch (err) {
    console.error("Login error:", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message })
  }
}

