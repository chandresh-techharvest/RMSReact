import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Home from "./Pages/Home";
import Layout from './Layout'
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from './Component/AddProduct'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="home"
          element={
            <ProtectedRoute >
            <Layout/>
            </ProtectedRoute>
          }
        >
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
