'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Game } from '@/types/game'
import { gameStorage } from '@/lib/gameStorage'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const router = useRouter()

  useEffect(() => {
    initializeDefaultGames()
    loadGames()
  }, [])

  const initializeDefaultGames = () => {
    try {
      const existingGames = gameStorage.getAllGames()
      
      // Check if our specific example games exist by name
      const hasGame1 = existingGames.some(game => game.name === 'Uit balans halen gelijke positie')
      const hasGame2 = existingGames.some(game => game.name === 'Uit balans halen ongelijke positie')
      
      // Force clean initialization for now to fix issues
      if (!hasGame1 || !hasGame2) {
        // Clear localStorage to ensure clean state
        localStorage.removeItem('stoeispelen_games')
        
        // Create first example game
        const exampleGame: Game = {
          id: crypto.randomUUID(),
          name: 'Uit balans halen gelijke positie',
          position: 'Vanuit hurk-positie (op knieën)',
          learningTask: {
            focus: 'Vanuit hurk-positie (op knieën) is het doel elkaar uit balans te halen. Hierbij moet je zorgen zelf balans te houden zonder te steunen op de mat (met de handen/ellenbogen/hoofd). Probeer in het spel het LZP van de tegenstander uit balans te halen en je eigen LZP boven je steunvlak te houden. Doe dit zonder op je rug te gaan liggen.',
            rules: 'Het tweetal start op alei op de knieën. Wanneer iemand zijn/haar hand op de mat zet krijgt de ander 1 punt. Twee handen op de mat = 2 punten. Een grip om de nek mag alleen als daar een arm bij zit.'
          },
          stroom: {
            spelersaantal: '',
            tijd: '',
            regels: 'Je moet de handpositie van de tegenstander minimaal 3 seconden controleren voor een punt.',
            opdracht: 'Wisselende taken (1 aanvaller en 1 verdediger) OF 3 punten als je de tegenstander op de zij krijgt',
            organisatie: '',
            materialen: ''
          },
          instructions: 'Vanuit een goede basis kan je kracht geven en ontvangen zonder mobiliteit en positie te verliezen\n\nRots & water: Wissel weerstand met meebewegen af\n\nLZP / actieve heupen: Het verplaatsen / verlagen van het LZP kan helpen om een balans voordeel te krijgen t.o.v. de tegenstander\n\nde hand van de tegenstander bij de pols controleren 2 handen op 1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        // Create second example game with corrected data
        const secondGame: Game = {
          id: crypto.randomUUID(),
          name: 'Uit balans halen ongelijke positie',
          position: 'A: zit als bokje/turtle op de mat. B: start naast A',
          learningTask: {
            focus: 'A: zit als bokje/turtle op de mat. Met als doel deze positie te behouden zonder om te vallen of met de buik op de mat te komen.\nB: Heeft als doel A uit balans te halen. Met de buik plat op de mat te duwen of om te duwen. Lukt dit dan heeft B 1 punt en starten ze weer opnieuw in de beginpositie',
            rules: 'Een grip om de nek mag alleen als daar een arm bij zit. Een kanteling op de zijkant of rug is voldoende voor B.'
          },
          stroom: {
            spelersaantal: 'Meerdere aanvallers die A uit balans proberen te krijgen / het bokje mag proberen in guard te gaan zitten en/of op te staan. Dan moet de aanvaller meer controle houden over het lichaam van de verdediger.',
            tijd: '',
            regels: 'Als A tijdens het spel twee handen gesloten om het been van B krijgt dan krijgt A 1 punt. OF A en B mogen geen grips meer maken (dus alleen werken met gesloten handen)',
            opdracht: '',
            organisatie: '',
            materialen: ''
          },
          instructions: 'B "Van klein naar groot: kleine steunpunten eerst afbreken voor het uit balans halen van een groot steunpunt"\n\nB "Direction of force: Probeer bij sweeps en kantelingen krachten te leveren die haaks op de tegenstander staan"\n\nB "Tripod-principe: Hierbij ben jij als aanvaller met 3 steunpunten (bijv. 2 knieën en 1 hand) relatief stabiel, dit is hetzelfde voor de tegenstander. Het doel is om een voordeel te krijgen t.o.v. de tegenstander. Dus het liefst jij als aanvaller 3 steunpunten en de tegenstander 0. In de praktijk zal dit vaker 3:2, 3:1 or 2:1 zijn"\n\nB "steunpunten van A blokkeren"\n\nA "basis zo breed en laag mogelijk maken"',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        // Save both games
        gameStorage.saveGame(exampleGame)
        gameStorage.saveGame(secondGame)
      }
    } catch (error) {
      console.error('Error initializing default games:', error)
    }
  }

  useEffect(() => {
    if (searchQuery) {
      setFilteredGames(gameStorage.searchGames(searchQuery))
    } else {
      setFilteredGames(games)
    }
  }, [searchQuery, games])

  const loadGames = () => {
    const allGames = gameStorage.getAllGames()
    // Only show games that have both name and focus filled in
    const completeGames = allGames.filter(game => 
      game.name && 
      game.name.trim() !== '' && 
      game.name !== 'Nieuwe Game' &&
      game.learningTask.focus && 
      game.learningTask.focus.trim() !== ''
    )
    setGames(completeGames)
    setFilteredGames(completeGames)
  }

  const handleCreateNewGame = () => {
    try {
      const newGame = gameStorage.createNewGame()
      gameStorage.saveGame(newGame)
      
      // Use window.location as fallback for routing issues
      try {
        router.push(`/game/${newGame.id}`)
      } catch (routingError) {
        console.warn('Router push failed, using window.location:', routingError)
        window.location.href = `/game/${newGame.id}`
      }
    } catch (error) {
      console.error('Error creating new game:', error)
      alert('Er ging iets mis bij het maken van een nieuwe game. Probeer het opnieuw.')
      loadGames()
    }
  }

  const handleGameClick = (gameId: string) => {
    try {
      router.push(`/game/${gameId}`)
    } catch (error) {
      console.warn('Router navigation failed, using window.location:', error)
      window.location.href = `/game/${gameId}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stoeispelen Bibliotheek
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welkom bij de cursus stoeispelen voor 1e jaars HAN-ALO studenten. 
            Hier vind je een verzameling ecologisch task constraint based games met chatbot ondersteuning.
          </p>
        </div>

        {/* Search and New Game */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Zoek een game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateNewGame}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Nieuwe Game
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6 overflow-hidden"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {game.name}
              </h2>
              {game.position && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Positie:</span> {game.position}
                </p>
              )}
              {game.learningTask.focus && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-700 mb-1">Aandachtspunten/Doel:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {game.learningTask.focus}
                  </p>
                </div>
              )}
              <div className="mt-4 text-xs text-gray-400">
                Laatst bijgewerkt: {new Date(game.updatedAt).toLocaleDateString('nl-NL')}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Geen games gevonden met deze zoekterm.' : 'Nog geen games toegevoegd.'}
            </p>
            <button
              onClick={handleCreateNewGame}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Maak je eerste game
            </button>
          </div>
        )}
      </div>
    </div>
  )
}