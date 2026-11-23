# MathMaster – Basic Arithmetic Quiz Platform

MathMaster is a React + Vite arithmetic quiz app. Its backend is **JSON Server only**: no Express, MongoDB, Mongoose, JWT or separate custom API server is required.

## Requirements
- Node.js 18+

## 1. Start the JSON Server backend
Open a terminal:
```bash
cd backend
npm install
npm start
```
The REST API runs at `http://localhost:3000`.

JSON Server reads and saves data in `backend/db.json`. It contains the starter admin account and 20 sample questions. User registrations and quiz attempts are also saved there.

### Admin login
- Email: `admin@mathmaster.com`
- Password: `Admin@123`

Change this demo password before using the project beyond local practice.

## 2. Start the React frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

If the JSON Server URL changes, set `VITE_API_URL` in `frontend/.env` to the JSON Server base URL, for example `http://localhost:3000` (do not add `/api`).

## Included features
- Register and login; separate user and admin experiences
- Admin question Add, Edit and Delete
- Admin question search, operation filter, difficulty filter and pagination (8 questions per page)
- User quiz by operation and difficulty, random question selection, 5-minute timer and previous/next navigation
- Automatic scoring and saved quiz attempts
- Personal attempt history
- Leaderboard based on saved attempts
- SweetAlert2 feedback and confirmation dialogs
- Pastel yellow / warm cream responsive interface

## Important learning-project security note
This project intentionally uses plain JSON Server REST endpoints to match the requested beginner setup. JSON Server does not provide secure authentication, password hashing, role-based API authorization or protected server-side routes. The frontend role checks and localStorage session are for demonstration only; do not deploy this setup with real user data or real passwords. For a production app, use a secure authentication backend and hashed passwords.
