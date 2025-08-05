'use client'

import { useState, useRef, useEffect } from 'react'
import { Game } from '@/types/game'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface GameChatbotProps {
  game: Game
  onClose: () => void
  messages?: Message[]
  setMessages?: (messages: Message[]) => void
  hasStarted?: boolean
  setHasStarted?: (started: boolean) => void
}

export default function GameChatbot({ 
  game, 
  onClose, 
  messages: externalMessages, 
  setMessages: setExternalMessages,
  hasStarted: externalHasStarted,
  setHasStarted: setExternalHasStarted
}: GameChatbotProps) {
  const [internalMessages, setInternalMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [internalHasStarted, setInternalHasStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Use external state if provided, otherwise use internal
  const messages = externalMessages || internalMessages
  const setMessages = setExternalMessages || setInternalMessages
  const hasStarted = externalHasStarted !== undefined ? externalHasStarted : internalHasStarted
  const setHasStarted = setExternalHasStarted || setInternalHasStarted

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createSystemPrompt = () => {
    return `Je bent een deskundige assistent voor stoeispelen, specifiek voor HAN-ALO studenten. 
    
Je hebt toegang tot de volgende informatie over de game "${game.name}":

${game.position ? `Positie: ${game.position}` : ''}

Leertaak:
${game.learningTask.focus ? `- Aandachtspunten/Doel: ${game.learningTask.focus}` : ''}
${game.learningTask.rules ? `- Regels: ${game.learningTask.rules}` : ''}

STROOM-acroniem:
${game.stroom.spelersaantal ? `- Spelersaantal (S): ${game.stroom.spelersaantal}` : ''}
${game.stroom.tijd ? `- Tijd (T): ${game.stroom.tijd}` : ''}
${game.stroom.regels ? `- Regels (R): ${game.stroom.regels}` : ''}
${game.stroom.opdracht ? `- Opdracht (O): ${game.stroom.opdracht}` : ''}
${game.stroom.organisatie ? `- Organisatie (O): ${game.stroom.organisatie}` : ''}
${game.stroom.materialen ? `- Materialen (M): ${game.stroom.materialen}` : ''}

${game.instructions ? `Aanwijzingen: ${game.instructions}` : ''}

Je rol:
1. Help studenten deze game beter te begrijpen
2. Geef praktische tips voor uitvoering
3. Beantwoord vragen over variaties en aanpassingen
4. Leg uit hoe deze game bijdraagt aan motorische ontwikkeling
5. Geef suggesties voor differentiatie (makkelijker/moeilijker maken)

BELANGRIJKE INSTRUCTIES:
- Houd antwoorden KORT en BONDIG (maximaal 3-4 zinnen)
- Gebruik GEEN opmaak zoals sterretjes (*), onderstreping (_) of andere markdown
- Schrijf alleen in platte tekst zonder formatting
- Kom direct ter zake zonder lange inleidingen

Gebruik de ecologische benadering en task constraints in je uitleg.
Wees vriendelijk, helder en praktisch in je antwoorden.`
  }

  const handleStart = () => {
    setHasStarted(true)
    setMessages([{
      role: 'assistant',
      content: `Welkom! Ik ben je assistent voor de game "${game.name}". Ik kan je helpen met vragen over de uitvoering, variaties, veiligheid, of hoe je deze game kunt aanpassen voor verschillende niveaus. Waar kan ik je mee helpen?`,
      timestamp: new Date()
    }])
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      console.log('🚀 Starting chat request...')
      console.log('🔑 API Key available:', !!import.meta.env.VITE_GEMINI_API_KEY)
      
      const systemPrompt = createSystemPrompt()
      
      const { sendChatMessage } = await import('../lib/chatService')
      
      const data = await sendChatMessage({
        message: `${systemPrompt}\n\nGebruiker vraagt: ${input}`,
        aiModel: 'smart'
      })

      console.log('📝 Chat response:', data)

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response')
      }
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('❌ Chat error details:', error)
      
      let errorMessage = 'Sorry, er ging iets mis. Probeer het opnieuw.'
      
      if (error instanceof Error) {
        console.error('❌ Error message:', error.message)
        if (error.message.includes('API key')) {
          errorMessage = 'API key niet gevonden. Controleer je environment variables op Vercel.'
        } else if (error.message.includes('quota')) {
          errorMessage = 'API quota overschreden. Probeer later opnieuw.'
        } else if (error.message.includes('network')) {
          errorMessage = 'Netwerkfout. Controleer je internetverbinding.'
        }
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-20 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col" style={{borderColor: 'var(--card-border)', border: '1px solid'}}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Stoeispelen Assistent</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!hasStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'var(--lavender-bg)'}}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--primary-purple)'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">Stoeispelen Assistent</h4>
              <p className="text-gray-600 text-sm">
                Ik help je met vragen over de game "{game.name}". 
                Vraag gerust over uitvoering, variaties, veiligheid of differentiatie!
              </p>
            </div>
            <button
              onClick={handleStart}
              className="btn-primary"
            >
              Start gesprek
            </button>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 transition-all duration-200`}
                    style={{
                      backgroundColor: message.role === 'user' ? 'var(--primary-purple)' : 'var(--lavender-bg)',
                      color: message.role === 'user' ? 'white' : 'var(--text-black)'
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1" style={{
                      color: message.role === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--primary-purple)',
                      opacity: 0.8
                    }}>
                      {message.timestamp.toLocaleTimeString('nl-NL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Stel een vraag..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ 
                    direction: 'ltr', 
                    textAlign: 'left',
                    borderColor: 'var(--card-border)',
                    '--tw-ring-color': 'var(--primary-purple)'
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  style={{background: 'var(--gradient)'}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}