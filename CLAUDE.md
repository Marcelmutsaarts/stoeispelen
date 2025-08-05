# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Stoeispelen (Roughhousing Games) Library** application built for HAN-ALO students. The app was migrated from Next.js to Vite + React Router to solve persistent Jest worker thread errors. It provides an ecological task constraint-based games library with integrated AI chatbot support using Google's Gemini 2.5 Flash.

## Development Commands

```bash
# Start development server
npm run dev                 # Runs on http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

### Framework Migration Context
- **Originally**: Next.js 15.3.3 template with Jest-based testing
- **Current**: Vite + React Router setup due to persistent Jest worker thread errors
- **Key Change**: Removed all Next.js dependencies and rewrote routing using React Router

### Core Structure
- **Frontend**: React 18.3.1 + TypeScript + Tailwind CSS
- **Routing**: React Router DOM 6.28.0 (client-side routing)
- **Styling**: Custom purple theme with Poppins font, CSS variables in `src/globals.css`
- **Storage**: localStorage for game persistence (no backend database)
- **AI Integration**: Google Gemini 2.5 Flash via `@google/generative-ai`

### Data Architecture
Games are stored in localStorage with this structure:
```typescript
interface Game {
  id: string                    // crypto.randomUUID()
  name: string                  // User-defined game name
  youtubeUrl?: string          // Optional YouTube video
  position?: string            // Starting position description
  learningTask: {              // Educational objectives
    focus?: string             // Main learning focus/goals
    rules?: string            // Game rules
  }
  stroom: {                   // STROOM acronym fields
    spelersaantal?: string    // Number of players (S)
    tijd?: string            // Time duration (T)  
    regels?: string          // Rules (R)
    opdracht?: string        // Assignment (O)
    organisatie?: string     // Organization (O)
    materialen?: string      // Materials (M)
  }
  instructions?: string       // Additional instructions
  createdAt: string          // ISO timestamp
  updatedAt: string          // ISO timestamp
}
```

### Routing Structure
- `/` - HomePage: Game library with search and grid view
- `/game/:id` - GameDetailPage: Individual game editor with inline editing

### Key Components

#### Game Management (`src/lib/gameStorage.ts`)
- Manages localStorage CRUD operations
- Handles game filtering (only shows games with name + focus filled)
- Creates default example games on first load
- **Important**: Games named "Nieuwe Game" without focus are hidden from homepage

#### Inline Editing System (`GameDetailPage.tsx`)
- `EditableField` component for all game fields
- Real-time saving to localStorage
- **Critical**: All text inputs use `direction: ltr, textAlign: left` to prevent RTL cursor issues
- **Note**: Removed multiline textareas due to cursor positioning problems

#### AI Chatbot (`src/components/GameChatbot.tsx`)
- Context-aware chatbot with access to current game data
- Uses Gemini 2.5 Flash model (`gemini-2.5-flash`)
- Persistent chat messages during session
- System prompt includes full game context for relevant responses

### Styling System
Custom purple theme implemented via CSS variables:
```css
:root {
  --primary-purple: #9C6BFF;
  --primary-purple-dark: #6B4BFF; 
  --primary-purple-light: #B34BFF;
  --lavender-bg: #F6F1FF;
  --card-border: #E4D8FF;
  --gradient: linear-gradient(135deg, #6B4BFF 0%, #B34BFF 100%);
}
```

Custom component classes:
- `.btn-primary` - Gradient buttons with hover effects
- `.card-purple` - Styled cards with borders and shadows
- `.bg-lavender` - Light purple background

## Environment Setup

Required environment variable in `.env.local`:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Known Issues & Solutions

### Text Input Problems
- **Issue**: Cursor stays left, text appears backwards in textareas
- **Solution**: Use `direction: ltr, textAlign: left` styles, avoid multiline textareas
- **All text inputs** must have these styles applied

### Game Visibility Logic
- Games only appear on homepage if they have:
  1. Non-empty `name` (not "Nieuwe Game")
  2. Non-empty `learningTask.focus`
- This prevents incomplete games from cluttering the interface

### localStorage Initialization
- Two default example games are created on first load
- Clean initialization logic in `HomePage.tsx` handles edge cases
- Storage events and visibility change listeners ensure data freshness

## Key Technical Decisions

1. **Migration to Vite**: Solved persistent Next.js Jest worker thread errors that blocked navigation
2. **localStorage over Database**: Simplifies deployment, suitable for educational prototype
3. **Inline Editing**: All fields editable in-place for better UX
4. **Context-Aware AI**: Chatbot has full access to current game data for relevant responses
5. **Purple Theme**: Custom design system replacing default Tailwind colors

## Development Patterns

### Adding New Game Fields
1. Update `Game` interface in `src/types/game.ts`
2. Add field to `EditableField` usage in `GameDetailPage.tsx`
3. Include in chatbot system prompt if relevant
4. Update filtering logic in `HomePage.tsx` if needed

### Component Structure
- Page components in `src/pages/`
- Reusable components in `src/components/`
- Utilities and services in `src/lib/`
- Types in `src/types/`

### Styling Approach
- Use CSS variables for theme colors
- Custom component classes for reusable patterns  
- Tailwind for layout and utilities
- All text inputs need RTL prevention styles