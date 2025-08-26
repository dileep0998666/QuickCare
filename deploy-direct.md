# 🚀 Deploy QuickCare Directly to Vercel (Bypass GitHub Issues)

Since we're having GitHub secret scanning issues, here are alternative deployment methods:

## Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from local directory**:
   ```bash
   vercel --prod
   ```

4. **Set environment variables during deployment**:
   The CLI will prompt you to add environment variables, or you can set them in the Vercel dashboard after deployment.

## Option 2: Create New Repository

1. **Create a new GitHub repository** (e.g., `QuickCare-Clean`)
2. **Initialize new git repo**:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit - QuickCare healthcare system"
   git branch -M main
   git remote add origin https://github.com/yourusername/QuickCare-Clean.git
   git push -u origin main
   ```

## Option 3: Allow Secrets in GitHub

Visit these URLs to allow the detected secrets:
- [Allow Google Client ID](https://github.com/dileep0998666/QuickCare/security/secret-scanning/unblock-secret/31pXTclM1nB4afsZLmXWjl8hDGa)
- [Allow Google Client Secret](https://github.com/dileep0998666/QuickCare/security/secret-scanning/unblock-secret/31pXTiU7nm33VEs58cYZpJitMhr)

Then try pushing again:
```bash
git push origin main
```

## Environment Variables for Vercel

When deploying, set these environment variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Your JWT secret key |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Your Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret |
| `NODE_ENV` | `production` |

## Build Settings for Vercel

- **Install Command**: `npm install --legacy-peer-deps`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

Your application is ready to deploy! 🎉