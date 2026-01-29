import { useEffect } from "react";
import { useState } from "react";

function HotelStatus({ hotel }) {
  return (
    <div class="relative h-48 overflow-hidden">
      <img
        src={`http://localhost:3000/uploads/hotels/${hotel.image}`}
        alt="<%= hotel.name %>"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <span class="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
        Approved
      </span>

      <span class="absolute top-3 left-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
        Pending
      </span>
    </div>
  );
}

function ApproveHotelCard() {
  return (
    <div class="p-8">
      <h1 class="text-2xl font-semibold text-gray-800 mb-1">Manage Hotels</h1>
      <p class="text-gray-500 mb-6">
        Approve or reject newly registered hotels.
      </p>

      <div class="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
        <table class="min-w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Hotel Name
              </th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>
              <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <img
                  src="/uploads/hotels/<%= hotel.image %>"
                  alt="hotel-img"
                  class="w-20 h-20 object-cover rounded-lg"
                />
              </td>

              <td class="px-6 py-4 text-gray-800 font-medium"> hotel.name </td>

              <td class="px-6 py-4 text-yellow-600 font-semibold">
                ⭐ hotel.rating
              </td>

              <td class="px-6 py-4 flex items-center justify-center gap-3">
                <a
                  href="/admin/hotelView/<%= hotel._id %>"
                  class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                >
                  View
                </a>

                <a
                  href="/admin/accepted/<%= hotel._id %>"
                  class="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                >
                  Accept
                </a>

                <a
                  href="/admin/hotel/reject/<%= hotel._id %>"
                  class="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                >
                  Reject
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManageHotel() {
  const [hotels, setHotels] = useState([]);
  useEffect(function () {
    async function fetchHotelData() {
      try {
        const responce = await fetch(
          "http://localhost:3000/api/v1/admin/hotels"
        );
        const data = await responce.json();
        setHotels(data.hotels);
        console.log("DATa:", data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchHotelData();
  }, []);
  console.log("hotels:", hotels);
  return (
    <>
      <ApproveHotelCard />
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <HotelCard hotelDetails={hotels} />
      </div>

      {/* <NoHotelsFound /> */}
    </>
  );
}

function HotelCard({ hotelDetails }) {
  return (
    <>
      {hotelDetails.map((hotel) => (
        <div
          className="bg-white shadow rounded-xl overflow-hidden border"
          key={hotel._id}
        >
          <HotelStatus hotel={hotel} />
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {hotel.name}
              </h3>

              <span className="text-sm text-indigo-600 font-medium">
                ₹ {hotel.price} /night
              </span>
            </div>

            <p className="text-sm text-gray-500 line-clamp-2">
              {hotel.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span>
                📍 {hotel.place}, {hotel.state}
              </span>
              <span>⭐ {hotel.rating}</span>
              <span>🛏 {hotel.totalRooms}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"></span>

              <span className="text-xs text-gray-400">
                + {hotel.amenities.length - 3} more
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <a
                href={`/admin/currentHotel/${hotel._id}`}
                className="text-sm text-indigo-600 hover:underline"
              >
                View
              </a>

              <div className="flex gap-3">
                <a
                  href="/admin/hotels/edit/"
                  className="text-sm text-amber-600 hover:underline"
                >
                  Edit
                </a>

                <form
                  action={`/admin/hotels/approve/${hotel._id}`}
                  method="POST"
                >
                  <button className="text-sm text-emerald-600 hover:underline">
                    Approve
                  </button>
                </form>

                <form
                  action={`/admin/hotels/delete/${hotel._id}`}
                  method="POST"
                  onSubmit={() => confirm("Delete this hotel?")}
                >
                  <button className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function NoHotelsFound() {
  return (
    <div class="bg-white rounded-2xl p-12 text-center shadow-sm">
      <div class="text-5xl mb-4">🏨</div>
      <h2 class="text-xl font-semibold text-gray-800">No hotels found</h2>
      <p class="text-gray-500 mt-2 mb-6">
        Hotels added by managers will appear here
      </p>

      <a
        href="/admin/hotels/new"
        class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition"
      >
        ➕ Add Hotel
      </a>
    </div>
  );
}

export default ManageHotel;
