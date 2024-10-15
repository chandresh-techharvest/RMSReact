import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Update from "./Component/Update";
import AddPropertyMasters from "./Pages/PropertyMaster/AddPropertyMasters";
import ListPropertyMasters from "./Pages/PropertyMaster/ListPropertyMasters";
import AddRentMasters from "./Pages/RentMaster/AddRentMasters";
import ListRentMasters from "./Pages/RentMaster/ListRentMasters";
import AddOwnerMasters from "./Pages/OwnerMaster/AddOwnerMasters";
import ListOwnerMasters from "./Pages/OwnerMaster/ListOwnerMasters";
import AddClientMasters from "./Pages/ClientMaster/AddClientMasters";
import ListClientMasters from "./Pages/ClientMaster/ListClientMasters";
import RentTransactionForm from "./Pages/RentMaster/RentTransactionForm";
import Detail from "./Component/Detail";
import RentRecipt from "./Pages/RentRecipt/RentRecipt";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="addownermaster" element={<AddOwnerMasters />} />
          <Route path="listownermaster" element={<ListOwnerMasters />} />
          <Route path="addpropertymaster" element={<AddPropertyMasters />} />
          <Route path="listpropertymaster" element={<ListPropertyMasters />} />
          <Route path="addrentmaster" element={<AddRentMasters />} />
          <Route path="listrentmaster" element={<ListRentMasters />} />
          <Route path="addclientmaster" element={<AddClientMasters />} />
          <Route path="addclientmaster/:id" element={<AddClientMasters />} />
          <Route path="listclientmaster" element={<ListClientMasters />} />
          <Route path="listrentrecipt" element={<RentRecipt />} />
          <Route
            path=":?/:whichroute/transcation"
            element={<RentTransactionForm />}
          />
          <Route path=":?/:whichroute/detail" element={<Detail />} />
          <Route path=":?/:whichroute/update" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
