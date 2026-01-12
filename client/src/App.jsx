import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./modules/user/componets/Home";
import Places from "./modules/user/pages/Places";
import PageNotFound from "./modules/user/pages/PageNotFound";
import AdminLogin from "./modules/admin/AdminLogin";
import UserLayout from "./modules/user/componets/UserLayout";
import Signup from "./modules/user/pages/Singup";
import SearchResult from "./modules/user/componets/SearchResult";
import PlaceDetails from "./modules/user/pages/PlaceDetails";
import Login from "./modules/user/pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />

            <Route path="/places" element={<Places />} />
            <Route path="/places/:placeId" element={<PlaceDetails />} />

            <Route path="/search" element={<SearchResult />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
