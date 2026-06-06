const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const REPO_ROOT = path.resolve(__dirname, '../..'); // Resolves c:\Dev\agente-core
const PUBLIC_DIR = path.join(__dirname, 'public');
const NOTEBOOK_DIR = path.join(REPO_ROOT, 'prompts', 'notebooklm');

// Ensure the NotebookLM export prompts directory exists
if (!fs.existsSync(NOTEBOOK_DIR)) {
  fs.mkdirSync(NOTEBOOK_DIR, { recursive: true });
}

// MIME types helper
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

// Safe file resolution to prevent directory traversal
function safeResolvePath(relativePath) {
  if (!relativePath) return null;
  const resolved = path.resolve(REPO_ROOT, relativePath);
  if (!resolved.startsWith(REPO_ROOT)) {
    return null; // Prevent traversing outside repo root
  }
  return resolved;
}

// Read JSON body helper
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => {
      reject(err);
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // API: GET /api/skills - Return skills index
    if (pathname === '/api/skills' && req.method === 'GET') {
      const indexPath = path.join(REPO_ROOT, 'modules', 'skills_index.json');
      if (!fs.existsSync(indexPath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Index file modules/skills_index.json not found. Run indexing first.' }));
        return;
      }
      const data = fs.readFileSync(indexPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
      return;
    }

    // API: GET /api/skill - Return content of a specific skill file
    if (pathname === '/api/skill' && req.method === 'GET') {
      const relPath = parsedUrl.searchParams.get('path');
      const absolutePath = safeResolvePath(relPath);

      if (!absolutePath) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid or missing file path.' }));
        return;
      }

      if (!fs.existsSync(absolutePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `File not found at: ${relPath}` }));
        return;
      }

      const content = fs.readFileSync(absolutePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ path: relPath, content }));
      return;
    }

    // API: POST /api/save-skill - Save skill content (with backup)
    if (pathname === '/api/save-skill' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const relPath = body.path;
      const content = body.content;
      const absolutePath = safeResolvePath(relPath);

      if (!absolutePath) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid or missing file path.' }));
        return;
      }

      // Check if file exists to create backup
      let backedUp = false;
      if (fs.existsSync(absolutePath)) {
        const backupPath = absolutePath + '.bak';
        fs.copyFileSync(absolutePath, backupPath);
        backedUp = true;
      }

      // Write new content
      fs.writeFileSync(absolutePath, content, 'utf-8');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, backedUp, path: relPath }));
      return;
    }

    // API: POST /api/reindex - Trigger skills index regeneration
    if (pathname === '/api/reindex' && req.method === 'POST') {
      const packageJsonPath = path.join(REPO_ROOT, 'modules');
      
      // Execute the indexing command in the modules directory
      // Since it runs in the user's shell session, they have access to node/npm environment.
      exec('npm run index', { cwd: packageJsonPath }, (error, stdout, stderr) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message, stderr }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, stdout, stderr }));
      });
      return;
    }

    // API: POST /api/proxy-ai - Proxy LLM API requests to avoid CORS and support streaming
    if (pathname === '/api/proxy-ai' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const { url, headers, method, data } = body;

      const targetUrl = new URL(url);
      const options = {
        hostname: targetUrl.hostname,
        port: 443,
        path: targetUrl.pathname + targetUrl.search,
        method: method || 'POST',
        headers: headers || {}
      };

      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy request failed', message: err.message }));
      });

      if (data) {
        proxyReq.write(typeof data === 'string' ? data : JSON.stringify(data));
      }
      proxyReq.end();
      return;
    }

    // API: GET /api/notebooklm-files - List all prompt cards/files in prompts/notebooklm
    if (pathname === '/api/notebooklm-files' && req.method === 'GET') {
      const files = fs.readdirSync(NOTEBOOK_DIR);
      const fileList = [];

      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.md' || ext === '.txt') {
          const filePath = path.join(NOTEBOOK_DIR, file);
          const stat = fs.statSync(filePath);
          fileList.push({
            name: file,
            size: stat.size,
            mtime: stat.mtime
          });
        }
      });

      // Sort by modification time (newest first)
      fileList.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(fileList));
      return;
    }

    // API: GET /api/notebooklm-file - Get content of a specific notebooklm card
    if (pathname === '/api/notebooklm-file' && req.method === 'GET') {
      const name = parsedUrl.searchParams.get('name');
      if (!name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing name parameter.' }));
        return;
      }

      const fileLoc = path.resolve(NOTEBOOK_DIR, name);
      if (!fileLoc.startsWith(NOTEBOOK_DIR)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Access Denied.' }));
        return;
      }

      if (!fs.existsSync(fileLoc)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found.' }));
        return;
      }

      const content = fs.readFileSync(fileLoc, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ name, content }));
      return;
    }

    // API: POST /api/save-notebooklm-file - Create or update a notebooklm file card
    if (pathname === '/api/save-notebooklm-file' && req.method === 'POST') {
      const body = await readJsonBody(req);
      let name = body.name ? body.name.trim() : '';
      const content = body.content || '';

      if (!name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing file name.' }));
        return;
      }

      // Safe formatting: sanitize filename, ensure it has .md or .txt extension
      name = name.replace(/[^a-zA-Z0-9-_\.]/g, '_'); // Replace unsafe characters
      if (!name.endsWith('.md') && !name.endsWith('.txt')) {
        name += '.md';
      }

      const fileLoc = path.resolve(NOTEBOOK_DIR, name);
      if (!fileLoc.startsWith(NOTEBOOK_DIR)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Access Denied.' }));
        return;
      }

      fs.writeFileSync(fileLoc, content, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, name }));
      return;
    }

    // API: POST /api/delete-notebooklm-file - Delete a notebooklm card file
    if (pathname === '/api/delete-notebooklm-file' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const name = body.name;

      if (!name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing file name.' }));
        return;
      }

      const fileLoc = path.resolve(NOTEBOOK_DIR, name);
      if (!fileLoc.startsWith(NOTEBOOK_DIR)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Access Denied.' }));
        return;
      }

      if (fs.existsSync(fileLoc)) {
        fs.unlinkSync(fileLoc);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }

    // API: GET /api/git-status - Get repository changes status via git status --porcelain
    if (pathname === '/api/git-status' && req.method === 'GET') {
      exec('git status --porcelain', { cwd: REPO_ROOT }, (error, stdout, stderr) => {
        if (error) {
          // If git is not initialized or fails, return empty statusMap gracefully
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({}));
          return;
        }

        const lines = stdout.split('\n');
        const statusMap = {};

        lines.forEach(line => {
          if (!line.trim()) return;
          const status = line.substring(0, 2).trim();
          let filePath = line.substring(3).trim();
          
          if (filePath.startsWith('"') && filePath.endsWith('"')) {
            filePath = filePath.slice(1, -1);
          }
          
          const normalizedPath = filePath.replace(/\\/g, '/');
          statusMap[normalizedPath] = status;
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(statusMap));
      });
      return;
    }

    // Default Static File Server
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    
    // Safety check for public folder static files traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Access Denied');
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
    }

  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🛸 AGENTE-CORE SKILLS EXPLORER ACTIVE`);
  console.log(`👉 UI: http://localhost:${PORT}`);
  console.log(`📂 REPO ROOT: ${REPO_ROOT}`);
  console.log(`==================================================`);
});
