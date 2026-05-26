const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: node run-python.js <script.py> [args...]");
    process.exit(1);
}

const pythonScript = args[0];
const scriptArgs = args.slice(1);

// Resolve target script path relative to working directory
const scriptPath = path.resolve(pythonScript);

const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

const pyProcess = spawn(pythonCmd, [scriptPath, ...scriptArgs], { stdio: 'inherit' });

pyProcess.on('close', (code) => {
    process.exit(code);
});
