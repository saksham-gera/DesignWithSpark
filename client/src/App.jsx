import './App.css'
import theme from './theme'
import Sidebar from './components/Sidebar'
import { ThemeProvider} from '@mui/material'
import Content from './components/Content'
import { BrowserRouter } from 'react-router-dom'
import TopBar from './components/TopBar'


function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="flex main select-none">
            <Sidebar />
            <div className="flex flex-column w-full content-main">
              <TopBar />
              <Content />
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
