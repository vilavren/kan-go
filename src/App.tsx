import './App.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Helmet } from 'react-helmet-async'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/layout/AppLayout'
import { AuthLayout } from './components/layout/AuthLayout'
import { Board } from './pages/Board'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

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
        <meta
          name="theme-color"
          content="#202020"
          // content={theme.palette.background.default}
        />
      </Helmet>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
