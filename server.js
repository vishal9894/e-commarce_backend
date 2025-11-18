const express = require("express");
const connectDB = require("./db/auth");
const userRoutes = require("./routes/userRoute");
const cookiesParser = require("cookie-parser")
const app = express();
const PORT = 3000;

const server = async () => {
  try {
    app.use(express.json());
    app.use(cookiesParser());

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
