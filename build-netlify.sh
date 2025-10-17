#!/bin/bash

echo "🔨 Building React App for Netlify..."
echo "📍 Current directory: $(pwd)"
echo "📦 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"

# Install dependencies
echo "📥 Installing dependencies..."
npm ci

# Build the React app
echo "🏗️  Building React app..."
npm run build

# Verify build directory exists
if [ -d "build" ]; then
    echo "✅ Build successful! Output directory 'build' exists."
    echo "📁 Build contents:"
    ls -la build/
else
    echo "❌ Build failed! Directory 'build' does not exist."
    exit 1
fi

echo "🎉 Build completed successfully!"