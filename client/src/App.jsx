import './App.css';
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
<<<<<<< HEAD
import RegisterPage from "./pages/RegisterPage.jsx";
import Layout from "./Layout.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
=======
import Layout from "./Layout";
>>>>>>> parent of d811f83 (Adds the Backend Side and solves the CORS problem)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<LogInPage />} />
      </Route>
    </Routes>
  )
}

export default App