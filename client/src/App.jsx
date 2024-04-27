import './App.css'
import theme from './theme'
import { ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import Activity from './Activity'
import Landing from './pages/Landpage'
import { registerLicense } from "@syncfusion/ej2-base";
import Login from './pages/Login'
import { useAuth } from './components/Auth'



registerLicense(import.meta.env.VITE_SYNCFUSION);
function App() {
  const {IsLoggedIn} = useAuth();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {window.location.pathname == '/' ? (<Landing />) : window.location.pathname == '/login' && !IsLoggedIn ? <Login /> : (<Activity />) }
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
