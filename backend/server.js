const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const connectToDB = require('./db/ConnectToDB');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

let corsOptions = {
  origin: ["https://idea-fusion-5t4mp1j4l-rashids-projects-31657ec3.vercel.app/"],
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
};
app.use("*", cors(corsOptions));

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: "Welcome to the Idea Sharing App API"
  })
})


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDB();
});
