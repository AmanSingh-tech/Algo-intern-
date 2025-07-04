const express = require("express");
const router = express.Router();

const generateFile = require("../utils/generateFile");
const generateInputFile = require("../utils/generateInputFile");

const { compileCpp, runCpp } = require("../execution/executeCpp");
const { compileC, runC } = require("../execution/executeC");
const { runPython } = require("../execution/executePython");
const { runJavaDirect } = require("../execution/executeJava");


const path = require("path");

router.post("/run", async (req, res) => {
  const { language = "cpp", code, input = "" } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const filepath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    let output = "", className = "", dir = "", executablePath = "";

    switch (language) {
      case "cpp":
        executablePath = compileCpp(filepath);
        output = await runCpp(executablePath, input);
        break;
      case "c":
        executablePath = compileC(filepath);
        output = await runC(executablePath, input);
        break;
      case "python":
        output = await runPython(filepath, input);
        break;
      case "java":
       output = await runJavaDirect(filepath, input);
        break;
      default:
        return res.status(400).json({ error: "Unsupported language" });
    }

    return res.json({ output });

  } catch (err) {
    console.error("Run error:", err);
    return res.status(500).json({ stderr: err.message || "Execution failed" });
  }
});

module.exports = router;