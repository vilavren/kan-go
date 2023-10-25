import './App.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/layout/AppLayout'
import { AuthLayout } from './components/layout/AuthLayout'
import { Home } from './pages/Home'

const Board = lazy(() => import('./pages/Board'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))

function App() {
  const theme = createTheme({
    palette: { mode: 'dark' },
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
      ],
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '/', element: <Home />, index: true },
        { path: 'boards', element: <Home /> },
        { path: 'boards/:boardsId', element: <Board /> },
      ],
    },
  ])

  return (
    <div>
      <Helmet>
        <meta name="theme-color" content={theme.palette.background.default} />
      </Helmet>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
