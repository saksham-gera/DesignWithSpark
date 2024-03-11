import './App.css'
import theme from './theme'
import { ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import Activity from './Activity'
import Landing from './pages/Landpage'
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cVGhNYVppR2Nbe05zflVCalhWVBYiSV9jS3pTdURjWHped3BVQ2RfVw==");
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
