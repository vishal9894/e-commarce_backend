const express = require("express");
const connectDB = require("./db/auth");
const userRoutes = require("./routes/userRoute");
const app = express();
const PORT = 3000;
const cors = require("cors")

const server = async () => {
  try {
    app.use(express.json());
    app.use(cors());

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
