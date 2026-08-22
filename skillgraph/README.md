# SkillGraph

SkillGraph is a React and Express application for exploring careers, skills, and their relationships in Neo4j.

## Structure

- `client/`: React + Vite frontend
- `server/`: Node + Express API
- `scripts/seed.js`: loads Cypher seed files into Neo4j

## Setup

1. Copy `.env.example` to `.env` and set your Neo4j credentials.
2. Run `npm install` in `client/` and `server/`.
3. Start Neo4j.
4. Run `node scripts/seed.js` from this directory.
5. Run `npm run dev` in `server/` and `client/` separately.

The API exposes `GET /api/health`, `GET /api/careers`, `GET /api/skills`, and `GET /api/graph/:career`.
