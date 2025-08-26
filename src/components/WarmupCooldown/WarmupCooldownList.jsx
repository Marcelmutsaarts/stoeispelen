import { useState, useEffect } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useWarmupCooldownStore from '../../store/warmupCooldownStore'
import WarmupCooldownCard from './WarmupCooldownCard'

function WarmupCooldownList({ filterType = null }) {
  const navigate = useNavigate()
  const { activities, searchActivities, getActivitiesByType } = useWarmupCooldownStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredActivities, setFilteredActivities] = useState([])
  
  // Use filterType prop directly instead of internal state
  const effectiveTypeFilter = filterType || 'all'

  useEffect(() => {
    let result = activities
    
    // Apply search if query exists
    if (searchQuery) {
      result = searchActivities(searchQuery, effectiveTypeFilter === 'all' ? null : effectiveTypeFilter)
    } else if (effectiveTypeFilter !== 'all') {
      // Apply type filter
      result = getActivitiesByType(effectiveTypeFilter)
    }
    
    // Sort by creation date (newest first)
    result = [...result].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    
    setFilteredActivities(result)
  }, [searchQuery, effectiveTypeFilter, activities, searchActivities, getActivitiesByType])

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Zoek warming-ups of eindspellen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={effectiveTypeFilter}
              onChange={(e) => {
                // Since we're using the parent's filterType, we can't change it here
                // This dropdown is now read-only when filterType is provided
                if (!filterType) {
                  // Only allow changes if no filterType prop is provided
                }
              }}
              disabled={!!filterType}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="all">Alle typen</option>
              <option value="warmup">Warming-ups</option>
              <option value="cooldown">Eindspellen</option>
              <option value="both">Beide</option>
            </select>
            
            <button
              onClick={() => navigate('/warmup-cooldown/new')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Nieuw spel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery || effectiveTypeFilter !== 'all' ? (
        <div className="text-sm text-gray-600">
          {filteredActivities.length} {filteredActivities.length === 1 ? 'resultaat' : 'resultaten'} gevonden
        </div>
      ) : null}

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <WarmupCooldownCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchQuery ? 
              'Geen warming-ups of eindspellen gevonden voor deze zoekopdracht.' : 
              'Nog geen warming-ups of eindspellen toegevoegd.'
            }
          </div>
          {!searchQuery && (
            <button
              onClick={() => navigate('/warmup-cooldown/new')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Voeg eerste spel toe
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default WarmupCooldownList