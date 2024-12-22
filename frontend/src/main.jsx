import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import QuillContextProvider from './context/QuillContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>

    <BrowserRouter>

    <QuillContextProvider>

        <App />

      </QuillContextProvider>

    </BrowserRouter>
  
  </StrictMode>,
)
