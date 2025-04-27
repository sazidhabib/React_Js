import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from './App.jsx'
import { AuthProvider } from './store/auth.jsx';


createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <StrictMode>
      <App />
    </StrictMode>

  </AuthProvider>,
)
