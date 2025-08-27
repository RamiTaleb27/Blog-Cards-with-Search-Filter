const express = require("express");
const path = require("path");
const jsonServer = require("json-server");

const app = express();

// Serve static React build
app.use(express.static(path.join(__dirname, "./dist")));

// json-server API
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router);

// Serve React for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
