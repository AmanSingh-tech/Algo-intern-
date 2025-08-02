#!/usr/bin/env node
import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);

async function main() {
  console.log('🚀 Final Deployment Readiness Check');
  console.log('====================================\n');

  // Check environment files
  console.log('📁 Environment Configuration:');
  const envFiles = ['.env', '.env.local', '.env.docker'];
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ⚠️  ${file} (missing)`);
    }
  }
  console.log();

  // Check services
  console.log('🔍 Service Status:');
  let frontendStatus = false;
  let backendStatus = false;
  let compilerStatus = false;

  // Backend check
  try {
    const response = await fetch('http://localhost:8000/health');
    console.log('   ✅ Backend Server (Port 8000)');
    backendStatus = true;
  } catch (error) {
    console.log('   ❌ Backend Server (Port 8000)');
  }

  // Frontend check
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch('http://localhost:3000', { 
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    
    console.log('   ✅ Frontend Server (Port 3000)');
    frontendStatus = true;
  } catch (error) {
    console.log('   ❌ Frontend Server (Port 3000)');
  }

  // Compiler check
  try {
    const response = await fetch('http://localhost:3002');
    console.log('   ✅ Compiler Service (Port 3002)');
    compilerStatus = true;
  } catch (error) {
    console.log('   ❌ Compiler Service (Port 3002)');
  }

  console.log();

  // Database check
  console.log('💾 Database & API:');
  try {
    const response = await fetch('http://localhost:8000/new/problems');
    const data = await response.json();
    console.log(`   ✅ Database Connected (${data.problems?.length || 0} problems)`);
  } catch (error) {
    console.log('   ❌ Database Connection Failed');
  }

  // Test key API endpoints
  const endpoints = [
    { name: 'Problems API', url: 'http://localhost:8000/new/problems' },
    { name: 'User API', url: 'http://localhost:8000/new/user/health' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url);
      console.log(`   ✅ ${endpoint.name}`);
    } catch (error) {
      console.log(`   ❌ ${endpoint.name}`);
    }
  }

  console.log();

  // Docker files check
  console.log('🐳 Docker Configuration:');
  const dockerFiles = [
    'docker-compose.yml',
    'docker-compose.prod.yml', 
    'client/Dockerfile',
    'server/Dockerfile',
    'Compiler/Dockerfile'
  ];
  
  for (const file of dockerFiles) {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file}`);
    }
  }

  console.log();

  // Final summary
  console.log('📊 DEPLOYMENT SUMMARY');
  console.log('=====================');
  console.log(`Frontend:  ${frontendStatus ? '✅ READY' : '❌ FAILED'}`);
  console.log(`Backend:   ${backendStatus ? '✅ READY' : '❌ FAILED'}`);
  console.log(`Compiler:  ${compilerStatus ? '✅ READY' : '❌ FAILED'}`);
  console.log();

  if (frontendStatus && backendStatus && compilerStatus) {
    console.log('🎉 DEPLOYMENT READY!');
    console.log('🌐 Application URL: http://localhost:3000');
    console.log('📡 API Base URL: http://localhost:8000');
    console.log('⚙️  Compiler URL: http://localhost:3002');
    console.log();
    console.log('🚀 Ready for production deployment!');
  } else {
    console.log('⚠️  Some services failed. Check logs above.');
  }
}

main().catch(console.error);
