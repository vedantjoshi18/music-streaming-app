# Musico - Music Streaming Application

Musico is a feature-rich, modern music streaming application built with **Angular 17**, **Angular Material**, and **Tailwind CSS**. It provides a seamless user experience for discovering, playing, and managing music.

## 🚀 Features

-   **Music Playback:** Full-featured audio player with play/pause, skip, seek, and volume control.
-   **Song Library:** Browse an extensive collection of songs, artists, and albums.
-   **Queue Management:** Real-time song queue management (add, remove, reorder).
-   **Playlists:** Create, update, and delete custom playlists (stored locally).
-   **Favorites:** "Liked Songs" feature to keep track of your favorite tracks.
-   **Authentication:** Mock login and signup system with persistent user sessions.
-   **Notifications:** Integrated notification system for app updates and activities.
-   **Responsive Design:** Fully responsive UI built with Tailwind CSS.
-   **Advanced UI:** Smooth animations and custom directives for an interactive experience.

## 🛠️ Tech Stack

-   **Frontend:** [Angular 17](https://angular.io/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Angular Material](https://material.angular.io/)
-   **State Management:** [RxJS](https://rxjs.dev/) (BehaviorSubjects & Observables)
-   **Icons:** [Material Symbols](https://fonts.google.com/icons)
-   **Data Persistence:** Browser `localStorage` (Mock Backend)

## 📂 Project Structure

```text
src/app/
├── components/          # UI Components
│   ├── feedback/        # User feedback form
│   ├── liked-songs/     # Favorite songs listing
│   ├── login/           # Auth views (Login/Signup)
│   ├── navbar/          # Top navigation and search
│   ├── playlist-manager/# CRUD for playlists
│   ├── song-list/       # Library and search results
│   └── song-player/     # Global playback controls
├── services/            # Core Business Logic
│   ├── audio.service.ts # Audio element wrapper & state
│   ├── music.service.ts # Data fetching (db.json & localStorage)
│   ├── queue.service.ts # Queue & History management
│   └── user.service.ts  # Auth & Notification logic
├── models/              # TypeScript Interfaces
├── shared/              # Reusable modules, pipes, and directives
│   ├── material.module.ts
│   ├── directives/      # Custom UI behaviors
│   └── pipes/           # Data transformation (Duration, Filter)
└── assets/
    └── db.json          # Mock database of songs and artists
```

## ⚙️ Core Architecture

### 1. Audio Management (`AudioService`)
The heart of the application. It wraps the native HTML5 `Audio` object and exposes a `StreamState` observable. This ensures all components (Player, List, etc.) are always in sync with the current playback status.

### 2. Data Flow (`MusicService`)
Initial music data is fetched from `src/assets/db.json`. User-generated data like **Playlists** and **Liked Songs** are managed via `localStorage`, allowing the app to persist state without a real backend.

### 3. Queue Logic (`QueueService`)
Handles the complex logic of "Next up" and "Previous" songs, including shuffle and repeat modes. It tracks the playback history to allow users to navigate back through their session.

### 4. User System (`UserService`)
Manages the current user profile, authentication state, and notifications. It uses DiceBear API for dynamic avatar generation.

## 🚦 Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18.13.0 or higher)
-   [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation
1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd music-streaming-app
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
Start the development server:
```bash
npm start
```
Open your browser and navigate to `http://localhost:4200/`.

### Building for Production
To build the project for production:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing
Run unit tests with Karma:
```bash
npm test
```

---
Built with ❤️ using Angular.
