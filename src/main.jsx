import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Tasks from './components/Task.jsx'
import TodoList from './components/TodoList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoList />
    {/* <Tasks /> */}
  </StrictMode>,
)
