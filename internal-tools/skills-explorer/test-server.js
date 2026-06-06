const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const TEST_PORT = 3001;
const SERVER_PATH = path.join(__dirname, 'server.js');

console.log('🧪 INICIANDO SUÍTE DE TESTES DE SANIDADE DO SERVIDOR...');

// Start the server on port 3001 using environment variables or overriding logic
// Since server.js has hardcoded PORT = 3000, we will temporarily modify/read it
// Or we can dynamically load it and swap the port. Let's load the server file as a module 
// and run it by monkeypatching the listen or requiring it.
// To keep it simple and clean, let's spin up the server in a child process, but wait:
// since we want to run on 3001, we can pass it or read it.
// Actually, we can just run it using child process and check port 3000, but to avoid 
// port clashes with a running instance, let's boot it by replacing port in memory or just testing port 3000 if it is free.
// Even better: since server.js is a clean, dependency-free file, we can read server.js,
// replace "const PORT = 3000;" with "const PORT = 3001;", eval it, or write it to a temp test server file and execute it!
// Writing to a temp test server is incredibly robust and clean!

const fs = require('fs');
const originalCode = fs.readFileSync(SERVER_PATH, 'utf-8');
const testServerCode = originalCode.replace('const PORT = 3000;', `const PORT = ${TEST_PORT};`);

const TEST_SERVER_TEMP = path.join(__dirname, 'server-test-temp.js');
fs.writeFileSync(TEST_SERVER_TEMP, testServerCode, 'utf-8');

const serverProc = spawn('node', [TEST_SERVER_TEMP], {
  cwd: __dirname,
  stdio: ['ignore', 'pipe', 'pipe']
});

let serverOutput = '';
serverProc.stdout.on('data', (data) => {
  serverOutput += data.toString();
});

serverProc.stderr.on('data', (data) => {
  console.error(`[Server Stderr]: ${data}`);
});

// Helper to make request
function makeRequest(pathOptions) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path: pathOptions,
      method: 'GET',
      timeout: 2000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });

    req.on('error', err => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request Timeout'));
    });
    req.end();
  });
}

// Run assertions
setTimeout(async () => {
  let passed = true;
  console.log('🛸 Servidor de testes iniciado. Iniciando requisições...');

  try {
    // Test 1: Static index.html serving
    console.log('👉 Teste 1: GET / (Serviço Estático)...');
    const resIndex = await makeRequest('/');
    if (resIndex.statusCode === 200 && resIndex.body.includes('AGENTE-CORE')) {
      console.log('✅ Passou: Index.html retornado corretamente.');
    } else {
      console.error(`❌ Falhou: Status ${resIndex.statusCode}, Body: ${resIndex.body.substring(0, 100)}`);
      passed = false;
    }

    // Test 2: Skills index endpoint
    console.log('👉 Teste 2: GET /api/skills (API do Catálogo)...');
    const resSkills = await makeRequest('/api/skills');
    if (resSkills.statusCode === 200 || resSkills.statusCode === 404) {
      // 200 means index exists, 404 means index missing but handled gracefully
      console.log(`✅ Passou: Endpoint de skills respondeu com status ${resSkills.statusCode} conforme esperado.`);
    } else {
      console.error(`❌ Falhou: Status ${resSkills.statusCode}, Body: ${resSkills.body}`);
      passed = false;
    }

    // Test 3: Invalid route serving 404
    console.log('👉 Teste 3: GET /invalid-route-404...');
    const res404 = await makeRequest('/invalid-route-404');
    if (res404.statusCode === 404) {
      console.log('✅ Passou: Rota inexistente retornou 404 corretamente.');
    } else {
      console.error(`❌ Falhou: Status ${res404.statusCode}`);
      passed = false;
    }

    // Test 4: NotebookLM files list
    console.log('👉 Teste 4: GET /api/notebooklm-files (API do NotebookLM)...');
    const resNotebook = await makeRequest('/api/notebooklm-files');
    if (resNotebook.statusCode === 200) {
      console.log('✅ Passou: Endpoint do NotebookLM retornou status 200 e a lista de arquivos.');
    } else {
      console.error(`❌ Falhou: Status ${resNotebook.statusCode}, Body: ${resNotebook.body}`);
      passed = false;
    }

    // Test 5: Git status endpoint
    console.log('👉 Teste 5: GET /api/git-status (API do Git)...');
    const resGit = await makeRequest('/api/git-status');
    if (resGit.statusCode === 200) {
      try {
        const statusMap = JSON.parse(resGit.body);
        if (typeof statusMap === 'object' && statusMap !== null) {
          console.log('✅ Passou: Endpoint do Git status retornou status 200 e objeto JSON válido.');
        } else {
          console.error(`❌ Falhou: Retornou JSON mas não é um objeto. Body: ${resGit.body}`);
          passed = false;
        }
      } catch (e) {
        console.error(`❌ Falhou: Resposta não é um JSON válido. Body: ${resGit.body}`);
        passed = false;
      }
    } else {
      console.error(`❌ Falhou: Status ${resGit.statusCode}, Body: ${resGit.body}`);
      passed = false;
    }

  } catch (err) {
    console.error('❌ Ocorreu um erro ao fazer requisições para o servidor:', err.message);
    passed = false;
  } finally {
    // Cleanup
    console.log('🧹 Finalizando processo do servidor de teste...');
    serverProc.kill();
    
    try {
      if (fs.existsSync(TEST_SERVER_TEMP)) {
        fs.unlinkSync(TEST_SERVER_TEMP);
      }
    } catch (e) {
      console.error('Erro ao remover arquivo temporário de teste:', e.message);
    }

    if (passed) {
      console.log('🎉 TODOS OS TESTES PASSARAM COM SUCESSO! 100% OK.');
      process.exit(0);
    } else {
      console.error('🚨 A SUÍTE DE TESTES ENCONTROU FALHAS.');
      process.exit(1);
    }
  }
}, 1500); // Allow server to boot
