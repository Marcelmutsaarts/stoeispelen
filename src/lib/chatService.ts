export interface ChatMessage {
  message: string
  aiModel?: 'smart' | 'pro' | 'internet'
  useGrounding?: boolean
}

export interface ChatResponse {
  response: string
  success: boolean
  error?: string
}

export async function sendChatMessage({ message, aiModel = 'smart' }: ChatMessage): Promise<ChatResponse> {
  try {
    console.log('🚀 Sending message to serverless API...')
    console.log('  - Selected model:', aiModel)
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        aiModel
      })
    })

    const data = await response.json()
    
    console.log('📝 API Response:', data)

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data

  } catch (error) {
    console.error('❌ Error calling chat API:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return {
      response: '',
      success: false,
      error: `Er is een fout opgetreden: ${errorMessage}`
    }
  }
}