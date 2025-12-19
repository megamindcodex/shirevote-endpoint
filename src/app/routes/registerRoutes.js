
import authRouters from "./auth-routes.js"
import userRouters from "./user-routes.js"

const registerRoutes = (app) => {
  app.use("/auth", authRouters)
  app.use("/user", userRouters)
}

export default registerRoutes