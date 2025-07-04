const { spawn } = require("child_process");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");

const outputPath = path.join(__dirname, "../utils/outputs");
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const runPython = async (filepath, inputStr = "") => {
  return new Promise((resolve, reject) => {
    const process = spawn("python3", [filepath]);

    let output = "", error = "";

    process.stdin.write(inputStr);
    process.stdin.end();

    process.stdout.on("data", data => output += data.toString());
    process.stderr.on("data", data => error += data.toString());

    process.on("close", code => {
      if (code === 0) resolve(output);
      else reject(error || `Exited with code ${code}`);
    });
  });
};

module.exports = { runPython };