const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { outputDir } = require("../utils/paths");

const executeCpp = (filepath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFile = path.join(outputDir, `${jobId}.out`);

    exec(`g++ ${filepath} -o ${outputFile} && ${outputFile}`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout);
    });
  });
};

module.exports = executeCpp;