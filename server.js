const express = require("express");
const connectDB = require("./db/auth");
const userRoutes = require("./routes/userRoute");
const cookiesParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = 3000;
const cors = require("cors");
const productRoute = require("./routes/productsRoute");

const server = async () => {
  try {
    app.use(express.json());
    app.use(cookiesParser());
    app.use(express.urlencoded({ extended: true }));


    
    // Serve static files from uploads directory - FIXED PATH
    app.use('/uploads', express.static('uploads'));

    
    app.use(cors({
      origin: "http://localhost:5173", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

    await connectDB();

    app.use("/api/user", userRoutes);
    app.use("/api/product", productRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

server();