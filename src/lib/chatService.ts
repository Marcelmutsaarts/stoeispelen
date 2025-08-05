import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY || '')

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
    if (!API_KEY) {
      return {
        response: '',
        success: false,
        error: 'API key niet geconfigureerd. Voeg VITE_GEMINI_API_KEY toe aan je .env.local bestand.'
      }
    }

    // Select model - using Gemini 2.5 Flash for better performance
    const modelName = aiModel === 'pro' ? 'gemini-1.5-pro' :
                     aiModel === 'smart' ? 'gemini-2.5-flash' :
                     'gemini-2.5-flash'
    
    const model = genAI.getGenerativeModel({ model: modelName })
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    })

    const response = await result.response
    const text = response.text()

    return {
      response: text,
      success: true
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return {
      response: '',
      success: false,
      error: `Er is een fout opgetreden: ${errorMessage}`
    }
  }
}