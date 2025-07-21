import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.join(__dirname, 'inputs');  // Renamed to avoid confusion

// Create inputs directory if it doesn't exist
if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
}

const getinputpath = (inputs) => {
    const uniq_file_name = uuid();
    const input_filename = `${uniq_file_name}.txt`;
    const full_input_path = path.join(inputDir, input_filename);  // Renamed

    fs.writeFileSync(full_input_path, inputs);

    return full_input_path;
};

export default getinputpath;
