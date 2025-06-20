import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
let server: Server;
let PORT = 5000;
async function bootstrap() {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

bootstrap();
