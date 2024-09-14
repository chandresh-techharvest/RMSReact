import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import AddOwnerMaster from "./Component/AddOwnerMaster";
import ListOwnerMaster from "./Component/ListOwnerMaster";
import Update from "./Component/Update";

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
          <Route path="addownermaster" element={<AddOwnerMaster />} />
          <Route path="listownermaster" element={<ListOwnerMaster />}/>
          <Route path="update/:id" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
