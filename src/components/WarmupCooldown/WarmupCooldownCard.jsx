import { useNavigate } from 'react-router-dom'
import { Flame, Snowflake, Zap } from 'lucide-react'

function WarmupCooldownCard({ activity }) {
  const navigate = useNavigate()

  const getTypeIcon = () => {
    switch(activity.type) {
      case 'warmup':
        return <Flame className="w-5 h-5 text-orange-500" />
      case 'cooldown':
        return <Snowflake className="w-5 h-5 text-blue-500" />
      case 'both':
        return <Zap className="w-5 h-5 text-purple-500" />
      default:
        return null
    }
  }

  const getTypeColor = () => {
    switch(activity.type) {
      case 'warmup':
        return 'border-orange-200 hover:border-orange-300 bg-orange-50'
      case 'cooldown':
        return 'border-blue-200 hover:border-blue-300 bg-blue-50'
      case 'both':
        return 'border-purple-200 hover:border-purple-300 bg-purple-50'
      default:
        return 'border-gray-200 hover:border-gray-300'
    }
  }

  const getTypeLabel = () => {
    switch(activity.type) {
      case 'warmup':
        return 'Warming-up'
      case 'cooldown':
        return 'Eindspel'
      case 'both':
        return 'Warming-up & Eindspel'
      default:
        return ''
    }
  }

  return (
    <div
      onClick={() => navigate(`/warmup-cooldown/${activity.id}`)}
      className={`border-2 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer p-6 ${getTypeColor()}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 flex-1">
          {activity.title}
        </h3>
        {getTypeIcon()}
      </div>
      
      <div className="mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/70">
          {getTypeLabel()}
        </span>
      </div>
      
      <p className="text-gray-700 text-sm line-clamp-3">
        {activity.description}
      </p>
      
      {activity.tags && activity.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activity.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-white/50 rounded text-xs text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default WarmupCooldownCard