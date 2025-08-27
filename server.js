import path from "path";
import express from "express";
import jsonServer from "json-server";
import { fileURLToPath } from "url";

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "./dist")));

// json-server API
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router);

// Serve React for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
