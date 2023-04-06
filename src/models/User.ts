import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("user", userSchema);
