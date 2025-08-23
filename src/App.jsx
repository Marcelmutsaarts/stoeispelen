import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameDetailPage from './pages/GameDetailPage'
import WarmupCooldownDetailPage from './pages/WarmupCooldownDetailPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/game/new" element={<GameDetailPage />} />
          <Route path="/warmup-cooldown/:id" element={<WarmupCooldownDetailPage />} />
          <Route path="/warmup-cooldown/new" element={<WarmupCooldownDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App