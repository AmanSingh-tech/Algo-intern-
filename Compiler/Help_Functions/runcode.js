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

const runcode = async (filepath, input_path, mode = 'OJ') => {
  const ext = path.extname(filepath).slice(1);
  const base = path.basename(filepath, `.${ext}`);
  const out_file_path = path.join(out_path, `${base}.out`);

  let command, runProcessPath;

  try {
    switch (ext) {
      case "cpp":
        await exec(`g++ "${filepath}" -o "${out_file_path}"`);
        runProcessPath = out_file_path;
        break;
      case "c":
        await exec(`gcc "${filepath}" -o "${out_file_path}"`);
        runProcessPath = out_file_path;
        break;
      case "py":
        command = `python3 "${filepath}"`;
        break;
      case "js":
        command = `node "${filepath}"`;
        break;
      default:
        throw new Error("Unsupported language");
    }

    const input = input_path && fs.existsSync(input_path)
      ? fs.readFileSync(input_path, "utf-8")
      : "";

    return await new Promise((resolve) => {
      const child = command
        ? spawn(command, { shell: true })
        : spawn(runProcessPath, { stdio: ['pipe', 'pipe', 'pipe'] });

      let stdout = '', stderr = '', killed = false;

      const timer = setTimeout(() => {
        killed = true;
        child.kill('SIGKILL');
      }, TIME_LIMIT_MS);

      try {
        child.stdin.write(input);
        child.stdin.end();
      } catch {}

      child.stdin.on('error', () => {});

      child.stdout.on('data', (data) => (stdout += data.toString()));
      child.stderr.on('data', (data) => (stderr += data.toString()));

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
