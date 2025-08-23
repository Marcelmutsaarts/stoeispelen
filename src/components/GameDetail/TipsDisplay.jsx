import { useState } from 'react'
import EditableField from '../Common/EditableField'

function TipsDisplay({ tips, onChange }) {
  const [isEditing, setIsEditing] = useState(false)

  // Parse tips - split on lines starting with dash
  const parsedTips = tips ? tips.split('\n').filter(line => line.trim()).map(line => {
    // Remove leading dash and spaces
    return line.replace(/^-\s*/, '').trim()
  }) : []

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Tips</h3>
        <EditableField
          value={tips}
          onChange={(value) => {
            onChange(value)
            setIsEditing(false)
          }}
          placeholder="Voeg tips toe voor het spelen van dit spel..."
          multiline
          className="text-gray-700"
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Tips</h3>
      {parsedTips.length > 0 ? (
        <div 
          onClick={() => setIsEditing(true)}
          className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <ul className="space-y-2">
            {parsedTips.map((tip, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="text-blue-600 mr-2 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <span className="text-gray-400">Voeg tips toe voor het spelen van dit spel...</span>
        </div>
      )}
    </div>
  )
}

export default TipsDisplay