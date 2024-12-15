import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* we should wrap our application with BrowserRouter */}
    <BrowserRouter>
    {/* Our store will be available in our intire application 7min https://www.youtube.com/watch?v=qis9sMaiqN4&ab_channel=CodeWithZosh */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
