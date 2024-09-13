import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Home from "./Pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import Product from "./Component/AddProduct";
import AddProduct from "./Component/AddProduct";
import ListProduct from "./Component/ListProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />}/>  

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
