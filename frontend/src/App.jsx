import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
