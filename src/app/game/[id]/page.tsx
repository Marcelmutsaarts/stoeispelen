'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Game } from '@/types/game'
import { gameStorage } from '@/lib/gameStorage'
import GameChatbot from '@/components/GameChatbot'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function GameDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showChatbot, setShowChatbot] = useState(false)
  const [showVideoPopup, setShowVideoPopup] = useState(false)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [chatStarted, setChatStarted] = useState(false)

  useEffect(() => {
    try {
      if (params.id) {
        const loadedGame = gameStorage.getGame(params.id as string)
        if (loadedGame) {
          setGame(loadedGame)
        } else {
          console.warn('Game not found, redirecting to home')
          try {
            router.push('/')
          } catch (routingError) {
            window.location.href = '/'
          }
        }
      }
    } catch (error) {
      console.error('Error loading game:', error)
      try {
        router.push('/')
      } catch (routingError) {
        window.location.href = '/'
      }
    }
  }, [params.id, router])

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field)
    setEditValue(value || '')
  }

  const handleSave = (field: string) => {
    if (!game) return

    try {
      const updatedGame = { ...game }
      
      // Handle nested fields
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        if (parent === 'learningTask') {
          updatedGame.learningTask = {
            ...updatedGame.learningTask,
            [child]: editValue
          }
        } else if (parent === 'stroom') {
          updatedGame.stroom = {
            ...updatedGame.stroom,
            [child]: editValue
          }
        }
      } else {
        // Handle top-level fields
        ;(updatedGame as any)[field] = editValue
      }

      gameStorage.saveGame(updatedGame)
      setGame(updatedGame)
      setIsEditing(null)
    } catch (error) {
      console.error('Error saving game:', error)
      alert('Er ging iets mis bij het opslaan. Probeer het opnieuw.')
      setIsEditing(null)
    }
  }

  const handleCancel = () => {
    setIsEditing(null)
    setEditValue('')
  }

  const extractYouTubeId = (url: string) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  if (!game) return null

  const EditableField = ({ field, value, multiline = false }: { field: string; value?: string; multiline?: boolean }) => {
    const isCurrentlyEditing = isEditing === field

    if (isCurrentlyEditing) {
      return (
        <div className="space-y-2">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => handleSave(field)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Opslaan
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
            >
              Annuleren
            </button>
          </div>
        </div>
      )
    }

    return (
      <div
        onClick={() => handleEdit(field, value || '')}
        className="cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 transition-colors"
      >
        {value || <span className="text-gray-400 italic">Klik om toe te voegen...</span>}
      </div>
    )
  }

  const youtubeId = extractYouTubeId(game.youtubeUrl || '')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Terug naar overzicht
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            <EditableField field="name" value={game.name} />
          </h1>
        </div>

        {/* YouTube Video */}
        {youtubeId && (
          <div className="mb-8">
            <div 
              className="relative w-full max-w-2xl mx-auto cursor-pointer group"
              onClick={() => setShowVideoPopup(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center group-hover:bg-opacity-40 transition-opacity">
                <div className="bg-white rounded-full p-4">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* YouTube URL Input */}
        <div className="mb-8 max-w-2xl mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
          <EditableField field="youtubeUrl" value={game.youtubeUrl} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Positie */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Positie</h2>
              <EditableField field="position" value={game.position} multiline />
            </div>

            {/* Leertaak */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Leertaak</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Aandachtspunten/Doel</h3>
                  <EditableField field="learningTask.focus" value={game.learningTask.focus} multiline />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Regels</h3>
                  <EditableField field="learningTask.rules" value={game.learningTask.rules} multiline />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* STROOM */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">STROOM-acroniem</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Spelersaantal</h3>
                  <EditableField field="stroom.spelersaantal" value={game.stroom.spelersaantal} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Tijd</h3>
                  <EditableField field="stroom.tijd" value={game.stroom.tijd} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Regels</h3>
                  <EditableField field="stroom.regels" value={game.stroom.regels} multiline />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Opdracht</h3>
                  <EditableField field="stroom.opdracht" value={game.stroom.opdracht} multiline />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Organisatie</h3>
                  <EditableField field="stroom.organisatie" value={game.stroom.organisatie} multiline />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Materialen</h3>
                  <EditableField field="stroom.materialen" value={game.stroom.materialen} />
                </div>
              </div>
            </div>

            {/* Aanwijzingen */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Aanwijzingen</h2>
              <EditableField field="instructions" value={game.instructions} multiline />
            </div>
          </div>
        </div>

        {/* Chatbot Button */}
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>

        {/* Video Popup */}
        {showVideoPopup && youtubeId && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoPopup(false)}
          >
            <div 
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideoPopup(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
        )}

        {/* Chatbot */}
        {showChatbot && (
          <GameChatbot 
            game={game} 
            onClose={() => setShowChatbot(false)}
            messages={chatMessages}
            setMessages={setChatMessages}
            hasStarted={chatStarted}
            setHasStarted={setChatStarted}
          />
        )}
      </div>
    </div>
  )
}