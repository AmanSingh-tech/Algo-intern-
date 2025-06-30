const path = require("path");
const fs = require("fs");

const outputDir = path.join(__dirname, "outputs");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log("Created outputs directory at", outputDir);
}

module.exports = { outputDir };