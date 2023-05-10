import './App.css';
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import Layout from "./Layout";

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