# Movie Search & Favorites (MERN Application)

A modern full-stack web application built using the MERN stack (without MongoDB, using file-based storage) that allows users to search for movies using the OMDB API and save their favorites.

## Features & Requirements Met

### Core Requirements
- **Frontend (React)**
  - Clean, intuitive and responsive glassmorphism UI.
  - Search bar with **debounced search** to avoid excessive API calls while typing.
  - Displays a grid of movies returned by the OMDB API.
  - Each movie card displays essential details (Title, Year, Poster) and an interactive Heart Icon to toggle favorites.
- **Backend API (Node.js & Express)**
  - `/api/movies/search`: Endpoint to handle search queries, fetching from OMDB API.
  - `/api/movies/favorites`: GET, POST, and DELETE endpoints to manage favorites.
- **Server-Side Storage**
  - Uses a file-based JSON approach (`backend/src/data/favorites.json`) to persist favorites without requiring a full database layer.
- **Error Handling**
  - Proper try-catch blocks, API error validation, and graceful UI error states.

### Bonus Features Implemented
- **Pagination**: The search interface supports infinite-scroll style pagination via a "Load More" button to handle large numbers of results.
- **State Management**: Implemented the **React Context API** (`FavoritesContext`) to globally manage favorites state across the application, allowing instant UI updates.
- **UI/UX Improvements**: Loading spinners, empty states, glassmorphism design, hover animations, and toast-like interactions.
- **Performance Optimization**: Use of `useCallback` to prevent unnecessary re-renders, and debounced input to limit network payload.

## Project Structure

This is a monorepo containing both frontend and backend:
- `frontend/` - React (Vite) + Tailwind CSS + TypeScript
- `backend/` - Node.js + Express + TypeScript

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- An OMDB API Key (Get one at [http://www.omdbapi.com/](http://www.omdbapi.com/))

## Setup & Running the Application

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and add your OMDB API key:
   ```env
   PORT=5000
   OMDB_API_KEY=your_omdb_api_key_here
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory to point to the backend:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`.

## Implementation Choices

- **Tailwind CSS**: Chosen for rapidly building a clean, modern, responsive UI without writing custom CSS classes.
- **Vite**: Used for scaffolding the React application because it's significantly faster than Create React App for development and building.
- **File-based Storage (`fs`)**: Chose `fs.readFileSync` and `fs.writeFileSync` on the backend to fulfill the "server-side storage without MongoDB" requirement. It provides simple persistence simulating a DB.
- **Context API vs Redux**: Since the global state only needed to manage `favorites`, the natively built Context API was chosen to avoid the overhead and boilerplate of Redux while perfectly achieving the goal.

## Deployment Notes

To deploy this application to a cloud provider like Heroku or Render:
1. Ensure both `frontend` and `backend` build steps are configured.
2. The `backend/src/data` folder must be writable if deploying the file-based storage. (Note: standard Heroku dynos have an ephemeral filesystem, so data will reset on restart. Consider a permanent cloud volume or switching to MongoDB for real-world production).
3. Set all environment variables (`OMDB_API_KEY`, `VITE_API_URL`) in the cloud provider's dashboard.