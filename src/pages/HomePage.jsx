import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Download, Upload, Dumbbell, Flame, Snowflake } from 'lucide-react'
import useGameStore from '../store/gameStore'
import useWarmupCooldownStore from '../store/warmupCooldownStore'
import GameCard from '../components/HomePage/GameCard'
import WarmupCooldownList from '../components/WarmupCooldown/WarmupCooldownList'
import CleanupButton from '../components/Common/CleanupButton'
import defaultGames from '../data/defaultGames'

function HomePage() {
  const navigate = useNavigate()
  const { games, importGames, exportGames, addGame, updateGame, removeDuplicates } = useGameStore()
  const { activities: warmupCooldowns } = useWarmupCooldownStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredGames, setFilteredGames] = useState(games)
  const [activeTab, setActiveTab] = useState('stoeispellen') // 'stoeispellen', 'warmups', 'cooldowns'
  

  useEffect(() => {
    // Load default games if no games exist OR if new games need to be added
    const currentVersion = localStorage.getItem('gamesVersion')
    const targetVersion = '4.3' // Increment this when adding new games
    
    if (games.length === 0 && !localStorage.getItem('gamesLoaded')) {
      // First time loading - add all games
      defaultGames.forEach(game => addGame(game))
      localStorage.setItem('gamesLoaded', 'true')
      localStorage.setItem('gamesVersion', targetVersion)
    } else if (currentVersion !== targetVersion) {
      // Version mismatch - replace all games with default games
      importGames(defaultGames)
      localStorage.setItem('gamesVersion', targetVersion)
    }
  }, [games, addGame, importGames, removeDuplicates])

  // Debounce search query to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    // Wait for games to load before filtering
    if (!games || !Array.isArray(games) || games.length === 0) {
      setFilteredGames([])
      return
    }
    
    let result = [...games] // Create a copy to avoid mutations
    
    // Apply search filter if there's a query
    if (debouncedSearchQuery && debouncedSearchQuery.trim().length > 0) {
      const lowercaseQuery = debouncedSearchQuery.toLowerCase().trim()
      result = result.filter(game => {
        try {
          // Search in all text fields with null/undefined safety
          const searchableFields = [
            game?.title || '',
            game?.objective || '',
            game?.leftColumn?.startPosition || '',
            game?.leftColumn?.playerA || '',
            game?.leftColumn?.playerB || '',
            game?.leftColumn?.rules || '',
            game?.rightColumn?.modifications?.S || '',
            game?.rightColumn?.modifications?.T || '',
            game?.rightColumn?.modifications?.R || '',
            game?.rightColumn?.modifications?.O || '',
            game?.rightColumn?.modifications?.O2 || '',
            game?.rightColumn?.modifications?.M || '',
            game?.rightColumn?.tips || ''
          ]
          
          const searchableText = searchableFields
            .filter(field => field && typeof field === 'string')
            .join(' ')
            .toLowerCase()
          
          return searchableText.includes(lowercaseQuery)
        } catch (error) {
          // If there's any error processing this game, exclude it from results
          return false
        }
      })
    }
    
    // Sort by position alphabetically with null safety
    result = result.sort((a, b) => {
      const posA = (a?.leftColumn?.startPosition || '').toLowerCase()
      const posB = (b?.leftColumn?.startPosition || '').toLowerCase()
      return posA.localeCompare(posB)
    })
    
    setFilteredGames(result)
  }, [debouncedSearchQuery, games])

  const handleExport = () => {
    const dataStr = exportGames()
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `stoeispelen-backup-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const games = JSON.parse(e.target.result)
          importGames(games)
          alert('Games succesvol geïmporteerd!')
        } catch (error) {
          alert('Fout bij het importeren van games. Controleer het bestand.')
        }
      }
      reader.readAsText(file)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">Stoeispelen App</h1>
          <p className="text-blue-100">Beheer en organiseer je stoeispellen, warming-ups en eindspellen</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('stoeispellen')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'stoeispellen' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <Dumbbell className="w-5 h-5" />
              Stoeispellen ({games.length})
            </button>
            <button
              onClick={() => setActiveTab('warmups')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'warmups' 
                  ? 'text-orange-600 border-orange-600' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <Flame className="w-5 h-5" />
              Warming-ups ({warmupCooldowns.filter(a => a.type === 'warmup' || a.type === 'both').length})
            </button>
            <button
              onClick={() => setActiveTab('cooldowns')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'cooldowns' 
                  ? 'text-blue-500 border-blue-500' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <Snowflake className="w-5 h-5" />
              Eindspellen ({warmupCooldowns.filter(a => a.type === 'cooldown' || a.type === 'both').length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Show different content based on active tab */}
        {activeTab === 'stoeispellen' ? (
          <>
            {/* Header for Stoeispellen */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Stoeispellen Bibliotheek</h2>
              <p className="text-gray-600">Ecologische task constraint based games voor 1e jaars HAN-ALO studenten</p>
            </div>

            {/* Search and Controls for Stoeispellen */}
            <div className="mb-8 space-y-4">
              <div className="flex gap-4 justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Zoek een stoeispel..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => navigate('/game/new')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Nieuw Spel
                </button>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Exporteer
                </button>
                <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Importeer
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Show cleanup button if there are duplicates */}
            {(() => {
              const titles = games.map(g => g.title.toLowerCase())
              const uniqueTitles = new Set(titles)
              return titles.length !== uniqueTitles.size
            })() && <CleanupButton />}

            {/* Games Grid */}
            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? 'Geen games gevonden met deze zoekopdracht.' : 'Nog geen games toegevoegd. Klik op "Nieuw Spel" om te beginnen.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </>
        ) : activeTab === 'warmups' ? (
          <WarmupCooldownList filterType="warmup" />
        ) : (
          <WarmupCooldownList filterType="cooldown" />
        )}
      </div>
    </div>
  )
}

export default HomePage