# 🚀 QuickCare - Vercel Deployment Guide

## ✅ Issues Fixed
- Removed `vaul` package causing React 19 compatibility issues
- Downgraded React to 18.3.1 for better ecosystem compatibility
- Added `.npmrc` for handling peer dependency conflicts
- Updated build configuration for Vercel

## 🚀 Deploy to Vercel

### Step 1: Go to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"

### Step 2: Import Repository
1. Select "Import Git Repository"
2. Choose your QuickCare repository
3. Click "Import"

### Step 3: Configure Build Settings
**Important**: In the build configuration:
- **Install Command**: `npm install --legacy-peer-deps`
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)

### Step 4: Add Environment Variables
In the Vercel dashboard, go to Settings → Environment Variables and add:

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | Your MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ✅ |
| `NODE_ENV` | Set to `production` | ✅ |

### Step 5: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be live at `https://your-project-name.vercel.app`

## 🔧 If Build Fails

### Option 1: Manual Build Command
In Vercel Settings → General → Build & Output Settings:
- **Install Command**: `npm install --legacy-peer-deps --force`

### Option 2: Check Environment Variables
Ensure all required environment variables are set correctly.

### Option 3: Check Build Logs
Review the build logs in Vercel dashboard for specific error messages.

## ✅ Post-Deployment Checklist
- [ ] Application loads without errors
- [ ] Database connection works
- [ ] User authentication works
- [ ] Google OAuth works
- [ ] Hospital listings display
- [ ] Booking system functions

## 🎉 Success!
Your QuickCare application is now live and ready for users!

Remember to update your Google OAuth settings with the new Vercel domain.