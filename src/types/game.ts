export interface Game {
  id: string
  name: string
  youtubeUrl?: string
  position?: string
  positionImage?: string  // Image URL or path for position
  learningTask: {
    focus?: string
    rules?: string
  }
  stroom: {
    spelersaantal?: string
    tijd?: string
    regels?: string
    opdracht?: string
    organisatie?: string
    materialen?: string
  }
  instructions?: string
  createdAt: string
  updatedAt: string
}

export type GameField = keyof Game | 'learningTask.focus' | 'learningTask.rules' | 
  'stroom.spelersaantal' | 'stroom.tijd' | 'stroom.regels' | 
  'stroom.opdracht' | 'stroom.organisatie' | 'stroom.materialen'