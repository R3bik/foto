import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPosts } from "./controllers/posts.js";
import fs from "fs";
import { updateUser } from "./controllers/user.js";

// CONFIGURATIONS

// this is used when we use type : module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORING
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/assets";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Creates the folder if it doesn't exist
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes that require upload with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPosts);
app.patch("/update/:id", verifyToken, upload.single("picture"), updateUser);

// normal routes
app.use("/auth", authRoutes);
// user routes
app.use("/user", userRoutes);
// post routes
app.use("/posts", postRoutes);

// MONGODB CONFIG
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running : ${PORT} and connected to Mongo`);
    });
  })
  .catch((error) => console.log(error));
