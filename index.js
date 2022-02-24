const express = require("express");
const cors = require("cors");
const app = express();
const jobs = require("./routes/jobs.routes");
const marketplace = require("./routes/marketplace.routes");
const notFound = require("./middleware/not-found");
const errorHandlermiddleware = require("./middleware/error-handler");
require("dotenv").config();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(
  `/uploads/apikey=?`,
  express.static("uploads")
);
app.use(express.json());
app.use(`/api/v1/mistreci/apikey=?`, jobs);
app.use(
  `/api/v1/mistreci/apikey=?`,
  marketplace
);
app.use(notFound);
app.use(errorHandlermiddleware);
// Listen on enviroment port or 5000
// app.listen(port, () => console.log(`Listen on port ${port}`));
app.listen(port);
