#!/usr/bin/env node

/**
 * Deployment Readiness Check Script
 * Verifies all components are working correctly before deployment
 */

import { promises as fs } from 'fs';
import path from 'path';

const BACKEND_URL = 'http://localhost:8000';
const FRONTEND_URL = 'http://localhost:3001';
const COMPILER_URL = 'http://localhost:3002';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkService(name, url, path = '') {
  try {
    const response = await fetch(`${url}${path}`, { 
      signal: AbortSignal.timeout(5000)
    });
    const status = response.status;
    
    if (status >= 200 && status < 300) {
      log(`✅ ${name} is running (${status})`, 'green');
      return true;
    } else {
      log(`❌ ${name} returned status ${status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${name} is not accessible: ${error.message}`, 'red');
    return false;
  }
}

async function checkDatabaseConnection() {
  try {
    const response = await fetch(`${BACKEND_URL}/new/problems`, { 
      signal: AbortSignal.timeout(10000)
    });
    const data = await response.json();
    
    if (data.success && data.problems && data.problems.length > 0) {
      log(`✅ Database connection working (${data.problems.length} problems found)`, 'green');
      return true;
    } else {
      log(`❌ Database connection failed or no data found`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Database check failed: ${error.message}`, 'red');
    return false;
  }
}

async function checkEnvFiles() {
  const envFiles = [
    '/home/pendulum/algo-task/server/.env',
    '/home/pendulum/algo-task/client/.env.local'
  ];
  
  let allGood = true;
  
  for (const envFile of envFiles) {
    try {
      await fs.access(envFile);
      log(`✅ Environment file exists: ${path.basename(envFile)}`, 'green');
    } catch (error) {
      log(`❌ Missing environment file: ${path.basename(envFile)}`, 'red');
      allGood = false;
    }
  }
  
  return allGood;
}

async function checkRequiredPorts() {
  const ports = [
    { port: 8000, service: 'Backend Server' },
    { port: 3001, service: 'Frontend Server' },
    { port: 3002, service: 'Compiler Service' }
  ];
  
  log('\n🔍 Checking required ports...', 'blue');
  
  let allPortsOk = true;
  for (const { port, service } of ports) {
    const url = `http://localhost:${port}`;
    const isRunning = await checkService(service, url);
    if (!isRunning) allPortsOk = false;
  }
  
  return allPortsOk;
}

async function main() {
  log('🚀 Starting Deployment Readiness Check...', 'blue');
  log('=====================================\n', 'blue');
  
  // Check environment files
  log('📁 Checking Environment Configuration...', 'blue');
  const envOk = await checkEnvFiles();
  
  // Check if all services are running
  log('\n🔍 Checking Service Status...', 'blue');
  const servicesOk = await checkRequiredPorts();
  
  // Check database connection
  log('\n💾 Checking Database Connection...', 'blue');
  const dbOk = await checkDatabaseConnection();
  
  // Frontend check with longer timeout for Next.js SSR
  try {
    const frontendResponse = await axios.get('http://localhost:3000', { timeout: 15000 });
    console.log('✅ Frontend is accessible at http://localhost:3000');
    console.log('   - Status:', frontendResponse.status);
    console.log('   - Content length:', frontendResponse.data.length, 'bytes');
    frontendStatus = true;
  } catch (error) {
    console.log('❌ Frontend is not accessible:', error.message);
  }  const apiResults = await Promise.all(apiChecks);
  const apiOk = apiResults.every(result => result);
  
  // Final assessment
  log('\n📊 Deployment Readiness Summary:', 'blue');
  log('===============================', 'blue');
  
  const checks = [
    { name: 'Environment Files', status: envOk },
    { name: 'Services Running', status: servicesOk },
    { name: 'Database Connection', status: dbOk },
    { name: 'API Endpoints', status: apiOk }
  ];
  
  let allPassed = true;
  checks.forEach(check => {
    const status = check.status ? '✅ PASS' : '❌ FAIL';
    const color = check.status ? 'green' : 'red';
    log(`${check.name}: ${status}`, color);
    if (!check.status) allPassed = false;
  });
  
  log('\n' + '='.repeat(40), 'blue');
  
  if (allPassed) {
    log('🎉 DEPLOYMENT READY! All checks passed.', 'green');
    log('You can now deploy your application safely.', 'green');
  } else {
    log('⚠️  DEPLOYMENT NOT READY. Please fix the issues above.', 'yellow');
    log('Resolve all failed checks before deploying.', 'yellow');
  }
  
  log('\n📋 Next Steps for Deployment:', 'blue');
  log('1. Build frontend: cd client && npm run build', 'blue');
  log('2. Set production environment variables', 'blue');
  log('3. Use Docker: docker-compose -f docker-compose.prod.yml up', 'blue');
  log('4. Or deploy individual services to your hosting platform', 'blue');
}

main().catch(console.error);
