import EditableField from '../Common/EditableField'

function TipsSection({ tips, onChange }) {
  // Function to format tips for display
  const formatTipsForDisplay = (text) => {
    if (!text) return ''
    // Split on dash at the beginning of a line (after newline or at start)
    return text.split(/\n-\s*|-\s*/).filter(Boolean).map(tip => tip.trim())
  }

  // Function to format tips for editing
  const formatTipsForEdit = (tipsArray) => {
    if (Array.isArray(tipsArray)) {
      return tipsArray.map(tip => `- ${tip}`).join('\n')
    }
    return tips || ''
  }

  const displayTips = formatTipsForDisplay(tips)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Tips</h3>
      {displayTips.length > 0 && !document.querySelector('[contenteditable="true"]') ? (
        <ul className="space-y-2 text-gray-700">
          {displayTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ) : (
        <EditableField
          value={tips}
          onChange={onChange}
          placeholder="Voeg tips toe voor het spelen van dit spel..."
          multiline
          className="text-gray-700"
        />
      )}
      {displayTips.length > 0 && (
        <button
          onClick={() => {
            const editField = document.querySelector('.text-gray-700')
            if (editField) editField.click()
          }}
          className="text-sm text-blue-600 hover:text-blue-700 mt-3"
        >
          Bewerk tips
        </button>
      )}
    </div>
  )
}

export default TipsSection