import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Helper function to generate unique IDs
const generateUniqueId = () => {
  return `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

const useGameStore = create(
  persist(
    (set, get) => ({
      games: [],
      isInitialized: false,
      
      // Initialize with default games (only called once)
      initializeGames: (defaultGames) => {
        const state = get()
        
        // Only initialize once
        if (state.isInitialized) {
          console.log('Store already initialized, skipping')
          return
        }
        
        // If we have no games, add the defaults
        if (state.games.length === 0) {
          console.log('Initializing with default games')
          const gamesWithMeta = defaultGames.map(game => ({
            ...game,
            id: game.id || generateUniqueId(),
            isDefault: true,
            createdAt: game.createdAt || new Date().toISOString(),
            updatedAt: game.updatedAt || new Date().toISOString()
          }))
          
          set({ 
            games: gamesWithMeta,
            isInitialized: true 
          })
        } else {
          // We have existing games, just mark as initialized
          console.log('Games already exist, marking as initialized')
          set({ isInitialized: true })
        }
      },
      
      // Add a new game
      addGame: (game) => {
        const newGame = { 
          ...game, 
          id: generateUniqueId(), 
          isUserCreated: true,
          isDefault: false,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString() 
        }
        
        console.log('Adding new game:', newGame)
        
        set((state) => {
          const updatedGames = [...state.games, newGame]
          console.log('Games after adding:', updatedGames.length)
          return { games: updatedGames }
        })
        
        // Return the new game for confirmation
        return newGame
      },
      
      // Update existing game
      updateGame: (id, updates) => {
        console.log('Updating game:', id, updates)
        
        set((state) => ({
          games: state.games.map(game => 
            game.id === id 
              ? { ...game, ...updates, updatedAt: new Date().toISOString() }
              : game
          )
        }))
      },
      
      // Delete a game
      deleteGame: (id) => {
        console.log('Deleting game:', id)
        
        set((state) => ({
          games: state.games.filter(game => game.id !== id)
        }))
      },
      
      // Get a specific game
      getGame: (id) => {
        return get().games.find(game => game.id === id)
      },
      
      // Search games
      searchGames: (query) => {
        const lowercaseQuery = query.toLowerCase()
        return get().games.filter(game => {
          const searchableText = [
            game.title,
            game.objective,
            game.leftColumn?.startPosition,
            game.leftColumn?.playerA,
            game.leftColumn?.playerB,
            game.leftColumn?.rules,
            game.rightColumn?.modifications?.S,
            game.rightColumn?.modifications?.T,
            game.rightColumn?.modifications?.R,
            game.rightColumn?.modifications?.O,
            game.rightColumn?.modifications?.O2,
            game.rightColumn?.modifications?.M,
            game.rightColumn?.tips
          ].filter(Boolean).join(' ').toLowerCase()
          
          return searchableText.includes(lowercaseQuery)
        })
      },
      
      // Import games (for backup restore)
      importGames: (importedGames) => {
        console.log('Importing games:', importedGames.length)
        
        const gamesWithIds = importedGames.map(game => ({
          ...game,
          id: game.id || generateUniqueId(),
          createdAt: game.createdAt || new Date().toISOString(),
          updatedAt: game.updatedAt || new Date().toISOString()
        }))
        
        set({ 
          games: gamesWithIds,
          isInitialized: true 
        })
      },
      
      // Export games (for backup)
      exportGames: () => {
        return JSON.stringify(get().games, null, 2)
      },
      
      // Remove duplicates based on title
      removeDuplicates: () => {
        set((state) => {
          const uniqueGames = []
          const seenTitles = new Set()
          
          state.games.forEach(game => {
            const titleKey = game.title.toLowerCase()
            if (!seenTitles.has(titleKey)) {
              seenTitles.add(titleKey)
              uniqueGames.push(game)
            }
          })
          
          console.log(`Removed ${state.games.length - uniqueGames.length} duplicates`)
          return { games: uniqueGames }
        })
      },
      
      // Reset to default games (nuclear option)
      resetToDefaults: (defaultGames) => {
        console.log('Resetting to default games')
        
        const gamesWithMeta = defaultGames.map(game => ({
          ...game,
          id: game.id || generateUniqueId(),
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }))
        
        set({ 
          games: gamesWithMeta,
          isInitialized: true 
        })
      }
    }),
    {
      name: 'stoeispelen-storage',
      version: 2, // Bump version to force migration
      migrate: (persistedState, version) => {
        // Migration from old version
        if (version === 1) {
          // Clear old data structure
          return { games: [], isInitialized: false }
        }
        return persistedState
      }
    }
  )
)

export default useGameStore