import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Download, Upload, Dumbbell, Flame, Snowflake, RefreshCw } from 'lucide-react'
import useGameStore from '../store/gameStore'
import useWarmupCooldownStore from '../store/warmupCooldownStore'
import GameCard from '../components/HomePage/GameCard'
import WarmupCooldownList from '../components/WarmupCooldown/WarmupCooldownList'
import CleanupButton from '../components/Common/CleanupButton'
import defaultGames from '../data/defaultGames'
import defaultWarmupCooldownActivities from '../data/defaultWarmupCooldown'

function HomePage() {
  const navigate = useNavigate()
  const { games, initializeGames, importGames, exportGames, removeDuplicates, resetToDefaults } = useGameStore()
  const { activities: warmupCooldowns, initializeActivities } = useWarmupCooldownStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filteredGames, setFilteredGames] = useState(games)
  const [activeTab, setActiveTab] = useState('stoeispellen')
  

  // Initialize games and warmup/cooldown activities on mount
  useEffect(() => {
    console.log('HomePage mount - initializing games and activities')
    initializeGames(defaultGames)
    initializeActivities(defaultWarmupCooldownActivities)
  }, []) // Empty dependency array - only run once

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter games based on search
  useEffect(() => {
    if (!games || !Array.isArray(games) || games.length === 0) {
      setFilteredGames([])
      return
    }
    
    let result = [...games]
    
    if (debouncedSearchQuery && debouncedSearchQuery.trim().length > 0) {
      const lowercaseQuery = debouncedSearchQuery.toLowerCase().trim()
      result = result.filter(game => {
        try {
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
          return false
        }
      })
    }
    
    // Sort by position
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
          const importedGames = JSON.parse(e.target.result)
          importGames(importedGames)
          alert('Games succesvol geïmporteerd!')
        } catch (error) {
          alert('Fout bij het importeren van games. Controleer het bestand.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleResetToDefaults = () => {
    if (window.confirm('Weet je zeker dat je alle games wilt resetten naar de standaard games? Dit verwijdert alle toegevoegde games en wijzigingen!')) {
      resetToDefaults(defaultGames)
      alert('Games gereset naar standaard!')
    }
  }

  // Check for duplicates
  const hasDuplicates = () => {
    const titles = games.map(g => g.title.toLowerCase())
    const uniqueTitles = new Set(titles)
    return titles.length !== uniqueTitles.size
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
        {activeTab === 'stoeispellen' ? (
          <>
            {/* Header for Stoeispellen */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Stoeispellen Bibliotheek</h2>
              <p className="text-gray-600">Ecologische task constraint based games voor 1e jaars HAN-ALO studenten</p>
            </div>

            {/* Search and Controls */}
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
                <button
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 bg-orange-200 text-orange-700 rounded-lg hover:bg-orange-300 transition-colors flex items-center gap-2"
                  title="Reset alle games naar standaard"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Show cleanup button if there are duplicates */}
            {hasDuplicates() && <CleanupButton />}

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