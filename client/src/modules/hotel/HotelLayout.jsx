import { Outlet } from "react-router-dom";
import HotelSidebar from "./HotelSideBar";
// import AdminSidebar from "../admin/componets/SideBar";

function HotelLayout() {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <HotelSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default HotelLayout;
