import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
// import { createUserRouter } from "./routes/users.js";
// import { createPostRouter } from "./routes/posts.js";
// import { createReviewRouter } from "./routes/reviews.js";
// import { createComplaintRouter } from "./routes/complaints.js";
// import { UserModel } from './models/UserModel.js';
// import { PostModel } from './models/PostModel.js';
// import { ReviewModel } from "./models/ReviewModel.js";
// import { ComplaintModel } from "./models/ComplaintModel.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// app.use("/users", createUserRouter(UserModel));
// app.use("/posts", createPostRouter(PostModel));
// app.use("/reviews", createReviewRouter(ReviewModel));
// app.use("/complaints", createComplaintRouter(ComplaintModel));

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
    res.send("<h2>All set!</h2>");
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});


