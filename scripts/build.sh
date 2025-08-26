#!/bin/bash

echo "🚀 Starting QuickCare build process..."

# Clean install with legacy peer deps
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Run the build
echo "🔨 Building application..."
npm run build

echo "✅ Build completed successfully!"