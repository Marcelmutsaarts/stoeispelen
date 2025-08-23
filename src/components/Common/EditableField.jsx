import { useState, useRef, useEffect } from 'react'

function EditableField({ 
  value, 
  onChange, 
  placeholder = 'Klik om te bewerken...', 
  multiline = false,
  className = '',
  inputClassName = ''
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value || '')
  const inputRef = useRef(null)

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (multiline) {
        inputRef.current.style.height = 'auto'
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
      }
    }
  }, [isEditing, multiline])

  const handleBlur = () => {
    setIsEditing(false)
    if (localValue !== value) {
      onChange(localValue)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur()
    }
    if (e.key === 'Escape') {
      setLocalValue(value || '')
      setIsEditing(false)
    }
  }

  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onInput={handleTextareaInput}
          placeholder={placeholder}
          className={`w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden ${inputClassName}`}
        />
      )
    }
    
    return (
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
      />
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors ${className}`}
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
    </div>
  )
}

export default EditableField