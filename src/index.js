import express from "express";
import path from "path";
import { HackerNewsRouter } from "./routes";

// unhandled error
process.on("unhandledRejection", (error) => {
    // Will print "unhandledRejection err is not defined"
    console.log("unhandledRejection", error);
});

// Application Initialization
const app = express();

// Static file directory
app.use("/static", express.static(path.resolve(__dirname, "public")));

// route config for server
app.use("/", HackerNewsRouter);

// App Listening Port
app.listen(3000);
