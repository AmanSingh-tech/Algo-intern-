const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
  const jobId = uuid();
  let filename;

  switch (language) {
    case "cpp":
      filename = `${jobId}.cpp`;
      break;
    case "c":
      filename = `${jobId}.c`;
      break;
    case "python":
      filename = `${jobId}.py`;
      break;
    case "java":
      filename = `${jobId}.java`; 
      code = code.replace(/public\s+class/g, "class");
      break;
    default:
      throw new Error("Unsupported language");
  }

  const filepath = path.join(dirCodes, filename);
  await fs.promises.writeFile(filepath, code);
  return filepath;
};

module.exports = generateFile;