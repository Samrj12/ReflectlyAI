import { useState } from 'react'
import LandingPage from './components/LandingPage'
import AudioRecorder from './components/AudioRecorder'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import InterviewPage from './components/InterviewPage'
import FeedbackPage from './components/FeedbackPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  )
}

export default App
