import { CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from './contexts/AuthContext'
import { theme } from './styles/theme'
import { RequireAuth } from './utils/routes/RequireAuth'
import { AppRouteDefinitions } from './utils/routes/appRoutes'

const renderRoutes = () => {
  return AppRouteDefinitions.map((r, i) => {
    const Element = r.element

    if (r.isProtected) {
      return (
        <Route
          key={i}
          path={r.path}
          element={
            <RequireAuth>
              <Element />
            </RequireAuth>
          }
        />
      )
    }

    return <Route key={i} path={r.path} element={<Element />} />
  })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <CssBaseline />
          <ToastContainer />
          <Routes>{renderRoutes()}</Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
