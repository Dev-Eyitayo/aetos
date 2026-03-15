import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { ModalProvider } from './hooks/useModal'
import RootLayout from './components/layout/RootLayout'
import ConsultationModal from './components/ui/ConsultationModal'
import InternshipModal from './components/ui/InternshipModal'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import { NotFoundPage } from './pages/PlaceholderPages'

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          {/* Modals mounted once at root */}
          <ConsultationModal />
          <InternshipModal />
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  )
}
