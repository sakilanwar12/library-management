import app from "./app";
import mongoose from "mongoose";

const PORT = 5000;
async function bootstrap() {
  try {
    await mongoose.connect(
      "mongodb+srv://library-management-admin:hyO31Srz5E8wxHi1@cluster0.fdaifxk.mongodb.net/library-management"
    );
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

bootstrap();
