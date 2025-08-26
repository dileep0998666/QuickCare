#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating deployment readiness...\n');

// Check required files
const requiredFiles = [
  'package.json',
  'next.config.mjs',
  'tsconfig.json',
  'vercel.json',
  '.env.example',
  'README.md',
  '.gitignore',
  'middleware.ts'
];

let allFilesPresent = true;

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allFilesPresent = false;
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['build', 'start', 'dev', 'vercel-build'];

requiredScripts.forEach(script => {
  if (packageJson.scripts[script]) {
    console.log(`  ✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`  ❌ ${script} - MISSING`);
    allFilesPresent = false;
  }
});

// Check environment variables template
console.log('\n🔐 Checking environment variables template:');
if (fs.existsSync('.env.example')) {
  const envExample = fs.readFileSync('.env.example', 'utf8');
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (envExample.includes(envVar)) {
      console.log(`  ✅ ${envVar}`);
    } else {
      console.log(`  ❌ ${envVar} - MISSING from .env.example`);
      allFilesPresent = false;
    }
  });
}

// Check Next.js config
console.log('\n⚙️  Checking Next.js configuration:');
if (fs.existsSync('next.config.mjs')) {
  const nextConfig = fs.readFileSync('next.config.mjs', 'utf8');
  
  if (nextConfig.includes('serverComponentsExternalPackages')) {
    console.log('  ✅ Mongoose external package configuration');
  } else {
    console.log('  ⚠️  Consider adding mongoose to serverComponentsExternalPackages');
  }
  
  if (nextConfig.includes('images')) {
    console.log('  ✅ Image configuration present');
  } else {
    console.log('  ⚠️  Image configuration missing');
  }
}

// Check for sensitive data
console.log('\n🔒 Checking for sensitive data exposure:');
const sensitivePatterns = [
  /mongodb\+srv:\/\/[^:]+:[^@]+@/gi,
  /sk_live_/gi,
  /pk_live_/gi
];

const filesToCheck = ['README.md', 'package.json'];
let sensitiveDataFound = false;

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    sensitivePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        console.log(`  ❌ Potential sensitive data found in ${file}`);
        sensitiveDataFound = true;
      }
    });
  }
});

if (!sensitiveDataFound) {
  console.log('  ✅ No sensitive data found in public files');
}

// Final assessment
console.log('\n' + '='.repeat(50));
if (allFilesPresent && !sensitiveDataFound) {
  console.log('🎉 DEPLOYMENT READY!');
  console.log('\nNext steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Import repository to Vercel');
  console.log('3. Set environment variables in Vercel dashboard');
  console.log('4. Deploy!');
  console.log('\nFor detailed instructions, see DEPLOYMENT_CHECKLIST.md');
} else {
  console.log('❌ DEPLOYMENT NOT READY');
  console.log('\nPlease fix the issues above before deploying.');
  process.exit(1);
}

console.log('='.repeat(50));