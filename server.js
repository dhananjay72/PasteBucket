const express = require("express");
const app = express();
const auth = require("./routes/auth");
require("dotenv").config();
const connectDB = require("./db/connect");
const users = require("./routes/users");
const dumps = require("./routes/Dumps");
const cors = require("cors");
// Middleware

app.use(express.json());
app.use(express.json({ extended: false }));

connectDB(process.env.MONGO_URI);

// Routes:
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/d", dumps);

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running of port ${PORT}`));
