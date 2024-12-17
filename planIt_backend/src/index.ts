import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
