import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'

const root = createRoot(document.getElementById('app'))
root.render(
  <ShoppingCartProvider>
    <Router>
      <App />
    </Router>
  </ShoppingCartProvider>
)
