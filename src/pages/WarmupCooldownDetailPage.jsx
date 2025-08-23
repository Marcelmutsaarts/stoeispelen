import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react'
import useWarmupCooldownStore from '../store/warmupCooldownStore'

function WarmupCooldownDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getActivity, addActivity, updateActivity, deleteActivity } = useWarmupCooldownStore()
  
  const isNew = id === 'new'
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    type: 'warmup',
    tags: []
  })
  const [newTag, setNewTag] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (!isNew && id) {
      const existingActivity = getActivity(id)
      if (existingActivity) {
        setActivity(existingActivity)
      } else {
        navigate('/warmups')
      }
    }
  }, [id, isNew, getActivity, navigate])

  const handleFieldChange = (field, value) => {
    setActivity(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !activity.tags.includes(newTag.trim())) {
      setActivity(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
      setHasChanges(true)
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setActivity(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    if (!activity.title.trim()) {
      alert('Titel is verplicht')
      return
    }

    if (isNew) {
      addActivity(activity)
    } else {
      updateActivity(id, activity)
    }
    navigate('/')
  }

  const handleDelete = () => {
    if (window.confirm('Weet je zeker dat je dit spel wilt verwijderen?')) {
      deleteActivity(id)
      navigate('/')
    }
  }

  const getTypeColor = () => {
    switch(activity.type) {
      case 'warmup':
        return 'bg-orange-50 border-orange-200'
      case 'cooldown':
        return 'bg-blue-50 border-blue-200'
      case 'both':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Terug naar overzicht
            </button>
            
            <div className="flex gap-2">
              {(isNew || hasChanges) && (
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className={`rounded-lg border-2 p-8 ${getTypeColor()}`}>
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titel *
            </label>
            <input
              type="text"
              value={activity.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Naam van het spel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-semibold"
            />
          </div>

          {/* Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type spel
            </label>
            <select
              value={activity.type}
              onChange={(e) => handleFieldChange('type', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="warmup">Warming-up</option>
              <option value="cooldown">Eindspel</option>
              <option value="both">Beide (warming-up & eindspel)</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschrijving
            </label>
            <textarea
              value={activity.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Beschrijf het spel in detail: wat is het doel, hoe speel je het, welke materialen heb je nodig, hoeveel spelers, etc."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (voor zoeken)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Voeg een tag toe..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Toevoegen
              </button>
            </div>
            
            {activity.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activity.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="text-sm text-gray-500 space-y-1">
              {activity.createdAt && (
                <p>Aangemaakt: {new Date(activity.createdAt).toLocaleDateString('nl-NL')}</p>
              )}
              {activity.updatedAt && (
                <p>Laatst gewijzigd: {new Date(activity.updatedAt).toLocaleDateString('nl-NL')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarmupCooldownDetailPage