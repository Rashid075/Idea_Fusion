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


app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Route to handle all other requests and send the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDB();
});
