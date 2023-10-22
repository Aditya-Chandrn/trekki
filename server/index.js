import express from "express";
import { config } from "dotenv";
import cors from "cors";

import ConnectMongoDB from "./configs/db.js";
import BlogRouter from "./routers/blogRouter.js";
import AuthRouter from "./routers/authRouter.js";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect MongoDB
ConnectMongoDB();

//routes
app.use("/api/blog", BlogRouter);
app.use("/api/account/", AuthRouter);

config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

console.log("\n <<< --------------------------------------------------------------------------------------------------- >>>\n");
