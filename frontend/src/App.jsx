import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AlbumsTable from "./pages/admin/AlbumsTable";
import AddAlbum from "./pages/admin/AddAlbum";
import EditAlbum from "./pages/admin/EditAlbum";
import SiteSettings from "./pages/admin/SiteSettings";
import HeroSettings from "./pages/admin/HeroSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <SiteSettingsProvider>
        <BrowserRouter>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/albums"
              element={
                <ProtectedRoute>
                  <AlbumsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/albums/add"
              element={
                <ProtectedRoute>
                  <AddAlbum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/albums/edit/:id"
              element={
                <ProtectedRoute>
                  <EditAlbum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hero"
              element={
                <ProtectedRoute>
                  <HeroSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <SiteSettings />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SiteSettingsProvider>
    </AuthProvider>
  );
}

export default App;
