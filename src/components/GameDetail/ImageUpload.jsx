import { useRef } from 'react'
import { Upload, X } from 'lucide-react'

function ImageUpload({ image, onChange }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Afbeelding</h3>
      
      {image ? (
        <div className="relative">
          <img 
            src={image} 
            alt="Game" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <span className="text-gray-600">Klik om een afbeelding te uploaden</span>
          <span className="text-sm text-gray-500 mt-1">of sleep een bestand hierheen</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  )
}

export default ImageUpload