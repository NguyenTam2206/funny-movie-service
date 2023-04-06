import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  url: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("movie", movieSchema);
