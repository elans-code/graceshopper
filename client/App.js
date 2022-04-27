import { LayoutGroup } from 'framer-motion'
import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <LayoutGroup>
        <Navbar />
        <Routes />
      </LayoutGroup>
    </div>
  )
}

export default App
