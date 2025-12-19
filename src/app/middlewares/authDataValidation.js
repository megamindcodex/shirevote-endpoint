export const loginPayloadValidation = (req, res, next) => {
  const { email, password } = req.body ?? {}

  if (!email) {
    return res.status(400).json({ message: "Invalid email parameter" })
  }

  if (!password) {
    return res.status(400).json({ message: "Invalid password parameter" })
  }

  next()
}