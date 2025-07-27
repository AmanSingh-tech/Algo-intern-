import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import getfilepath from "./Help_Functions/getfilepath.js";
import runcode from "./Help_Functions/runcode.js";
import getinputpath from "./Help_Functions/getinputpath.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>HELLO FROM COMPILER</h1>");
});

app.post("/run", async (req, res) => {
  try {
    const { language = "cpp", code, inputs = "", mode = "OJ" } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: "Please provide both 'language' and 'code'.",
      });
    }

    const filepath = getfilepath(language, code); // Save code file
    const inputPath = getinputpath(inputs);       // Save input as txt
    const verdict = await runcode(filepath, inputPath, mode); // Compile and execute

    return res.json({
      success: true,
      verdict: verdict.output?.replace(/\r\n/g, "\n") || "No Output",
      err: verdict.error || "No Error",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error:
        err.message || err.error || "Unknown error occurred during execution",
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
