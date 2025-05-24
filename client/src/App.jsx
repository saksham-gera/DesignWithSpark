import './App.css'
import theme from './theme'
import { ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import Activity from './Activity'
import Landing from './pages/Landpage'
import Login from './pages/Login'
import { useAuth } from './components/Auth'
import { Toaster } from 'react-hot-toast'



function App() {
  const {IsLoggedIn} = useAuth();

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <ThemeProvider theme={theme}>
          {window.location.pathname === '/' ? (<Landing />) : window.location.pathname === '/login' && !IsLoggedIn ? <Login /> : (<Activity />) }
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
