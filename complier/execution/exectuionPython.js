const { exec } = require("child_process");
const path = require("path");
const { outputDir } = require("../utils/paths");

const executePython = (filepath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFile = path.join(outputDir, `${jobId}.out`);

    exec(`python3 ${filepath}`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);

      require("fs").writeFileSync(outputFile, stdout);
      resolve(stdout);
    });
  });
};

module.exports = executePython;