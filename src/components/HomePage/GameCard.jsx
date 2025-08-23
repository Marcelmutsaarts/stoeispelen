import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

function GameCard({ game }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/game/${game.id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      {game.rightColumn?.image && (
        <div className="h-32 w-full overflow-hidden bg-gray-100">
          <img 
            src={game.rightColumn.image} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {game.title}
        </h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Doel:</p>
            <p className="text-gray-700 text-sm line-clamp-2">
              {game.objective}
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
              <MapPin className="w-4 h-4" />
              <span>Startpositie:</span>
            </div>
            <p className="text-gray-700 text-sm">
              {game.leftColumn?.startPosition || 'Niet opgegeven'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard