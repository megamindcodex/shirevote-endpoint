import http from "http";
import express from "express";
import cookieParser from "cookie-parser"
import { connectdb } from "../db/db-connection.js";
import { startAppServer } from "./app-server.js";
// import { initiateSocketIo } from "./socketIo-server.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser())

export const startAllServers = async () => {
  try {
    await connectdb();
    await startAppServer(app, server);

    // await initiateSocketIo(server);

    console.log("Application started successfully");
  } catch (err) {
    console.error("Error starting Application:", err);

    // Ensure the process does NOT continue
    process.exit(1);
  }
};