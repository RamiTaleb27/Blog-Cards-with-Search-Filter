// server.js
const path = require("path");
const express = require("express");
const jsonServer = require("json-server");

const app = express();

// Serve React frontend
app.use(express.static(path.join(__dirname, "client/build")));

// Setup json-server
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router); // all API routes start with /api

// All other requests serve React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
