import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import useGameStore from '../store/gameStore'
import EditableField from '../components/Common/EditableField'
import STROOMSection from '../components/GameDetail/STROOMSection'
import YouTubeEmbed from '../components/GameDetail/YouTubeEmbed'
import ImageUpload from '../components/GameDetail/ImageUpload'
import TipsDisplay from '../components/GameDetail/TipsDisplay'

function GameDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getGame, addGame, updateGame, deleteGame } = useGameStore()
  
  const isNew = id === 'new'
  const [game, setGame] = useState({
    title: '',
    objective: '',
    leftColumn: {
      startPosition: '',
      playerA: '',
      playerB: '',
      rules: ''
    },
    rightColumn: {
      image: '',
      modifications: {
        S: '',
        T: '',
        R: '',
        O: '',
        O2: '',
        M: ''
      },
      tips: '',
      youtubeUrl: ''
    }
  })

  useEffect(() => {
    if (!isNew && id) {
      const existingGame = getGame(id)
      if (existingGame) {
        setGame(existingGame)
      } else {
        navigate('/')
      }
    }
  }, [id, isNew, getGame, navigate])

  const handleFieldChange = (path, value) => {
    const keys = path.split('.')
    setGame(prev => {
      const newGame = { ...prev }
      let current = newGame
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      
      if (!isNew) {
        updateGame(id, newGame)
      }
      
      return newGame
    })
  }

  const handleSave = () => {
    if (isNew) {
      addGame(game)
      navigate('/')
    }
  }

  const handleDelete = () => {
    if (window.confirm('Weet je zeker dat je dit spel wilt verwijderen?')) {
      deleteGame(id)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Terug naar overzicht
            </button>
            
            <div className="flex gap-2">
              {isNew && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Opslaan
                </button>
              )}
              {!isNew && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Verwijderen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Titel */}
        <EditableField
          value={game.title}
          onChange={(value) => handleFieldChange('title', value)}
          placeholder="Titel van het spel"
          className="text-3xl font-bold text-gray-900 mb-4 text-center"
          inputClassName="text-3xl font-bold text-center"
        />

        {/* Doel */}
        <EditableField
          value={game.objective}
          onChange={(value) => handleFieldChange('objective', value)}
          placeholder="Doel van het spel"
          className="text-lg text-gray-700 mb-8 text-center bg-blue-50 p-4 rounded-lg"
          inputClassName="text-lg text-center"
          multiline
        />

        {/* Tekst informatie sectie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Startpositie</h3>
              <EditableField
                value={game.leftColumn.startPosition}
                onChange={(value) => handleFieldChange('leftColumn.startPosition', value)}
                placeholder="Beschrijf de startpositie..."
                multiline
                className="text-gray-700"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Rol Speler A</h3>
              <EditableField
                value={game.leftColumn.playerA}
                onChange={(value) => handleFieldChange('leftColumn.playerA', value)}
                placeholder="Beschrijf de rol van speler A..."
                multiline
                className="text-gray-700"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Rol Speler B</h3>
              <EditableField
                value={game.leftColumn.playerB}
                onChange={(value) => handleFieldChange('leftColumn.playerB', value)}
                placeholder="Beschrijf de rol van speler B..."
                multiline
                className="text-gray-700"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Spelregels</h3>
              <EditableField
                value={game.leftColumn.rules}
                onChange={(value) => handleFieldChange('leftColumn.rules', value)}
                placeholder="Beschrijf de spelregels..."
                multiline
                className="text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-6">
            <STROOMSection
              modifications={game.rightColumn.modifications}
              onChange={(field, value) => handleFieldChange(`rightColumn.modifications.${field}`, value)}
            />

            <TipsDisplay
              tips={game.rightColumn.tips}
              onChange={(value) => handleFieldChange('rightColumn.tips', value)}
            />
          </div>
        </div>

        {/* Visuele sectie onderaan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageUpload
            image={game.rightColumn.image}
            onChange={(value) => handleFieldChange('rightColumn.image', value)}
          />

          <YouTubeEmbed
            url={game.rightColumn.youtubeUrl}
            onChange={(value) => handleFieldChange('rightColumn.youtubeUrl', value)}
          />
        </div>
      </div>
    </div>
  )
}

export default GameDetailPage