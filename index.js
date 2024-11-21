const express = require("express");
const bodyParser = require("body-parser");
const { detectPrimes, splitData } = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// POST Route for handling input
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate request data
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array of strings or numbers.",
      });
    }

    // Split data into numbers and alphabets
    const { numbers, alphabets, highestLowercase } = splitData(data);

    // Respond with processed data
    res.json({
      is_success: true,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ is_success: false, message: "Internal server error." });
  }
});

// GET Route (for testing if server is running)
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
