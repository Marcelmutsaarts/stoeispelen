import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set, get) => ({
      games: [],
      
      addGame: (game) => set((state) => ({
        games: [...state.games, { ...game, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
      })),
      
      updateGame: (id, updates) => set((state) => ({
        games: state.games.map(game => 
          game.id === id 
            ? { ...game, ...updates, updatedAt: new Date().toISOString() }
            : game
        )
      })),
      
      deleteGame: (id) => set((state) => ({
        games: state.games.filter(game => game.id !== id)
      })),
      
      getGame: (id) => {
        return get().games.find(game => game.id === id)
      },
      
      searchGames: (query) => {
        const lowercaseQuery = query.toLowerCase()
        return get().games.filter(game => {
          // Search in all text fields
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
      
      importGames: (importedGames) => set(() => ({
        games: importedGames
      })),
      
      exportGames: () => {
        return JSON.stringify(get().games, null, 2)
      },
      
      removeDuplicates: () => set((state) => {
        const uniqueGames = []
        const seenTitles = new Set()
        
        state.games.forEach(game => {
          if (!seenTitles.has(game.title.toLowerCase())) {
            seenTitles.add(game.title.toLowerCase())
            uniqueGames.push(game)
          }
        })
        
        return { games: uniqueGames }
      })
    }),
    {
      name: 'stoeispelen-storage',
    }
  )
)

export default useGameStore