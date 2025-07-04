const { spawn } = require("child_process");
const path = require("path");

const runJavaDirect = (filepath, inputStr = "") => {
  return new Promise((resolve, reject) => {
    const filenameWithExt = path.basename(filepath); 
    const workingDir = path.dirname(filepath);

    const process = spawn("java", [filenameWithExt], {
      cwd: workingDir, 
    });

    let output = "", error = "";

    process.stdin.write(inputStr);
    process.stdin.end();

    process.stdout.on("data", (data) => output += data.toString());
    process.stderr.on("data", (data) => error += data.toString());

    process.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(error || `Exited with code ${code}`);
    });
  });
};

module.exports = { runJavaDirect };