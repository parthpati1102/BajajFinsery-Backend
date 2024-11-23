const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Helpers
const splitData = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(parseInt(item));
    } else if (typeof item === "string") {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  return { numbers, alphabets, highestLowercase };
};

// Middleware
app.use(cors());

app.use(cors({
  origin: 'https://bajajfinsery-frontend.onrender.com'  // Adjust this to match your frontend's URL and port
}));

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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
