# Vercel Deployment Guide for SkillGraph

## Architecture Overview

- **Frontend**: React + Vite (deployed on Vercel)
- **Backend**: Express.js API (deployed on Render at `https://nextpath-wmla.onrender.com`)
- **Database**: CogoDB (cloud-hosted Neo4j)

## Frontend Deployment (Vercel)

### Prerequisites
1. Vercel account
2. GitHub repository connected to Vercel

### Environment Variables
Set these in Vercel project settings → Environment Variables:

```env
VITE_API_URL=https://nextpath-wmla.onrender.com/api
```

### Deployment Steps

1. **Connect Repository**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Select the root directory as the project root

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `VITE_API_URL=https://nextpath-wmla.onrender.com/api`

4. **Deploy**
   - Vercel will automatically deploy on git push to main branch

## Backend Deployment (Render)

Already deployed at: `https://nextpath-wmla.onrender.com`

### Environment Variables on Render
Ensure these are set in your Render service:

```env
COGNODB_URI=your-cognodb-uri
COGNODB_USERNAME=your-username
COGNODB_PASSWORD=your-password
PORT=5000
YOUTUBE_API_KEY=your-youtube-api-key
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=http://localhost:5173,http://localhost:5051,https://your-vercel-app.vercel.app
```

## CORS Configuration

The backend's CORS settings in `server/src/server.js` allow requests from:
- Local development: `http://localhost:5173`, `http://localhost:5051`
- Production: Your Vercel domain (set via `FRONTEND_URL`)

Update `FRONTEND_URL` on Render when you know your Vercel domain.

## Vercel Configuration

The `vercel.json` file controls:
- Build command and install command
- Output directory (client/dist)
- Environment variables mapping
- Rewrites for SPA (Single Page Application) routing

## Local Development

### Start Development Server
```bash
npm run dev
```

### Start Backend Server
```bash
npm run server:dev
```

### Build for Production
```bash
npm run build
```

## Verification Checklist

- [ ] Client `.env` has `VITE_API_URL=https://nextpath-wmla.onrender.com/api`
- [ ] Server backend has `FRONTEND_URL` updated with your Vercel domain
- [ ] `vercel.json` is in the project root
- [ ] `.env.example` files are tracked in git (not actual `.env` files)
- [ ] CORS is properly configured on Render backend

## Troubleshooting

### API calls failing
- Check if `VITE_API_URL` is correctly set in Vercel env vars
- Verify Render backend is running
- Check browser console for CORS errors

### Build failing on Vercel
- Check build logs in Vercel dashboard
- Ensure `client/dist` directory is being created
- Verify all dependencies are in `client/package.json`

### CORS errors
- Update `FRONTEND_URL` on Render with your Vercel domain
- Ensure Render service is restarted after env var changes
