const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "../utils/codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
  console.log("Created codes directory at:", dirCodes);
}

const generateFile = async (language, code) => {
  const extMap = {
    cpp: "cpp",
    c: "c",
    python: "py",
    java: "java",
  };

  const jobID = uuid();
  const filename = `${jobID}.${extMap[language]}`;
  const filepath = path.join(dirCodes, filename);

  try {
    await fs.promises.writeFile(filepath, code);
    return filepath;
  } catch (err) {
    throw err;
  }
};

module.exports = generateFile;