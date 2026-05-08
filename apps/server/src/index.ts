// import { auth } from "@chat-app/auth";
// import { env } from "@chat-app/env/server";
// import { toNodeHandler } from "better-auth/node";
// import cors from "cors";
// import express from "express";

// const app = express();
// app.use(
//   cors({
//     origin: env.CORS_ORIGIN,
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }),
// );

// app.all("/api/auth{/*path}", toNodeHandler(auth));

// app.use(express.json());

// app.get("/", (_req, res) => {
//   res.status(200).send("OK");
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });


import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});