const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoute");
const errorHandler = require("./middleware/errorHandler");
const ConnectDB = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(errorHandler);
app.set("view engine", "ejs");

// Connect with the database...
ConnectDB();

// Middleware for the router...
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
