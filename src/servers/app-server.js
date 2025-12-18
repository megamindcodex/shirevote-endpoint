import {registerRoutes} from "../app/routes/routes.js" 
const PORT = 4500

export const startAppServer = async (app, server) => {
  try {
    
    registerRoutes(app)
    
    app.get("/", (req, res) => {
      console.log("this get is from request from postman")
      res.send("Hellow there mother fucker!")
    })
    
    
    server.listen(PORT || 4500, () => {
      console.log(`server listening on port:${PORT} at http://localhost:${PORT}`)
    })
    return
  }catch {
    console.log(err)
    return {success: false, message: "err.message"}
  }
}
