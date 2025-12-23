# MERN Portfolio Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) portfolio application generated for you.

## Project Structure

*   `client/`: React Frontend (Vite)
*   `server/`: Node.js/Express Backend

## How to Run

### Prerequisite
Make sure you have MongoDB installed and running locally, or update `server/.env` (or `server/index.js`) with your MongoDB connection string.

### 1. Start the Backend Server
Open a terminal:
```bash
cd server
npm start
```
The server will run on `http://localhost:5000`.

### 2. Start the Frontend Application
Open a **new** terminal:
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Customization

### Styling
All styles are located in a single file: `client/src/index.css`.
You can easily change the look of the website by editing the variables at the top of this file:

```css
:root {
  --primary-color: #007bff; /* Change this to your preferred color */
  --bg-color: #ffffff;
  /* ... etc */
}
```

### Content
*   **Pages**: Edit text in `client/src/pages/`.
*   **Certificates**: Once connected to the database, certificates will load dynamically. During development, you can see mock data in `client/src/pages/Certificates.jsx`.
*   **Contact Form**: Submissions are sent to the backend and stored in the database.
