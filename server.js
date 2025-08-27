const path = require("path");
const express = require("express");
const jsonServer = require("json-server");

const app = express();

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "dist")));

// Setup json-server for API routes
const router = jsonServer.router("db.json"); // your JSON database
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router);

// All other requests serve React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
