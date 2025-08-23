import useGameStore from '../../store/gameStore'

function CleanupButton() {
  const { games, removeDuplicates, importGames } = useGameStore()

  const handleFullReset = () => {
    if (window.confirm('Dit zal alle duplicaten verwijderen en de app resetten met alleen de originele 8 games. Doorgaan?')) {
      // Clear localStorage completely
      localStorage.removeItem('stoeispelen-storage')
      localStorage.removeItem('gamesLoaded')
      localStorage.removeItem('gamesVersion')
      
      // Reload the page to start fresh
      window.location.reload()
    }
  }

  const handleRemoveDuplicates = () => {
    const beforeCount = games.length
    removeDuplicates()
    const afterCount = useGameStore.getState().games.length
    alert(`Duplicaten verwijderd! Van ${beforeCount} naar ${afterCount} games.`)
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-yellow-800 mb-2">🔧 Cleanup Tools</h3>
      <p className="text-sm text-yellow-700 mb-3">
        Er zijn duplicaten gevonden. Gebruik deze tools om op te ruimen:
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleRemoveDuplicates}
          className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
        >
          Verwijder Duplicaten
        </button>
        <button
          onClick={handleFullReset}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Volledige Reset
        </button>
      </div>
    </div>
  )
}

export default CleanupButton