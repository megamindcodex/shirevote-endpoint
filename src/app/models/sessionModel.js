import mongoose from "mongoose"
const { Schema } = mongoose

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true
  },
  device: String,
  ip: String,

  expiresAt: {
    type: Date,
    required: true
  }
}, { timestamps: true })

sessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
) /*this field creates a TTL (Time-To-Live) index on the expiresAt field so MongoDB automatically deletes the session document when the expiresAt timestamp is reached, with no delay or manual cleanup logic required.*/

export const Session = mongoose.model("Session", sessionSchema)
