import EditableField from '../Common/EditableField'

function STROOMSection({ modifications, onChange }) {
  const stroomFields = [
    { key: 'S', label: 'pelersaantal', placeholder: 'Aanpassing spelersaantal...' },
    { key: 'T', label: 'ijd', placeholder: 'Aanpassing tijd...' },
    { key: 'R', label: 'egels', placeholder: 'Aanpassing regels...' },
    { key: 'O', label: 'pdracht', placeholder: 'Aanpassing opdracht...' },
    { key: 'O2', label: 'rganisatie', placeholder: 'Aanpassing organisatie...' },
    { key: 'M', label: 'ateriaal', placeholder: 'Aanpassing materiaal...' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-gray-900 mb-4">STROOM Aanpassingen</h3>
      <div className="space-y-4">
        {stroomFields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <div className="mb-1">
              <span className="font-bold text-blue-600 text-base">
                {key === 'O2' ? 'O' : key}
              </span>
              <span className="text-gray-700 text-base">{label}</span>
            </div>
            <EditableField
              value={modifications[key]}
              onChange={(value) => onChange(key, value)}
              placeholder={placeholder}
              className="text-gray-700"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default STROOMSection