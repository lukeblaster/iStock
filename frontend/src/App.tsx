import './App.css'
import Layout from './app/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './routes/home'
import { Equipments } from './routes/equipments'
import { Movimentations } from './routes/movimentations'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "movimentations",
        element: <Movimentations />
      },
      {
        path: "equipments",
        element: <Equipments />
      }
    ]
  }
])

function App() {

  return (
    <>
      
        <RouterProvider router={router} />
      
    </>
  )
}

export default App
