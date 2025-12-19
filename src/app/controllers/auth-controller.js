
import { register, login } from "../services/auth-services.js"
import generateAccessToken from "../utils/generateAccessToken.js"



// controller function to handle access token refresh requests
// NOTE: This function assumes that the verifyRefreshToken middleware
// has already validated the refresh token and attached user info to req.user
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
    // console.log(formData)

    const result = await register(formData)

    if (!result.success) {
      return res.status(400).json({ message: result.message })
    }

    const accessToken = generateAccessToken(result.userId, result.sessionId)

    const expiresAt = result.expiresAt
    // calculate maxAge in milliseconds for cookie expiration. Note: cookie maxAge checks time duration from now
    const maxAge = new Date(expiresAt).getTime() - Date.now()

    const cookieConfig = {
      httpOnly: true,
      maxAge: maxAge,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    }

    // console.log("refresh token set in cookie", result.refreshToken)

    res.status(201)
      .cookie("refreshToken", result.refreshToken, cookieConfig)
      .json({ message: result.message, accessToken: accessToken })


  } catch (err) {
    console.error("Register error:", err, err.message)
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

    if (!result.success) {
      return res.status(400).json({ message: result.message })
    }

    const accessToken = generateAccessToken(result.userId, result.sessionId)


    const expiresAt = result.expiresAt

    const maxAge = new Date(expiresAt).getTime() - Date.now()  // calculate maxAge in milliseconds for cookie expiration. Note: cookie maxAge checks time duration from now

    const cookieConfig = {
      httpOnly: true,
      maxAge: maxAge,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    }

    res.status(201)
      .cookie("refreshToken", result.refreshToken, cookieConfig)
      .json({ message: result.message, accessToken: accessToken })

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

