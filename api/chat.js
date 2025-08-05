import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI client with server-side API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { message, aiModel = 'smart' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({
        success: false,
        error: 'API key niet geconfigureerd op de server.'
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Select model - using Gemini 2.5 Flash for better performance
    const modelName = aiModel === 'pro' ? 'gemini-1.5-pro' :
                     aiModel === 'smart' ? 'gemini-2.5-flash' :
                     'gemini-2.5-flash';
    
    console.log('🚀 Using model:', modelName);
    
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const response = await result.response;
    const text = response.text();

    console.log('✅ Successfully generated response');

    return res.status(200).json({
      success: true,
      response: text
    });

  } catch (error) {
    console.error('❌ Error in chat API:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return res.status(500).json({
      success: false,
      error: `Er is een fout opgetreden: ${errorMessage}`
    });
  }
}