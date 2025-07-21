import fs from 'fs';
import path from 'path';
import { spawn, exec as rawExec } from 'child_process';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const exec = promisify(rawExec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const out_path = path.join(__dirname, 'executable');

if (!fs.existsSync(out_path)) {
  fs.mkdirSync(out_path, { recursive: true });
}

const TIME_LIMIT_MS = 3000;

const runcode = async (filepath, input_path, mode) => {
  const output_name = path.basename(filepath).split('.')[0];
  const out_file_path = path.join(out_path, `${output_name}.exe`);

  try {
    await exec(`g++ "${filepath}" -o "${out_file_path}"`);

    return await new Promise((resolve) => {
      let input = '';
      if (input_path && fs.existsSync(input_path)) {
        input = fs.readFileSync(input_path, 'utf-8');
      }

      const child = spawn(out_file_path, {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';
      let killed = false;

      const timer = setTimeout(() => {
        killed = true;
        child.kill('SIGKILL');
      }, TIME_LIMIT_MS);

      try {
        child.stdin.write(input);
        child.stdin.end();
      } catch {}

      child.stdin.on('error', () => {}); // prevent EPIPE

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', () => {
        clearTimeout(timer);
        if (killed) {
          resolve({
            output: 'TLE Time Limit Exceeded',
            error: 'Time Limit Exceeded',
          });
        } else {
          resolve({
            output: stdout || 'Execution failed',
            error: stderr || null,
          });
        }
      });

      child.on('error', () => {
        clearTimeout(timer);
        resolve({
          output: 'Execution failed',
          error: 'Internal execution error',
        });
      });
    });
  } catch (err) {
    return {
      output: 'Execution failed',
      error: err.stderr || err.message || 'Compilation or runtime error',
    };
  } finally {
    if (mode === 'compiler') {
      try { fs.rmSync(filepath, { force: true }); } catch {}
      try { fs.rmSync(out_file_path, { force: true }); } catch {}
      try {
        if (input_path && fs.existsSync(input_path)) {
          fs.rmSync(input_path, { force: true });
        }
      } catch {}
    }
  }
};

export default runcode;
