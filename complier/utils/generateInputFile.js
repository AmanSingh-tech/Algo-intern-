const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "../utils/inputs");

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (inputData) => {
  try {
    const filename = `${uuid()}.txt`;
    const filepath = path.join(dirInputs, filename);

    await fs.promises.writeFile(filepath, inputData, "utf8");
    return filepath;
  } catch (err) {
    console.error("Error generating input file:", err);
    throw err;
  }
};

module.exports = generateInputFile;