import { Game } from '@/types/game'

const STORAGE_KEY = 'stoeispelen_games'
const EXPORT_VERSION = '1.0'

export interface ExportData {
  version: string
  exportDate: string
  games: Game[]
}

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
  },

  exportGames: (): ExportData => {
    const games = gameStorage.getAllGames()
    return {
      version: EXPORT_VERSION,
      exportDate: new Date().toISOString(),
      games: games
    }
  },

  downloadExport: (): void => {
    const exportData = gameStorage.exportGames()
    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const date = new Date().toISOString().split('T')[0]
    const filename = `stoeispelen-library-${date}.json`
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  importGames: (data: ExportData, mode: 'merge' | 'replace' = 'replace'): void => {
    // Validate import data
    if (!data.version || !data.games || !Array.isArray(data.games)) {
      throw new Error('Ongeldig import bestand')
    }

    // Validate each game has required fields
    for (const game of data.games) {
      if (!game.id || !game.name || !game.createdAt || !game.updatedAt) {
        throw new Error('Import bestand bevat ongeldige game data')
      }
    }

    if (mode === 'replace') {
      // Replace all games
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.games))
    } else {
      // Merge with existing games
      const existingGames = gameStorage.getAllGames()
      const existingIds = new Set(existingGames.map(g => g.id))
      
      // Add only new games (by ID)
      const newGames = data.games.filter(game => !existingIds.has(game.id))
      const mergedGames = [...existingGames, ...newGames]
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedGames))
    }
  }
}