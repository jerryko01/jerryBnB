import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Layout from "./Layout.jsx";
import AccountPage from "./pages/AccountPage.jsx"
import axios from "axios";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App