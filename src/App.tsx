import './App.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { AppLayout } from './components/layout/AppLayout'
import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { AuthLayout } from './components/layout/AuthLayout'
import { RequireAuth } from './helpers/RequireAuth'
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
      element: (
        <RequireAuth>
          <AppLayout />
        </RequireAuth>
      ),
      children: [
        { path: '/', element: <Home />, index: true },
        { path: 'boards', element: <Home /> },
        { path: 'boards/:boardsId', element: <Board /> },
      ],
    },
  ])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
