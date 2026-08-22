# NextPath Deployment - Environment Variables Quick Reference

## For Render Backend Deployment

Copy-paste each line into Render Environment Variables:

```
PORT=10000
COGNODB_URI=bolt+s://YOUR_COGNODB_URL
COGNODB_USERNAME=YOUR_USERNAME
COGNODB_PASSWORD=YOUR_PASSWORD
GEMINI_API_KEY=YOUR_GEMINI_KEY
YOUTUBE_API_KEY=YOUR_YOUTUBE_KEY
FRONTEND_URL=https://nextpath.vercel.app
```

## For Vercel Frontend Deployment

Add this single environment variable in Vercel:

```
VITE_API_URL=https://nextpath-api.onrender.com/api
```

(Replace `nextpath-api` with your actual Render service name)

## How to Get Each Variable

### COGNODB_URI, COGNODB_USERNAME, COGNODB_PASSWORD
- Your existing CognoDB connection details
- Found in your CognoDB dashboard
- Example URI format: `bolt+s://db-abc123.bravo.databases.cognodb.com`

### GEMINI_API_KEY
- Go to https://aistudio.google.com/app/apikeys
- Create or copy your API key
- Ensure you have the Generative AI API enabled

### YOUTUBE_API_KEY
- Go to https://console.cloud.google.com
- Create a new API key or use existing one
- Enable YouTube Data API v3
- Can use same project as Gemini

### FRONTEND_URL
- Will be your Vercel deployment URL
- Example: `https://nextpath.vercel.app`
- Or your custom domain if configured

### VITE_API_URL
- Will be your Render backend URL
- Example: `https://nextpath-api.onrender.com/api`
- Use exact format with `/api` at the end

## Deployment Order

1. Deploy backend to Render FIRST (without FRONTEND_URL if needed)
2. Get Render URL
3. Deploy frontend to Vercel with VITE_API_URL
4. Get Vercel URL
5. Update Render's FRONTEND_URL env var
6. Both services will be ready

## Local Development

Create `.env` files in each directory:

### server/.env
```
PORT=5000
COGNODB_URI=your_uri
COGNODB_USERNAME=your_username
COGNODB_PASSWORD=your_password
GEMINI_API_KEY=your_key
YOUTUBE_API_KEY=your_key
FRONTEND_URL=http://localhost:5173
```

### client/.env.local
```
VITE_API_URL=http://localhost:5000/api
```

Then run:
- Backend: `cd server && npm run dev`
- Frontend: `cd client && npm run dev`
