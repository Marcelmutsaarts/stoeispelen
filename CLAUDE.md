# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm install` - Install all dependencies (run first after cloning)
- `npm run dev` - Start the development server with hot reload (Vite)
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Architecture Overview

This is a React-based educational application for managing and organizing "stoeispelen" (physical education games) for HAN-ALO students. The application uses a component-based architecture with state management through Zustand.

### Core Technologies
- **React 19** with React Router for navigation
- **Vite** as the build tool and dev server
- **Tailwind CSS** for styling
- **Zustand** for state management with persistence
- **Lucide React** for icons

### Application Structure

#### Pages (src/pages/)
- **HomePage**: Main dashboard with tabs for Stoeispelen, Warming-ups, and Cooldowns. Handles search, import/export functionality
- **GameDetailPage**: Detail view and editor for individual games with STROOM methodology sections
- **WarmupCooldownDetailPage**: Detail view and editor for warmup/cooldown activities

#### State Management (src/store/)
- **gameStore.js**: Manages stoeispelen data with CRUD operations, search, and persistence via localStorage
- **warmupCooldownStore.js**: Manages warmup and cooldown activities with similar functionality

#### Component Organization (src/components/)
- **Common/**: Reusable components (CleanupButton, EditableField)
- **GameDetail/**: Game-specific components (STROOMSection, TipsSection, YouTubeEmbed, ImageUpload)
- **HomePage/**: Homepage components (GameCard)
- **WarmupCooldown/**: Warmup/cooldown components (WarmupCooldownCard, WarmupCooldownList)

### Key Features

1. **STROOM Methodology**: Games are structured using the STROOM framework with modifications for:
   - S (Speelveld/Playing field)
   - T (Tijd/Time)
   - R (Regels/Rules)
   - O (Organisatie/Organization)
   - O2 (Onderwijs/Education)
   - M (Materiaal/Materials)

2. **Data Persistence**: Uses Zustand with localStorage persistence for offline functionality
   - Automatic migration system for version updates
   - Separation between default games and user-created games
   - Unique ID generation for all games

3. **Search & Filter**: Real-time search across all game fields with debouncing for performance

4. **Import/Export**: JSON-based backup and restore functionality

5. **Image Management**: Support for game images stored in public/images/

6. **Reset Functionality**: Option to reset all games back to defaults

### Data Models

#### Game Object
```javascript
{
  id: string,                // Unique identifier (e.g., "default-game-001" or "game-1234567890-abc")
  title: string,
  objective: string,
  imageUrl: string,
  isDefault: boolean,        // True for default games
  isUserCreated: boolean,    // True for user-created games
  leftColumn: {
    startPosition: string,
    playerA: string,
    playerB: string,
    rules: string
  },
  rightColumn: {
    image: string,           // Image path
    modifications: {
      S: string,  // Speelveld
      T: string,  // Tijd
      R: string,  // Regels
      O: string,  // Organisatie
      O2: string, // Onderwijs
      M: string   // Materiaal
    },
    tips: string,
    youtubeUrl: string
  },
  createdAt: string,
  updatedAt: string
}
```

#### Activity Object (Warmup/Cooldown)
```javascript
{
  id: string,
  title: string,
  type: 'warmup' | 'cooldown' | 'both',
  description: string,
  duration: string,
  tags: string[],
  createdAt: string,
  updatedAt: string
}
```

### Routing Structure
- `/` - Homepage with tabs
- `/game/:id` - View/edit existing game
- `/game/new` - Create new game
- `/warmup-cooldown/:id` - View/edit existing warmup/cooldown
- `/warmup-cooldown/new` - Create new warmup/cooldown

### Important Implementation Notes

1. **Game Store Initialization**: The store uses an `isInitialized` flag to ensure default games are only loaded once
2. **ID Generation**: New games get unique IDs with timestamp and random string to prevent conflicts
3. **Version Migration**: The store includes a migration system (version 2) to handle data structure updates
4. **Default Games**: 21 default games with IDs from "default-game-001" to "default-game-021"
5. **Reset Function**: Users can reset to default games using the resetToDefaults function