const express = require("express");
const router = express.Router();

const generateFile = require("../utils/generateFile");

const { compileCpp, runCpp } = require("../execution/executeCpp");
const { compileC, runC } = require("../execution/executeC");
const { runPython } = require("../execution/executePython");
const { runJavaDirect } = require("../execution/executeJava");


const path = require("path");

router.post("/submit", async (req, res) => {
  const { code, language = "cpp", testCases = [] } = req.body;

  if (!code || !Array.isArray(testCases) || testCases.length === 0) {
    return res.status(400).json({ error: "Missing code or test cases" });
  }

  try {
    const filepath = await generateFile(language, code);
    const results = [];
    let passedAll = true;

    // Compile once
    let executablePath = "", className = "", dir = "";

    switch (language) {
      case "cpp":
        executablePath = compileCpp(filepath);
        break;
      case "c":
        executablePath = compileC(filepath);
        break;
    }

    for (const test of testCases) {
      try {
        let output = "";

        switch (language) {
          case "cpp":
            output = await runCpp(executablePath, test.input);
            break;
          case "c":
            output = await runC(executablePath, test.input);
            break;
          case "python":
            output = await runPython(filepath, test.input);
            break;
          case "java":
            output = await runJavaDirect(filepath, test.input);
            break;
          default:
            throw new Error("Unsupported language");
        }

        const actual = output.trim();
        const expected = test.output.trim();
        const passed = actual === expected;

        if (!passed) passedAll = false;

        results.push({
          input: test.input,
          expectedOutput: expected,
          actualOutput: actual,
          passed,
        });
      } catch (err) {
        passedAll = false;
        results.push({
          input: test.input,
          expectedOutput: test.output.trim(),
          actualOutput: err,
          passed: false,
        });
      }
    }

    res.json({ passedAll, results });

  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: err.message || "Internal error" });
  }
});

module.exports = router;