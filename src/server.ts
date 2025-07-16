import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.EXPRESS_APP_MONGO_DB_URI as string;
async function bootstrap() {
  try {
    console.log("Connecting to MongoDB",MONGO_DB_URI);
    await mongoose.connect(MONGO_DB_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

bootstrap();
