import express from "express"

import { get_userData_controller } from "../controllers/user-controller.js"

import verifyAccessToken from "../middlewares/verifyAccessToken.js"
import checkSessionExist from "../middlewares/checkSessionExist.js"

const router = express.Router()


router.get("/getUser",
verifyAccessToken, checkSessionExist, get_userData_controller)


export default router