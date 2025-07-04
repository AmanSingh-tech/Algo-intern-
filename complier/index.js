const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

const compileRoute = require("./routes/compile");
const submitRoute = require("./routes/submit");
const aiRoutes = require("./routes/ai");


app.use("/api/compiler", compileRoute);
app.use("/api/compiler", aiRoutes); 
app.use("/api/compiler", submitRoute);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB from compiler");
    app.listen(port, () => {
      console.log(`Compiler server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });