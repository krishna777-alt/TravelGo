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
import ProtectedRoute from "./modules/user/auth/ProtectedRoute";
import Logout from "./modules/user/auth/Logout";
import AdminDashboard from "./modules/admin/AdminDashboard";
import AdminLayout from "./modules/admin/componets/AdminLayout";
import AddPlaces from "./modules/admin/componets/AddPlaces";
import ManagePlaces from "./modules/admin/pages/ManagePlace";
import ViewPlacesDetails from "./modules/admin/componets/ViewPlacesDetails";
import UpdatePlace from "./modules/admin/componets/UpdatePlace";
import ManageHotel from "./modules/admin/pages/MangeHotel";
import HotelLayout from "./modules/hotel/HotelLayout";
import HotelDashBoard from "./modules/hotel/HotelDashBoard";
import Hotel from "./modules/user/pages/Hotels";
import HotelDetails from "./modules/user/pages/HotelDetails";
import Rooms from "./modules/user/pages/Rooms";
import RoomDetails from "./modules/user/pages/RoomDetails";
import AuthProvider from "./modules/user/auth/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <ProtectedRoute /> */}
                <UserLayout />
              </>
            }
          >
            <Route index element={<Home />} />

            <Route path="/places" element={<Places />} />
            <Route path="/places/:placeId" element={<PlaceDetails />} />

            <Route path="/hotels" element={<Hotel />} />
            <Route
              path="/hotels/hotelDetails/:hotelId"
              element={<HotelDetails />}
            />
            <Route
              path="/hotels/hotelDetails/:hotelId/rooms"
              element={<Rooms />}
            />
            <Route
              path="/hotels/hotelDetails/:hotelId/rooms/roomDetails/:roomId"
              element={
                <AuthProvider>
                  <RoomDetails />
                </AuthProvider>
              }
            />

            <Route path="/search" element={<SearchResult />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/managePlaces" element={<ManagePlaces />} />
            <Route
              path="/admin/placesDetails/:placeId"
              element={<ViewPlacesDetails />}
            />
            <Route
              path="/admin/updateCurentPlace/:placeId"
              element={<UpdatePlace />}
            />

            <Route path="/admin/createPlaces" element={<AddPlaces />} />
            <Route
              path="/admin/viewPlaceDetails"
              element={<ViewPlacesDetails />}
            />

            <Route path="/admin/hotels" element={<ManageHotel />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="/hotel" element={<HotelLayout />}>
            <Route index element={<HotelDashBoard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
