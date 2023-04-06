import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL || "", {});
    console.log("Connected to mongo db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
