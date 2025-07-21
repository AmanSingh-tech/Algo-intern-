import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir_path = path.join(__dirname, 'codes');


// Make codes dir if not exists
if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path, { recursive: true });
}



const getfilepath = (language, code) => {
    const uniq_file_name = uuid();
    const filename = `${uniq_file_name}.${language}`;
    const filepath = path.join(dir_path, filename);

    // Write code to the file
    fs.writeFileSync(filepath, code);

    return filepath;
};

export default getfilepath;
