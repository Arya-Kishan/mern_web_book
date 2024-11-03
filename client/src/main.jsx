import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './Redux/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        newestOnTop={false}
        closeOnClick
        limit={5}
        theme='dark'
        style={{
          '--toastify-color-dark': '#00005c',
          '--toastify-color-progress-dark': '#75F94C',
        }}
      />
    </Provider>
  </StrictMode>,
)
