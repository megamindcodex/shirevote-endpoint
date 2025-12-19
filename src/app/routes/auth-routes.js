import express from "express"
import verifyRefreshToken from "../middlewares/verifyRefreshtoken.js"
import {loginPayloadValidation} from "../middlewares/authDataValidation.js"

import {
  register_controller,
  login_controller,
  request_reset_code_controller,
  verify_reset_code_controller,
  reset_password_controller,
  logout_controller,
  refresh_request_controller
} from "../controllers/auth-controller.js"

const router = express.Router()

router.get("/refresh_access_token", verifyRefreshToken, refresh_request_controller)
router.post("/register", register_controller)
router.post("/login", loginPayloadValidation, login_controller)
router.post("/request_code", request_reset_code_controller
)
router.delete("/logout/:sessionId", logout_controller)

export default router
