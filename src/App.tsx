import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Home/Home";
import LoginPage from "./components/Auth/LoginForm";
import Profile from "./pages/Profile/Profile";
import RandomMovie from "./pages/RandomMovie/RandomMovie";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import ReviewForm from "./components/review/review";
import SignupForm from "./components/Auth/SignupForm";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/random" element={<RandomMovie />}/>
        <Route path="/details" element={<MovieDetails />}/>
        <Route path="review"   element={<ReviewForm/>}/> 
        <Route path="signup"   element={<SignupForm/>}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;