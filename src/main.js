import express from "express";
import { configEnv } from "./config/config.js";
import { connectDb } from "./db/data.js";
import adminRouter from "./router/admin.router.js";
import cookieParser from "cookie-parser";
import clientRouter from "./router/client.router.js";
import salesmanRouter from "./router/salesman.router.js";
import categoryRouter from "./router/category.route.js";

const app = express();
const port = configEnv.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDb();

app.use("/admin", adminRouter);
app.use("/client", clientRouter);
app.use("/salesman", salesmanRouter);
app.use("/category", categoryRouter);

app.listen(port, () => console.log(`Server running ${port}`));
