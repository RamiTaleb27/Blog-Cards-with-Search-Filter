const path = require("path");
const express = require("express");
const jsonServer = require("json-server");

const app = express();

// Serve static files from relative path
app.use(express.static(path.join(__dirname, "./dist")));

// json-server API (relative path)
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
app.use("./api", middlewares, router); // using relative path

// Serve React for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
