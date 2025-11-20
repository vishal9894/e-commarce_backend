const express = require("express");
const connectDB = require("./db/auth");
const userRoutes = require("./routes/userRoute");
const cookiesParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = 3000;
const cors = require("cors");

const server = async () => {
  try {
    app.use(express.json());
    app.use(cookiesParser());
    
    // Serve static files from public directory
    app.use(express.static(path.join(__dirname, "public")));
    
  
    
    app.use(cors({
      origin: "http://localhost:5173", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

    await connectDB();

    app.use("/api/user", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

server();