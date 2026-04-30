import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import { ModalProvider } from "./hooks/useModal";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./components/layout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ConsultationModal from "./components/ui/ConsultationModal";
import InternshipModal from "./components/ui/InternshipModal";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import MentorshipPage from "./pages/MentorshipPage";
import HirePage from "./pages/HirePage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminSubmissions from "./pages/admin/Submissions";
import AdminSubmissionDetail from "./pages/admin/SubmissionDetail";
import { NotFoundPage } from "./pages/PlaceholderPages";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:id" element={<ProjectsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="enrol" element={<MentorshipPage />} />
                <Route path="hire" element={<HirePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/submissions"
                element={
                  <ProtectedRoute>
                    <AdminSubmissions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/submissions/:id"
                element={
                  <ProtectedRoute>
                    <AdminSubmissionDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
            {/* Modals mounted once at root */}
            <ConsultationModal />
            <InternshipModal />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
