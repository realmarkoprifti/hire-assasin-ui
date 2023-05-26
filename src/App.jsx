import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from './components/Home'
import TrackAssasination from './components/TrackAssasination'
import Hits from './components/Hits'


function App() {
  return (
    <>
      <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track-assasination" element={<TrackAssasination />} />
            <Route path="/hits" element={<Hits />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
