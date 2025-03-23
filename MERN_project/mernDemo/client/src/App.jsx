import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import "./App.css";
import About from "./components/About";
import Report from "./components/Report";
import Asarernoy from "./components/Asarernoy";
import JetukuBoliniAga from "./components/JetukuBoliniAga";
import BookReadingSection from "./components/BookReadingSection";
import ListeningMusicSection from "./components/ListeningMusicSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Main Page Route */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
              <Asarernoy />
              <Report />
              <JetukuBoliniAga />
              <BookReadingSection />
              <ListeningMusicSection />
            </>
          }
        />

        {/* Login Page Route */}
        <Route path="/login" element={<Login />} />

        {/* Register Page Route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;