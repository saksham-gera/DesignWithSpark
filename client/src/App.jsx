import './App.css'
import theme from './theme'
import { ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import Activity from './Activity'
import Landing from './pages/Landpage'

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {window.location.pathname === '/' ? (<Landing />) : (<Activity />)}
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
