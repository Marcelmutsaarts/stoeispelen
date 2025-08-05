import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Game } from '../types/game'
import { gameStorage } from '../lib/gameStorage'

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    initializeDefaultGames()
    loadGames()
  }, [])

  // Reload games when returning to this page or when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadGames()
    }
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadGames()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const initializeDefaultGames = () => {
    try {
      const existingGames = gameStorage.getAllGames()
      
      // Check if our specific example games exist by name and have image fields
      const hasGame1 = existingGames.some(game => game.name === 'Uit balans halen gelijke positie')
      const hasGame2 = existingGames.some(game => game.name === 'Uit balans halen ongelijke positie' && game.imageA)
      
      // Force clean initialization to add turtle image
      if (!hasGame1 || !hasGame2) {
        // Clear localStorage to ensure clean state with new image fields
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
          imageA: '/images/turtle.jpg',
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
    console.log('All games loaded:', allGames.length, allGames.map(g => ({ name: g.name, focus: g.learningTask.focus })))
    
    // Only show games that have both name and focus filled in
    const completeGames = allGames.filter(game => 
      game.name && 
      game.name.trim() !== '' && 
      game.name.trim() !== 'Nieuwe Game' &&
      game.learningTask.focus && 
      game.learningTask.focus.trim() !== ''
    )
    
    console.log('Complete games after filter:', completeGames.length, completeGames.map(g => g.name))
    setGames(completeGames)
    setFilteredGames(completeGames)
  }

  const handleCreateNewGame = () => {
    try {
      const newGame = gameStorage.createNewGame()
      gameStorage.saveGame(newGame)
      navigate(`/game/${newGame.id}`)
    } catch (error) {
      console.error('Error creating new game:', error)
      alert('Er ging iets mis bij het maken van een nieuwe game. Probeer het opnieuw.')
      loadGames()
    }
  }

  const handleGameClick = (gameId: string) => {
    navigate(`/game/${gameId}`)
  }

  return (
    <div className="min-h-screen bg-lavender">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4" style={{color: 'var(--text-black)', fontWeight: 700}}>
            Stoeispelen Bibliotheek
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--text-gray)'}}>
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
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
              style={{ 
                direction: 'ltr', 
                textAlign: 'left',
                borderColor: 'var(--card-border)',
                '--tw-ring-color': 'var(--primary-purple)'
              }}
            />
            <div className="relative group">
              <button
                onClick={handleCreateNewGame}
                className="btn-primary flex items-center gap-2"
              >
                Nieuwe Game
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10" style={{backgroundColor: 'var(--primary-purple-dark)'}}>
                <div className="text-center">
                  <div className="font-medium mb-1">💡 Tip voor nieuwe games</div>
                  <div>Geef je game een duidelijke naam en vul</div>
                  <div>de aandachtspunten in om deze op het</div>
                  <div>startscherm te laten verschijnen!</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{borderTopColor: 'var(--primary-purple-dark)'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="card-purple cursor-pointer overflow-hidden"
            >
              <h2 className="text-xl font-semibold mb-2" style={{color: 'var(--text-black)'}}>
                {game.name}
              </h2>
              {game.position && (
                <p className="text-sm mb-2" style={{color: 'var(--text-gray)'}}>
                  <span className="font-medium">Positie:</span> {game.position}
                </p>
              )}
              {game.learningTask.focus && (
                <div className="mt-3">
                  <p className="text-xs font-medium mb-1" style={{color: 'var(--primary-purple-dark)'}}>
                    Aandachtspunten/Doel:
                  </p>
                  <p className="text-sm whitespace-pre-wrap" style={{color: 'var(--text-gray)'}}>
                    {game.learningTask.focus}
                  </p>
                </div>
              )}
              <div className="mt-4 text-xs" style={{color: 'var(--primary-purple)', opacity: 0.7}}>
                Laatst bijgewerkt: {new Date(game.updatedAt).toLocaleDateString('nl-NL')}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="mb-4" style={{color: 'var(--text-gray)'}}>
              {searchQuery ? 'Geen games gevonden met deze zoekterm.' : 'Nog geen games toegevoegd.'}
            </p>
            <div className="relative group">
              <button
                onClick={handleCreateNewGame}
                className="btn-primary flex items-center gap-2"
              >
                Maak je eerste game
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10" style={{backgroundColor: 'var(--primary-purple-dark)'}}>
                <div className="text-center">
                  <div className="font-medium mb-1">💡 Tip voor nieuwe games</div>
                  <div>Geef je game een duidelijke naam en vul</div>
                  <div>de aandachtspunten in om deze op het</div>
                  <div>startscherm te laten verschijnen!</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{borderTopColor: 'var(--primary-purple-dark)'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}