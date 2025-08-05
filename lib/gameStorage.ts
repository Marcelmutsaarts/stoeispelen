import { Game } from '@/types/game'

const STORAGE_KEY = 'stoeispelen_games'

export const gameStorage = {
  getAllGames: (): Game[] => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  },

  getGame: (id: string): Game | null => {
    const games = gameStorage.getAllGames()
    return games.find(game => game.id === id) || null
  },

  saveGame: (game: Game): void => {
    const games = gameStorage.getAllGames()
    const existingIndex = games.findIndex(g => g.id === game.id)
    
    if (existingIndex >= 0) {
      games[existingIndex] = { ...game, updatedAt: new Date().toISOString() }
    } else {
      games.push(game)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
  },

  deleteGame: (id: string): void => {
    const games = gameStorage.getAllGames()
    const filtered = games.filter(game => game.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  },

  createNewGame: (): Game => {
    return {
      id: crypto.randomUUID(),
      name: 'Nieuwe Game',
      learningTask: {},
      stroom: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  searchGames: (query: string): Game[] => {
    const games = gameStorage.getAllGames()
    const lowerQuery = query.toLowerCase()
    
    return games.filter(game => 
      game.name.toLowerCase().includes(lowerQuery) ||
      game.position?.toLowerCase().includes(lowerQuery) ||
      game.learningTask.focus?.toLowerCase().includes(lowerQuery) ||
      game.stroom.opdracht?.toLowerCase().includes(lowerQuery)
    )
  }
}