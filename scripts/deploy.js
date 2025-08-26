#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment preparation...');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'next.config.mjs',
  'tsconfig.json',
  '.env.example'
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
});

console.log('✅ All required files present');

// Check environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn('⚠️  Missing environment variables:', missingEnvVars.join(', '));
  console.log('Make sure to set these in your Vercel dashboard');
}

console.log('✅ Deployment preparation complete!');
console.log('📝 Next steps:');
console.log('1. Push your code to GitHub');
console.log('2. Connect your repository to Vercel');
console.log('3. Set environment variables in Vercel dashboard');
console.log('4. Deploy!');