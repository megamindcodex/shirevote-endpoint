import {Session} from "../models/sessionModel.js"

const checkSessionExist = async (req, res, next) => {
  try{
  const sessionId = req.sessionId
  const session = await Session.findById(sessionId)
  
  if(!session) {
    return res.status(401).json({message: "session Expired"})
  }
  

  next()
  }catch(err) {
    console.error("check session Exist Error:", err)
    const status = err.statusCode || 500
    const message =
          status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message })
  }
}

export default checkSessionExist