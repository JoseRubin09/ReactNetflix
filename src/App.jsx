import HomePage from "./pages/HomePage"
import Page404 from "./pages/Page404"
import DetallesPage from "./pages/DetallesPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar/NavBar";
import ListaPeliculasPage from "./pages/ListaPeliculasPage";
import SessionProvider from './context/SessionContext';



function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="background"></div>
        <NavBar/>
        <Routes>
        <Route path="/login" element ={<LoginPage/>}></Route>
        <Route path="/register" element ={<RegisterPage/>}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies/:movieID" element={<DetallesPage />}></Route>
          <Route path="/movies/" element={<ListaPeliculasPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
