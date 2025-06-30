const express = require("express");
const router = express.Router();
const generateFile = require("../utils/generateFile");
const executeCpp = require("../execution/executeCpp");
const executeC = require("../execution/executeC");
const executePython = require("../execution/executePython");
const executeJava = require("../execution/executeJava");

router.post("/run", async (req, res) => {
  console.log("Run request received");
  const { language = "cpp", code } = req.body;

  if (!code) return res.status(400).json({ error: "Empty code!" });

  try {
    const filepath = await generateFile(language, code);
    console.log("Code file generated at:", filepath); 

    let output;
    switch (language) {
      case "cpp":
        output = await executeCpp(filepath);
        break;
      case "c":
        output = await executeC(filepath);
        break;
      case "python":
        output = await executePython(filepath);
        break;
      case "java":
        output = await executeJava(filepath);
        break;
      default:
        return res.status(400).json({ error: "Unsupported language" });
    }

    res.json({ output });
  } catch (err) {
    console.error("Error during execution:", err);
    res.status(500).json({ error: err.message || err });
  }
});


module.exports = router;