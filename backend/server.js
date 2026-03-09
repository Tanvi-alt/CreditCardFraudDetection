import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Use environment variable for ML service URL
const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || "http://localhost:8000/predict";

// Health check
app.get("/", (req, res) => {
  res.send("Node backend is running");
});

// Main API endpoint
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(ML_SERVICE_URL, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "ML service not available"
    });
  }
});

// 🔥 Render-compatible port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Node server running on port ${PORT}`)
);