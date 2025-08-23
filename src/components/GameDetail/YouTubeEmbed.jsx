import { useState } from 'react'
import { Youtube, Link } from 'lucide-react'
import EditableField from '../Common/EditableField'

function YouTubeEmbed({ url, onChange }) {
  const [showInput, setShowInput] = useState(false)

  const extractVideoId = (url) => {
    if (!url) return null
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    
    return null
  }

  const videoId = extractVideoId(url)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-600" />
          YouTube Video
        </h3>
        <button
          onClick={() => setShowInput(!showInput)}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Link className="w-4 h-4" />
          {videoId ? 'Wijzig URL' : 'Voeg URL toe'}
        </button>
      </div>

      {showInput && (
        <div className="mb-4">
          <EditableField
            value={url}
            onChange={(value) => {
              onChange(value)
              setShowInput(false)
            }}
            placeholder="Plak YouTube URL of video ID..."
            className="text-gray-700"
            inputClassName="text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Voorbeeld: https://youtube.com/watch?v=abc123 of abc123
          </p>
        </div>
      )}

      {videoId ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg">
          <Youtube className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-600">Geen video toegevoegd</p>
          <button
            onClick={() => setShowInput(true)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Voeg YouTube video toe
          </button>
        </div>
      )}
    </div>
  )
}

export default YouTubeEmbed