const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes
app.use("/openai", require("./routes/openAiRoutes"));

app.listen(port, () => console.log(`Server running on port ${port}`));
